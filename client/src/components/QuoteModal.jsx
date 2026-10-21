import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Button from './Button';
import { SERVICES_DATA } from '../data/siteConfig';

const QuoteModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: 'sea-freight',
    origin: '',
    destination: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/sky2seaglobal@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName || 'Not specified',
          email: formData.email,
          service: formData.service,
          origin: formData.origin || 'Not specified',
          destination: formData.destination || 'Not specified',
          cargoDetails: formData.message || 'Standard commercial quote request',
          _subject: `New Rate Request for ${formData.service} from ${formData.fullName}`,
          _template: "table"
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        window.location.href = `mailto:sky2seaglobal@gmail.com?subject=Quote Request for ${encodeURIComponent(formData.service)}&body=${encodeURIComponent(`Name: ${formData.fullName}\nCompany: ${formData.companyName}\nEmail: ${formData.email}\nService: ${formData.service}\nOrigin: ${formData.origin}\nDestination: ${formData.destination}\n\nDetails:\n${formData.message}`)}`;
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Quote submit error:", err);
      window.location.href = `mailto:sky2seaglobal@gmail.com?subject=Quote Request for ${encodeURIComponent(formData.service)}&body=${encodeURIComponent(`Name: ${formData.fullName}\nCompany: ${formData.companyName}\nEmail: ${formData.email}\nService: ${formData.service}\nOrigin: ${formData.origin}\nDestination: ${formData.destination}\n\nDetails:\n${formData.message}`)}`;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Close quote modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 px-4">
                <div className="w-16 h-16 bg-seablue-50 text-seablue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-seablue-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Quote Inquiry Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Thank you for reaching out to <span className="text-seablue-700 font-semibold">SKY2SEA</span>. Our freight specialists will send a detailed estimate to <span className="text-slate-900 font-medium">{formData.email}</span> within 2 business hours.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-left text-xs space-y-1.5 text-slate-700 max-w-md mx-auto">
                  <p><span className="text-slate-500 font-medium">Selected Service:</span> <span className="text-slate-900 font-semibold capitalize">{formData.service.replace('-', ' ')}</span></p>
                  {formData.origin && <p><span className="text-slate-500 font-medium">Route:</span> <span className="text-slate-900 font-semibold">{formData.origin} &rarr; {formData.destination}</span></p>}
                  <p><span className="text-slate-500 font-medium">Contact Person:</span> <span className="text-slate-900 font-semibold">{formData.fullName} ({formData.companyName || 'Private Inquiry'})</span></p>
                </div>

                <Button variant="primary" onClick={handleReset} icon={ArrowRight}>
                  Return to Site
                </Button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-seablue-700 mb-2 bg-seablue-50 px-3 py-1 rounded-full border border-seablue-200">
                    <ShieldCheck className="w-4 h-4 text-seablue-600" /> Instant Rate Request
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Get a Custom Freight Quote</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    Fill out your cargo parameters to receive precise multi-modal rate estimates.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Global Enterprises Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Service Type *</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-white text-slate-900"
                      >
                        {SERVICES_DATA.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Origin Port / City</label>
                      <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        placeholder="e.g. Mumbai, India"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Port / City</label>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="e.g. Rotterdam, NL"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Shipment Cargo & Specs</label>
                    <textarea
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify weight, dimensions, container count, hazard status, or timeframe..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-500">
                      * Required fields. All quotes are free and confidential.
                    </span>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={loading}
                      icon={Send}
                    >
                      {loading ? 'Calculating...' : 'Submit Rate Request'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
