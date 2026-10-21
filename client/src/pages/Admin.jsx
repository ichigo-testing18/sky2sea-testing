import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, LogOut, PlusCircle, List, RefreshCw, CheckCircle2, ShieldCheck, Edit3, X, Save, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import { adminLoginApi, getAdminShipments, createAdminShipment, updateAdminMilestone } from '../utils/api';
import { formatDateDisplay, formatLastUpdated } from '../utils/dateUtils';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('s2s_admin_token') || '');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [shipments, setShipments] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'create'
  const [selectedShipment, setSelectedShipment] = useState(null);

  const [formMsg, setFormMsg] = useState('');

  // Modal State for Mark as Reached Form
  const [reachedModalOpen, setReachedModalOpen] = useState(false);
  const [activeMilestoneKey, setActiveMilestoneKey] = useState(null); // 'loading' | 'discharge' | 'delivery'
  const [modalArrivalDate, setModalArrivalDate] = useState('');
  const [modalLocation, setModalLocation] = useState('');
  const [modalInitialEta, setModalInitialEta] = useState('');
  const [modalError, setModalError] = useState('');

  // Clean Create Shipment Form State (No demo defaults)
  const [newShipment, setNewShipment] = useState({
    blNumber: '',
    jobNumber: '',
    freightType: 'Ocean',
    loadType: 'LCL',
    containers: '-',
    carrier: '-',
    bookingNumber: '',
    blType: 'Original',
    commodityType: 'General Cargo',
    commodityDescription: '',
    customerRefNumber: '',
    poNumber: '',
    loadingLocation: '',
    dischargeLocation: '',
    dischargeInitialEta: '',
    deliveryLocation: '',
    deliveryInitialEta: ''
  });

  const fetchShipmentsList = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await getAdminShipments(token);
      setShipments(res.shipments || []);
      if (selectedShipment) {
        const found = res.shipments?.find(s => s._id === selectedShipment._id);
        if (found) setSelectedShipment(found);
      }
    } catch (err) {
      if (err.message.includes('token') || err.message.includes('Access denied')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchShipmentsList();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await adminLoginApi(loginPassword);
      if (res.token) {
        setToken(res.token);
        localStorage.setItem('s2s_admin_token', res.token);
      }
    } catch (err) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('s2s_admin_token');
    setSelectedShipment(null);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setFormMsg('');
    setLoading(true);
    try {
      const payload = {
        blNumber: newShipment.blNumber,
        jobNumber: newShipment.jobNumber,
        freightType: newShipment.freightType,
        loadType: newShipment.loadType,
        containers: newShipment.containers,
        carrier: newShipment.carrier,
        bookingNumber: newShipment.bookingNumber,
        blType: newShipment.blType,
        commodityType: newShipment.commodityType,
        commodityDescription: newShipment.commodityDescription,
        customerRefNumber: newShipment.customerRefNumber,
        poNumber: newShipment.poNumber,
        tracking: {
          loading: {
            location: newShipment.loadingLocation || 'Port of Loading',
            initialEta: null
          },
          discharge: {
            location: newShipment.dischargeLocation || 'Port of Discharge',
            initialEta: newShipment.dischargeInitialEta
          },
          delivery: {
            location: newShipment.deliveryLocation || 'Place of Carrier Delivery',
            initialEta: newShipment.deliveryInitialEta
          }
        }
      };

      const res = await createAdminShipment(token, payload);
      setFormMsg(`Shipment ${res.shipment.blNumber} created successfully! Milestones start uncompleted.`);
      fetchShipmentsList();
      setActiveTab('list');
      setNewShipment({
        blNumber: '',
        jobNumber: '',
        freightType: 'Ocean',
        loadType: 'LCL',
        containers: '-',
        carrier: '-',
        bookingNumber: '',
        blType: 'Original',
        commodityType: 'General Cargo',
        commodityDescription: '',
        customerRefNumber: '',
        poNumber: '',
        loadingLocation: '',
        dischargeLocation: '',
        dischargeInitialEta: '',
        deliveryLocation: '',
        deliveryInitialEta: ''
      });
    } catch (err) {
      setFormMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const openMarkReachedModal = (milestoneKey) => {
    const tracking = selectedShipment?.tracking || {};
    
    // Sequential Guards
    if (milestoneKey === 'discharge' && !tracking.loading?.completed) {
      alert('Cannot mark Port of Discharge (Step 2) as reached until Port of Loading (Step 1) is completed.');
      return;
    }
    if (milestoneKey === 'delivery' && !tracking.discharge?.completed) {
      alert('Cannot mark Place of Carrier Delivery (Step 3) as reached until Port of Discharge (Step 2) is completed.');
      return;
    }

    const current = tracking[milestoneKey] || {};
    setActiveMilestoneKey(milestoneKey);
    setModalLocation(current.location || '');
    setModalInitialEta(current.initialEta ? new Date(current.initialEta).toISOString().split('T')[0] : '');
    setModalArrivalDate(current.actualArrivalDate ? new Date(current.actualArrivalDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    setModalError('');
    setReachedModalOpen(true);
  };

  const handleSaveReachedModal = async (e) => {
    e.preventDefault();
    if (!modalArrivalDate) {
      setModalError('Actual arrival date is required when marking a location as reached.');
      return;
    }

    setLoading(true);
    setModalError('');
    try {
      const res = await updateAdminMilestone(token, selectedShipment._id, activeMilestoneKey, {
        location: modalLocation,
        initialEta: activeMilestoneKey === 'loading' ? null : modalInitialEta,
        actualArrivalDate: modalArrivalDate,
        completed: true
      });
      setSelectedShipment(res.shipment);
      fetchShipmentsList();
      setReachedModalOpen(false);
    } catch (err) {
      setModalError(err.message || 'Failed to save milestone.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnmarkReached = async (milestoneKey) => {
    if (!selectedShipment) return;
    const tracking = selectedShipment?.tracking || {};

    // Sequential Unmarking Guards
    if (milestoneKey === 'loading' && tracking.discharge?.completed) {
      alert('Cannot unmark Port of Loading (Step 1) while Port of Discharge (Step 2) is marked as reached. Please unmark Step 2 first.');
      return;
    }
    if (milestoneKey === 'discharge' && tracking.delivery?.completed) {
      alert('Cannot unmark Port of Discharge (Step 2) while Place of Carrier Delivery (Step 3) is marked as reached. Please unmark Step 3 first.');
      return;
    }

    setLoading(true);
    try {
      const current = tracking[milestoneKey] || {};
      const res = await updateAdminMilestone(token, selectedShipment._id, milestoneKey, {
        location: current.location,
        initialEta: current.initialEta,
        actualArrivalDate: null,
        completed: false
      });
      setSelectedShipment(res.shipment);
      fetchShipmentsList();
    } catch (err) {
      alert(`Failed to unmark: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMilestoneDetails = async (milestoneKey) => {
    const locInput = document.getElementById(`${milestoneKey}-loc`)?.value;
    const initEtaInput = document.getElementById(`${milestoneKey}-init`)?.value;
    const current = selectedShipment.tracking[milestoneKey] || {};

    setLoading(true);
    try {
      const res = await updateAdminMilestone(token, selectedShipment._id, milestoneKey, {
        location: locInput !== undefined ? locInput : current.location,
        initialEta: milestoneKey === 'loading' ? null : (initEtaInput !== undefined ? initEtaInput : current.initialEta),
        completed: current.completed,
        actualArrivalDate: current.actualArrivalDate
      });
      setSelectedShipment(res.shipment);
      fetchShipmentsList();
      alert(`Saved ${milestoneKey} details successfully.`);
    } catch (err) {
      alert(`Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // IF NOT LOGGED IN -> LOGIN VIEW
  if (!token) {
    return (
      <div className="pt-20 pb-20 bg-white min-h-screen flex items-center justify-center px-4">
        <AnimatedSection direction="up">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-seablue-50 border border-seablue-200 flex items-center justify-center text-seablue-600 mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-slate-900 text-center">Admin Portal Login</h2>
            <p className="text-xs text-slate-500 text-center mt-1 mb-6">
              Enter admin access password to manage shipments and tracking milestones.
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password *</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                className="w-full justify-center"
              >
                {loading ? 'Authenticating...' : 'Login to Admin Dashboard'}
              </Button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const tracking = selectedShipment?.tracking || {};

  return (
    <div className="pt-10 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-seablue-50 text-seablue-700 border border-seablue-200">
                ADMIN ACCESS
              </span>
              <span className="text-xs text-slate-500">SKY2SEA Logistics Management Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Shipment Management Panel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={fetchShipmentsList} icon={RefreshCw}>
              Refresh Data
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} icon={LogOut}>
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200">
          <button
            onClick={() => { setActiveTab('list'); setSelectedShipment(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'list' ? 'bg-white text-seablue-700 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <List className="w-4 h-4" /> All Shipments ({shipments.length})
          </button>
          
          <button
            onClick={() => { setActiveTab('create'); setSelectedShipment(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'create' ? 'bg-white text-seablue-700 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <PlusCircle className="w-4 h-4" /> Create New Shipment
          </button>
        </div>

        {formMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-seablue-50 border border-seablue-200 text-seablue-800 text-xs font-bold">
            {formMsg}
          </div>
        )}

        {/* SECTION: CREATE SHIPMENT FORM */}
        {activeTab === 'create' && (
          <AnimatedSection direction="up">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-seablue-600" /> Create New Shipment / BL Number
              </h2>

              <form onSubmit={handleCreateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">BL Number * (Unique)</label>
                    <input
                      type="text"
                      required
                      value={newShipment.blNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, blNumber: e.target.value })}
                      placeholder="e.g. HGCK260793637"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Job Number *</label>
                    <input
                      type="text"
                      required
                      value={newShipment.jobNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, jobNumber: e.target.value })}
                      placeholder="e.g. 5104-2608-0002"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Booking Number *</label>
                    <input
                      type="text"
                      required
                      value={newShipment.bookingNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, bookingNumber: e.target.value })}
                      placeholder="e.g. BKG5104-2608-0002"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Freight Type</label>
                    <select
                      value={newShipment.freightType}
                      onChange={(e) => setNewShipment({ ...newShipment, freightType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white"
                    >
                      <option value="Ocean">Ocean</option>
                      <option value="Air">Air</option>
                      <option value="Road">Road</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Load Type</label>
                    <input
                      type="text"
                      value={newShipment.loadType}
                      onChange={(e) => setNewShipment({ ...newShipment, loadType: e.target.value })}
                      placeholder="LCL / FCL"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Containers</label>
                    <input
                      type="text"
                      value={newShipment.containers}
                      onChange={(e) => setNewShipment({ ...newShipment, containers: e.target.value })}
                      placeholder="e.g. -"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Carrier (Optional)</label>
                    <input
                      type="text"
                      value={newShipment.carrier}
                      onChange={(e) => setNewShipment({ ...newShipment, carrier: e.target.value })}
                      placeholder="e.g. -"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">BL Type</label>
                    <input
                      type="text"
                      value={newShipment.blType}
                      onChange={(e) => setNewShipment({ ...newShipment, blType: e.target.value })}
                      placeholder="Original"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Commodity Type</label>
                    <input
                      type="text"
                      value={newShipment.commodityType}
                      onChange={(e) => setNewShipment({ ...newShipment, commodityType: e.target.value })}
                      placeholder="General Cargo"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer Ref #</label>
                    <input
                      type="text"
                      value={newShipment.customerRefNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, customerRefNumber: e.target.value })}
                      placeholder="e.g. 260722MSGY"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PO #</label>
                    <input
                      type="text"
                      value={newShipment.poNumber}
                      onChange={(e) => setNewShipment({ ...newShipment, poNumber: e.target.value })}
                      placeholder="e.g. 260722MSGY"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Commodity Description</label>
                  <input
                    type="text"
                    value={newShipment.commodityDescription}
                    onChange={(e) => setNewShipment({ ...newShipment, commodityDescription: e.target.value })}
                    placeholder="Commodity Specs..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                {/* Milestone Initial Setup */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-seablue-700 mb-4">
                    Initial Milestone Locations (Start as Uncompleted: ○ -- ○ -- ○)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Loading */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <p className="text-xs font-bold text-slate-900">1. Port of Loading</p>
                      <input
                        type="text"
                        value={newShipment.loadingLocation}
                        onChange={(e) => setNewShipment({ ...newShipment, loadingLocation: e.target.value })}
                        placeholder="e.g. CNSHA, Shanghai"
                        className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                      />
                      <p className="text-[10px] text-slate-500">Departure date will be entered when marked reached.</p>
                    </div>

                    {/* Discharge */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <p className="text-xs font-bold text-slate-900">2. Port of Discharge</p>
                      <input
                        type="text"
                        value={newShipment.dischargeLocation}
                        onChange={(e) => setNewShipment({ ...newShipment, dischargeLocation: e.target.value })}
                        placeholder="e.g. INPPV, Port Pipavav"
                        className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                      />
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Planned Initial ETA</label>
                        <input
                          type="date"
                          value={newShipment.dischargeInitialEta}
                          onChange={(e) => setNewShipment({ ...newShipment, dischargeInitialEta: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg glass-input text-xs"
                        />
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <p className="text-xs font-bold text-slate-900">3. Place of Carrier Delivery</p>
                      <input
                        type="text"
                        value={newShipment.deliveryLocation}
                        onChange={(e) => setNewShipment({ ...newShipment, deliveryLocation: e.target.value })}
                        placeholder="e.g. INPPG, Patparganj"
                        className="w-full px-3 py-2 rounded-lg glass-input text-xs"
                      />
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Planned Initial ETA</label>
                        <input
                          type="date"
                          value={newShipment.deliveryInitialEta}
                          onChange={(e) => setNewShipment({ ...newShipment, deliveryInitialEta: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg glass-input text-xs"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex items-center justify-end pt-4">
                  <Button type="submit" variant="primary" size="lg" disabled={loading} icon={Save}>
                    {loading ? 'Saving Shipment...' : 'Create Shipment'}
                  </Button>
                </div>
              </form>
            </div>
          </AnimatedSection>
        )}

        {/* SECTION: EXISTING SHIPMENTS TABLE */}
        {activeTab === 'list' && !selectedShipment && (
          <AnimatedSection direction="up">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Existing Shipments ({shipments.length})</h2>
                <span className="text-xs text-slate-500">Click View & Update to manage milestone status & arrival dates</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3.5">BL Number</th>
                      <th className="px-6 py-3.5">Job Number</th>
                      <th className="px-6 py-3.5">Freight Type</th>
                      <th className="px-6 py-3.5">Milestone Status</th>
                      <th className="px-6 py-3.5">Last Updated</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {shipments.map((ship) => {
                      const t = ship.tracking || {};
                      const completedCount = [t.loading?.completed, t.discharge?.completed, t.delivery?.completed].filter(Boolean).length;

                      return (
                        <tr key={ship._id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-6 py-4 font-bold text-seablue-700 uppercase">{ship.blNumber}</td>
                          <td className="px-6 py-4">{ship.jobNumber}</td>
                          <td className="px-6 py-4">{ship.freightType}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${completedCount === 3 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-seablue-50 text-seablue-700 border border-seablue-200'}`}>
                              {completedCount} / 3 Milestones Reached
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500">{formatLastUpdated(ship.updatedAt)}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setSelectedShipment(ship)}
                              className="px-3 py-1.5 rounded-lg bg-seablue-50 text-seablue-700 font-bold border border-seablue-200 hover:bg-seablue-600 hover:text-white transition-colors"
                            >
                              View & Update &rarr;
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* SECTION: ADMIN SHIPMENT EDITOR PANEL */}
        {selectedShipment && (
          <AnimatedSection direction="up">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-seablue-700 uppercase">Updating Shipment</span>
                  <h2 className="text-2xl font-extrabold text-slate-900">BL No: {selectedShipment.blNumber}</h2>
                </div>

                <Button variant="secondary" size="sm" onClick={() => setSelectedShipment(null)}>
                  Close Editor & Back to List
                </Button>
              </div>

              {/* Specs Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                <div><span className="text-slate-400 block font-medium">Job #</span><span className="font-bold text-slate-900">{selectedShipment.jobNumber}</span></div>
                <div><span className="text-slate-400 block font-medium">Booking #</span><span className="font-bold text-slate-900">{selectedShipment.bookingNumber}</span></div>
                <div><span className="text-slate-400 block font-medium">Freight / Load</span><span className="font-bold text-slate-900">{selectedShipment.freightType} ({selectedShipment.loadType})</span></div>
                <div><span className="text-slate-400 block font-medium">Commodity</span><span className="font-bold text-slate-900">{selectedShipment.commodityDescription}</span></div>
              </div>

              {/* Sequential Rules Notice */}
              <div className="p-3 bg-seablue-50 border border-seablue-200 rounded-2xl text-xs text-seablue-800 flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-seablue-600 shrink-0" />
                <span>Sequential Rule: Step 2 requires Step 1 completed. Step 3 requires Step 2 completed. You can edit dates & names anytime without unmarking.</span>
              </div>

              {/* Independent Milestone Controllers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* 1. PORT OF LOADING */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <span className="text-xs font-extrabold text-slate-900">1. Port of Loading</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tracking.loading?.completed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {tracking.loading?.completed ? '✓ Reached' : '○ Pending'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location Name</label>
                        <input
                          type="text"
                          defaultValue={tracking.loading?.location || ''}
                          id="loading-loc"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold"
                        />
                      </div>

                      {tracking.loading?.completed && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                          <p className="font-bold">Actual Departure Date:</p>
                          <p>{formatDateDisplay(tracking.loading.actualArrivalDate)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveMilestoneDetails('loading')}
                    >
                      Save Name
                    </Button>

                    {tracking.loading?.completed ? (
                      <button
                        onClick={() => handleUnmarkReached('loading')}
                        disabled={Boolean(tracking.discharge?.completed)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all ${tracking.discharge?.completed ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200' : 'text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100'}`}
                        title={tracking.discharge?.completed ? 'Unmark Step 2 (Discharge) first' : 'Unmark Step 1'}
                      >
                        Unmark
                      </button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => openMarkReachedModal('loading')}
                        icon={CheckCircle2}
                      >
                        Mark Reached
                      </Button>
                    )}
                  </div>
                </div>

                {/* 2. PORT OF DISCHARGE */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <span className="text-xs font-extrabold text-slate-900">2. Port of Discharge</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tracking.discharge?.completed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {tracking.discharge?.completed ? '✓ Reached' : '○ Pending'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location Name</label>
                        <input
                          type="text"
                          defaultValue={tracking.discharge?.location || ''}
                          id="discharge-loc"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Initial Planned ETA</label>
                        <input
                          type="date"
                          defaultValue={tracking.discharge?.initialEta ? new Date(tracking.discharge.initialEta).toISOString().split('T')[0] : ''}
                          id="discharge-init"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>

                      {tracking.discharge?.completed && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                          <p className="font-bold">Actual Arrival Date:</p>
                          <p>{formatDateDisplay(tracking.discharge.actualArrivalDate)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveMilestoneDetails('discharge')}
                    >
                      Save Details
                    </Button>

                    {tracking.discharge?.completed ? (
                      <button
                        onClick={() => handleUnmarkReached('discharge')}
                        disabled={Boolean(tracking.delivery?.completed)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-all ${tracking.delivery?.completed ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200' : 'text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100'}`}
                        title={tracking.delivery?.completed ? 'Unmark Step 3 (Delivery) first' : 'Unmark Step 2'}
                      >
                        Unmark
                      </button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={!Boolean(tracking.loading?.completed)}
                        onClick={() => openMarkReachedModal('discharge')}
                        icon={CheckCircle2}
                        className={!Boolean(tracking.loading?.completed) ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        Mark Reached
                      </Button>
                    )}
                  </div>
                </div>

                {/* 3. PLACE OF CARRIER DELIVERY */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                      <span className="text-xs font-extrabold text-slate-900">3. Carrier Delivery</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${tracking.delivery?.completed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        {tracking.delivery?.completed ? '✓ Reached' : '○ Pending'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location Name</label>
                        <input
                          type="text"
                          defaultValue={tracking.delivery?.location || ''}
                          id="delivery-loc"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Initial Planned ETA</label>
                        <input
                          type="date"
                          defaultValue={tracking.delivery?.initialEta ? new Date(tracking.delivery.initialEta).toISOString().split('T')[0] : ''}
                          id="delivery-init"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>

                      {tracking.delivery?.completed && (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                          <p className="font-bold">Actual Arrival Date:</p>
                          <p>{formatDateDisplay(tracking.delivery.actualArrivalDate)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveMilestoneDetails('delivery')}
                    >
                      Save Details
                    </Button>

                    {tracking.delivery?.completed ? (
                      <button
                        onClick={() => handleUnmarkReached('delivery')}
                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg border text-rose-600 border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all"
                      >
                        Unmark
                      </button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={!Boolean(tracking.discharge?.completed)}
                        onClick={() => openMarkReachedModal('delivery')}
                        icon={CheckCircle2}
                        className={!Boolean(tracking.discharge?.completed) ? 'opacity-50 cursor-not-allowed' : ''}
                      >
                        Mark Reached
                      </Button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </AnimatedSection>
        )}

      </div>

      {/* MARK LOCATION AS REACHED FORM MODAL */}
      <AnimatePresence>
        {reachedModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReachedModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Mark Location as Reached</h3>
                </div>

                <button
                  onClick={() => setReachedModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {modalError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {modalError}
                </div>
              )}

              <form onSubmit={handleSaveReachedModal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Milestone</label>
                  <input
                    type="text"
                    disabled
                    value={activeMilestoneKey?.toUpperCase()}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location Name</label>
                  <input
                    type="text"
                    required
                    value={modalLocation}
                    onChange={(e) => setModalLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {activeMilestoneKey === 'loading' ? 'Actual Departure Date *' : 'Actual Arrival Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={modalArrivalDate}
                    onChange={(e) => setModalArrivalDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-bold text-emerald-700"
                  />
                  {activeMilestoneKey !== 'loading' && (
                    <p className="text-[10px] text-slate-500 mt-1">
                      Delay/Early calculation will be automatically computed against Initial ETA ({formatDateDisplay(modalInitialEta)}).
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setReachedModalOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                    disabled={loading}
                    icon={CheckCircle2}
                  >
                    {loading ? 'Saving...' : 'Mark as Reached'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
