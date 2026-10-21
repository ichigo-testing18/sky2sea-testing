import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Clock, Anchor, MapPin, AlertCircle, Ship } from 'lucide-react';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';
import { trackShipmentByBl } from '../utils/api';
import { calculateArrivalDifference, formatDateDisplay, formatLastUpdated } from '../utils/dateUtils';

const TrackOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialBl = searchParams.get('bl') || '';

  const [blInput, setBlInput] = useState(initialBl);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shipmentData, setShipmentData] = useState(null);

  const fetchTracking = async (blNumber) => {
    if (!blNumber || !blNumber.trim()) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await trackShipmentByBl(blNumber);
      setShipmentData(data.shipment);
    } catch (err) {
      setShipmentData(null);
      setErrorMsg('No shipment found for this BL number. Please check the BL number and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialBl) {
      fetchTracking(initialBl);
    }
  }, [initialBl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!blInput.trim()) return;
    setSearchParams({ bl: blInput.trim() });
    fetchTracking(blInput.trim());
  };

  const tracking = shipmentData?.tracking || {};
  const loadingMilestone = tracking.loading || {};
  const dischargeMilestone = tracking.discharge || {};
  const deliveryMilestone = tracking.delivery || {};

  const renderMilestoneDisplay = (milestone, defaultIcon = null) => {
    const isCompleted = Boolean(milestone.completed);
    const location = milestone.location || '-';
    const isLoadingPort = milestone.label === 'Port of Loading';
    const initialEta = milestone.initialEta;
    const actualArrivalDate = milestone.actualArrivalDate;

    // 1. PENDING / UNCOMPLETED MILESTONE (completed === false)
    if (!isCompleted) {
      return (
        <div className="pl-1 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-base">
            {defaultIcon}
            <span>{location}</span>
          </div>
          <p className="text-xs font-semibold text-slate-600">
            {isLoadingPort
              ? (initialEta ? formatDateDisplay(initialEta, 'Planned ETD:') : 'ETD Pending')
              : formatDateDisplay(initialEta, 'Initial ETA:')}
          </p>
        </div>
      );
    }

    // 2. REACHED / COMPLETED MILESTONE (completed === true)
    if (isLoadingPort) {
      return (
        <div className="pl-1 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-base">
            {defaultIcon}
            <span>{location}</span>
          </div>
          <p className="text-xs font-semibold text-emerald-700">
            {formatDateDisplay(actualArrivalDate, 'ETD')}
          </p>
        </div>
      );
    }

    const diffDays = calculateArrivalDifference(actualArrivalDate, initialEta);

    return (
      <div className="pl-1 space-y-1">
        <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-base">
          {defaultIcon}
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-slate-900">
            {formatDateDisplay(actualArrivalDate, 'ETA')}
          </p>

          {/* LATE ARRIVAL */}
          {diffDays !== null && diffDays > 0 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-700 border border-rose-200">
              + {diffDays} Days
            </span>
          )}

          {/* EARLY ARRIVAL */}
          {diffDays !== null && diffDays < 0 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200">
              - {Math.abs(diffDays)} Days
            </span>
          )}

          {/* ON TIME ARRIVAL */}
          {diffDays !== null && diffDays === 0 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700 border border-emerald-200">
              On Time
            </span>
          )}
        </div>

        {initialEta && (
          <p className="text-[11px] text-slate-400 font-medium">
            Initial Carrier ETA: {formatDateDisplay(initialEta)}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header Banner */}
        <AnimatedSection direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Track Your <span className="text-gradient-sea">Shipment</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Enter your Bill of Lading (BL Number) to view real-time transit status, ETAs, and milestone verification.
            </p>
          </div>

          {/* Input Form Box */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-white border border-slate-200 rounded-2xl shadow-lg">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={blInput}
                  onChange={(e) => setBlInput(e.target.value)}
                  placeholder="Enter BL Number..."
                  className="w-full pl-12 pr-4 py-3.5 text-sm font-semibold uppercase rounded-xl border-none focus:outline-none text-slate-900 placeholder:normal-case placeholder:font-normal"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full sm:w-auto px-8"
              >
                {loading ? 'Searching...' : 'Track Shipment'}
              </Button>
            </div>
          </form>
        </AnimatedSection>

        {/* Error Alert Message */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-10 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </motion.div>
        )}

        {/* TRACKING RESULT DISPLAY UI */}
        {shipmentData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden"
          >
            {/* Top Bar Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-seablue-600 animate-ping" />
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900">
                  Shipment Status
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Last updated: {formatLastUpdated(shipmentData.updatedAt)}</span>
              </div>
            </div>

            {/* Tracking Timeline Progress Bar */}
            <div className="p-6 sm:p-10 border-b border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
                
                {/* Node 1: Port of Loading */}
                <div className="flex flex-col items-start relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${loadingMilestone.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-300'}`}>
                      {loadingMilestone.completed ? <CheckCircle2 className="w-5 h-5" /> : '○'}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {loadingMilestone.label || 'Port of Loading'}
                    </span>
                  </div>

                  {renderMilestoneDisplay(loadingMilestone, <Anchor className="w-4 h-4 text-seablue-600 shrink-0" />)}
                </div>

                {/* Node 2: Port of Discharge */}
                <div className="flex flex-col items-start relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${dischargeMilestone.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-300'}`}>
                      {dischargeMilestone.completed ? <CheckCircle2 className="w-5 h-5" /> : '○'}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {dischargeMilestone.label || 'Port of Discharge'}
                    </span>
                  </div>

                  {renderMilestoneDisplay(dischargeMilestone)}
                </div>

                {/* Node 3: Place of Carrier Delivery */}
                <div className="flex flex-col items-start relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${deliveryMilestone.completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-300'}`}>
                      {deliveryMilestone.completed ? <CheckCircle2 className="w-5 h-5" /> : '○'}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {deliveryMilestone.label || 'Place of Carrier Delivery'}
                    </span>
                  </div>

                  {renderMilestoneDisplay(deliveryMilestone)}
                </div>

              </div>
            </div>

            {/* Shipment Specifications Details Grid */}
            <div className="p-6 sm:p-10 bg-slate-50/50">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-seablue-600" /> Shipment Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Job #</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.jobNumber || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Freight Type</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.freightType || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Load Type</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.loadType || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Containers</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.containers || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Carrier</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.carrier || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Booking #</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.bookingNumber || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">BL #</span>
                  <span className="text-seablue-700 font-bold text-sm">{shipmentData.blNumber || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">BL Type</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.blType || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Commodity Type</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.commodityType || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Commodity Description</span>
                  <span className="text-slate-900 font-bold text-sm leading-snug block">{shipmentData.commodityDescription || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Customer Ref #</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.customerRefNumber || '-'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">PO #</span>
                  <span className="text-slate-900 font-bold text-sm">{shipmentData.poNumber || '-'}</span>
                </div>
              </div>
            </div>

          </motion.div>
        ) : !loading && !errorMsg && (
          <div className="text-center py-12 px-4 rounded-3xl bg-slate-50 border border-slate-200 border-dashed">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Ready to Track Your Order</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Enter your Bill of Lading (BL Number) in the search field above to display live transit details.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;
