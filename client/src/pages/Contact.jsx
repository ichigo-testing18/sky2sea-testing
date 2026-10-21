import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle2, Globe, Compass } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Button from '../components/Button';
import { CONTACT_CONFIG, SERVICES_DATA } from '../data/siteConfig';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    serviceRequired: 'sea-freight',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

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
          serviceRequired: formData.serviceRequired,
          message: formData.message,
          _subject: `New Inquiry from ${formData.fullName} (${formData.email}) - SKY2SEA`,
          _template: "table"
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback to mailto
        window.location.href = `mailto:sky2seaglobal@gmail.com?subject=Inquiry from ${encodeURIComponent(formData.fullName)}&body=${encodeURIComponent(`Name: ${formData.fullName}\nCompany: ${formData.companyName}\nEmail: ${formData.email}\nService: ${formData.serviceRequired}\n\nMessage:\n${formData.message}`)}`;
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Form submit error:", err);
      window.location.href = `mailto:sky2seaglobal@gmail.com?subject=Inquiry from ${encodeURIComponent(formData.fullName)}&body=${encodeURIComponent(`Name: ${formData.fullName}\nCompany: ${formData.companyName}\nEmail: ${formData.email}\nService: ${formData.serviceRequired}\n\nMessage:\n${formData.message}`)}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-16 relative bg-white">
      
      {/* ========================================================================= */}
      {/* CONTACT HERO */}
      {/* ========================================================================= */}
      <section className="relative py-12 overflow-hidden bg-hero-radial border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection direction="up">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto mb-4">
              Get in Touch with <span className="text-gradient-sea">SKY2SEA</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have a shipping inquiry or need custom freight consulting? Contact our global operations desk today.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN CONTACT CONTENT: FORM + INFO */}
      {/* ========================================================================= */}
      <section className="py-16 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact Cards & Details */}
            <div className="lg:col-span-5 space-y-8">
              
              <AnimatedSection direction="left">
                <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">Direct Communication</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our team is ready to assist you with rate requests, vessel routing, customs regulations, and container tracking.
                  </p>

                  <div className="space-y-4 pt-2">
                    {/* Email */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="w-10 h-10 rounded-xl bg-seablue-50 border border-seablue-200 flex items-center justify-center text-seablue-600 shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Inquiry</p>
                        <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-sm font-semibold text-slate-900 hover:text-seablue-700 transition-colors">
                          {CONTACT_CONFIG.email}
                        </a>
                      </div>
                    </div>


                    {/* Location */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="w-10 h-10 rounded-xl bg-seablue-50 border border-seablue-200 flex items-center justify-center text-seablue-600 shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Headquarters / Hub</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {CONTACT_CONFIG.address}
                        </p>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="w-10 h-10 rounded-xl bg-seablue-50 border border-seablue-200 flex items-center justify-center text-seablue-600 shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Operational Support Hours</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {CONTACT_CONFIG.operatingHours}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </AnimatedSection>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="right">
                <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-md relative overflow-hidden">
                  
                  {submitted ? (
                    <div className="py-12 text-center space-y-6">
                      <div className="w-20 h-20 rounded-full bg-seablue-50 text-seablue-600 border border-seablue-200 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      
                      <h3 className="text-3xl font-extrabold text-slate-900">Inquiry Sent Successfully!</h3>
                      <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you for contacting <span className="text-seablue-700 font-semibold">SKY2SEA</span>. A representative from our cargo planning division will respond to <span className="text-slate-900 font-medium">{formData.email}</span> shortly.
                      </p>

                      <div className="pt-4">
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({
                              fullName: '',
                              companyName: '',
                              email: '',
                              serviceRequired: 'sea-freight',
                              message: ''
                            });
                          }}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-seablue-700 mb-1 block">Inquiry Form</span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Send Us a Message</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Complete the form below and our team will get back to you within 2 business hours.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                            <input
                              type="text"
                              name="fullName"
                              required
                              value={formData.fullName}
                              onChange={handleChange}
                              placeholder="Alex Mercer"
                              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Company Name</label>
                            <input
                              type="text"
                              name="companyName"
                              value={formData.companyName}
                              onChange={handleChange}
                              placeholder="Global Logistics Inc"
                              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-3 rounded-xl glass-input text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Primary Service Required *</label>
                          <select
                            name="serviceRequired"
                            value={formData.serviceRequired}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-white text-slate-900"
                          >
                            {SERVICES_DATA.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Shipment Details & Requirements *</label>
                          <textarea
                            name="message"
                            rows="4"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your cargo specifications, preferred routes, target transit times, or general questions..."
                            className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
                          ></textarea>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <a
                            href="mailto:sky2seaglobal@gmail.com"
                            className="text-xs font-bold text-[#00539C] hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
                          >
                            <Mail className="w-3.5 h-3.5 text-orange-500" />
                            <span>Direct email: sky2seaglobal@gmail.com</span>
                          </a>

                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={submitting}
                            icon={Send}
                          >
                            {submitting ? 'Sending...' : 'Send Inquiry'}
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-16 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 p-8 text-center shadow-xs">
              
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-white flex flex-col items-center justify-center p-6 border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1800"
                  alt="Global Logistics Network Location Overview"
                  className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply"
                />

                <div className="relative z-10 space-y-4 max-w-lg mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-seablue-50 border border-seablue-200 flex items-center justify-center text-seablue-600 mx-auto shadow-sm">
                    <Compass className="w-7 h-7 animate-spin" style={{ animationDuration: '30s' }} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">Global Operations Corridor</h3>
                  <p className="text-sm text-slate-600">
                    Connecting key shipping ports across India, the Middle East, Europe, and Asia.
                  </p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-seablue-700 shadow-xs">
                    <Globe className="w-4 h-4 text-seablue-600" />
                    <span>Headquarters Corridor: India Logistics Hub</span>
                  </div>
                </div>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default Contact;
