import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { CheckCircle2, Calendar, Send, AlertCircle, MessageSquare, ShieldAlert } from 'lucide-react';
import { ATTARS, FULL_CATALOG_ATTARS } from '../data';
import { ConsultationFormData } from '../types';

interface OrderFormProps {
  selectedAttarName: string;
  setSelectedAttarName: (name: string) => void;
}

export default function OrderForm({ selectedAttarName, setSelectedAttarName }: OrderFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [-110, 110]);
  const yFrame = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    contactNumber: '',
    email: '',
    selectedAttar: '',
    selectedSize: '6 ml',
    visitDate: '',
    specialInstructions: '',
  });

  const [productFormat, setProductFormat] = useState<'oil' | 'spray'>('oil');
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync prop with local state when selected attar changes
  useEffect(() => {
    if (selectedAttarName) {
      setFormData((prev) => ({ ...prev, selectedAttar: selectedAttarName }));
    }
  }, [selectedAttarName]);

  const validateField = (name: keyof ConsultationFormData, value: any): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters.';
        return '';
      case 'contactNumber':
        if (!value.trim()) return 'Contact Number is required.';
        const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
        if (!phoneRegex.test(value.trim().replace(/\s+/g, ''))) {
          return 'Please enter a valid 10-digit mobile number (e.g. 9876543210).';
        }
        return '';
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address.';
        }
        return '';
      case 'selectedAttar':
        if (!value) return 'Please select the fragrance of interest.';
        return '';
      case 'selectedSize':
        if (!value) return 'Please select the required volume.';
        return '';
      case 'visitDate':
        if (!value) return 'Please select your preferred visit date and time.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error immediately on change
    if (errors[name as keyof ConsultationFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const fieldError = validateField(name as keyof ConsultationFormData, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger validation for all fields
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};
    let hasErrors = false;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof ConsultationFormData, formData[key as keyof ConsultationFormData]);
      if (error) {
        newErrors[key as keyof ConsultationFormData] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury appointment booking
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const triggerWhatsAppRedirect = () => {
    const formatDateTime = (dtStr: string) => {
      try {
        const dt = new Date(dtStr);
        return dt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      } catch (e) {
        return dtStr;
      }
    };

    const message = `*A-ONE LUXURY FRAGRANCE - CONSULTATION BOOKING*%0A%0A` +
      `*Full Name:* ${formData.fullName}%0A` +
      `*Contact:* ${formData.contactNumber}%0A` +
      `*Email:* ${formData.email || 'N/A'}%0A` +
      `*Fragrance Interest:* ${formData.selectedAttar}%0A` +
      `*Volume Needed:* ${formData.selectedSize}%0A` +
      `*Preferred Visit:* ${formatDateTime(formData.visitDate)}%0A` +
      `*Special Enquiry:* ${formData.specialInstructions || 'None'}`;

    window.open(`https://wa.me/917799020387?text=${message}`, '_blank');
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      contactNumber: '',
      email: '',
      selectedAttar: '',
      selectedSize: '6 ml',
      visitDate: '',
      specialInstructions: '',
    });
    setProductFormat('oil');
    setErrors({});
    setIsSubmitted(false);
    setSelectedAttarName('');
  };

  return (
    <section id="order" ref={containerRef} className="py-24 bg-black relative overflow-hidden">
      {/* Golden accent borders */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

      {/* Decorative drifting parallax background light */}
      <motion.div 
        style={{ y: yBg, willChange: 'transform' }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [80, -80]), willChange: 'transform' }}
        className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-gold/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-gold block mb-2">Boutique Experience</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-wide">
            Reserve Your Scent Session
          </h2>
          <p className="text-cream/70 text-xs sm:text-sm mt-3 font-light leading-relaxed">
            Pure botanical attars react uniquely to your physical body heat and skin oils. To experience their true dry-down and royal transition, we invite you to our physical counter. Let us host you for a private, personalized consultation.
          </p>
        </div>

        {/* Form panel container */}
        <motion.div 
          style={{ y: yFrame, willChange: 'transform' }}
          className="bg-neutral-950/60 backdrop-blur-md border border-gold/15 p-6 sm:p-10 relative overflow-hidden shadow-[0_15px_50px_0_rgba(0,0,0,0.7)] hover:shadow-[0_0_50px_rgba(214,175,55,0.06)] transition-all duration-700 rounded-none"
        >
          {/* Ornate corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/30"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/30"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/30"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/30"></div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="consultation-form-active"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* Identity Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold text-left block font-mono">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your name"
                      className={`w-full bg-black/90 border ${
                        errors.fullName ? 'border-rose-500 focus:ring-rose-500/20' : 'border-gold/20 focus:border-gold focus:ring-gold/10'
                      } px-4 py-3 text-cream text-sm focus:outline-none focus:ring-1 rounded-none placeholder-cream/30 transition-all font-light`}
                    />
                    {errors.fullName && (
                      <p className="text-rose-400 text-xs flex items-center space-x-1 mt-1 font-sans">
                        <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold text-left block font-mono">
                      WhatsApp Contact Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full bg-black/90 border ${
                        errors.contactNumber ? 'border-rose-500 focus:ring-rose-500/20' : 'border-gold/20 focus:border-gold focus:ring-gold/10'
                      } px-4 py-3 text-cream text-sm focus:outline-none focus:ring-1 rounded-none placeholder-cream/30 transition-all font-light`}
                    />
                    {errors.contactNumber && (
                      <p className="text-rose-400 text-xs flex items-center space-x-1 mt-1 font-sans">
                        <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                        <span>{errors.contactNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email and Preferred Visit Date/Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email (Optional) */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold text-left block font-mono">
                      Email Address <span className="text-cream/40 font-sans text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. patron@example.com"
                      className={`w-full bg-black/90 border ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500/20' : 'border-gold/20 focus:border-gold focus:ring-gold/10'
                      } px-4 py-3 text-cream text-sm focus:outline-none focus:ring-1 rounded-none placeholder-cream/30 transition-all font-light`}
                    />
                    {errors.email && (
                      <p className="text-rose-400 text-xs flex items-center space-x-1 mt-1 font-sans">
                        <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Visit Date Picker */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold text-left block font-mono">
                      Preferred Visit Date <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="visitDate"
                      value={formData.visitDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-black/90 border ${
                        errors.visitDate ? 'border-rose-500 focus:ring-rose-500/20' : 'border-gold/20 focus:border-gold focus:ring-gold/10'
                      } px-4 py-3 text-cream text-sm focus:outline-none focus:ring-1 rounded-none transition-all font-mono`}
                    />
                    {errors.visitDate && (
                      <p className="text-rose-400 text-xs flex items-center space-x-1 mt-1 font-sans">
                        <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                        <span>{errors.visitDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Fragrance Select Dropdown - Full Width */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gold text-left block font-mono">
                      Which Attar / Set Are You Interested In? <span className="text-rose-500">*</span>
                    </label>
                    <select
                      name="selectedAttar"
                      value={formData.selectedAttar}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-black/90 border ${
                        errors.selectedAttar ? 'border-rose-500 focus:ring-rose-500/20' : 'border-gold/20 focus:border-gold focus:ring-gold/10'
                      } px-4 py-3 text-cream text-sm focus:outline-none focus:ring-1 rounded-none transition-all font-light`}
                    >
                      <option value="" disabled className="bg-luxury-black text-cream/40">-- Select Fragrance of Interest --</option>
                      <optgroup label="Signature Highlights" className="bg-luxury-black text-gold">
                        {ATTARS.map((attar) => (
                          <option key={attar.id} value={attar.name} className="bg-luxury-black text-white">
                            ✦ {attar.name} ({attar.category})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="All 44 Premium Attars" className="bg-luxury-black text-gold">
                        {FULL_CATALOG_ATTARS.map((attar) => (
                          <option key={attar.id} value={attar.name} className="bg-luxury-black text-white">
                            ✦ {attar.name} ({attar.category})
                          </option>
                        ))}
                        <option value="Not Sure - Need Guidance" className="bg-luxury-black text-white">✦ Let Scent Profilist Guide Me (Not Sure)</option>
                      </optgroup>
                    </select>
                    {errors.selectedAttar && (
                      <p className="text-rose-400 text-xs flex items-center space-x-1 mt-1 font-sans">
                        <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                        <span>{errors.selectedAttar}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Product Format Selector */}
                <div className="space-y-3 text-left">
                  <label className="text-xs uppercase tracking-widest text-gold block font-mono">
                    Product Format <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setProductFormat('oil');
                        setFormData(prev => ({ ...prev, selectedSize: '6 ml' }));
                      }}
                      className={`border px-4 py-3 flex flex-col items-start justify-center transition-all duration-300 rounded-[#020202] cursor-pointer group ${
                        productFormat === 'oil'
                          ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(214,175,55,0.25)]'
                          : 'bg-black/45 border-gold/20 hover:border-gold/50 hover:bg-gold/5'
                      }`}
                    >
                      <span className={`font-serif text-base tracking-wider font-semibold block transition-colors ${productFormat === 'oil' ? 'text-gold' : 'text-cream/85 group-hover:text-white'}`}>
                        Pure Attar Oil
                      </span>
                      <span className="text-[10px] text-cream/40 mt-1 leading-tight font-light text-left">
                        100% concentrated pure perfume oils (3ml, 6ml, 12ml)
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProductFormat('spray');
                        setFormData(prev => ({ ...prev, selectedSize: '30 ml' }));
                      }}
                      className={`border px-4 py-3 flex flex-col items-start justify-center transition-all duration-300 rounded-[#020202] cursor-pointer group ${
                        productFormat === 'spray'
                          ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(214,175,55,0.25)]'
                          : 'bg-black/45 border-gold/20 hover:border-gold/50 hover:bg-gold/5'
                      }`}
                    >
                      <span className={`font-serif text-base tracking-wider font-semibold block transition-colors ${productFormat === 'spray' ? 'text-gold' : 'text-cream/85 group-hover:text-white'}`}>
                        Perfume Spray
                      </span>
                      <span className="text-[10px] text-cream/40 mt-1 leading-tight font-light text-left">
                        Premium inspired sprays & designer alternatives (10ml, 30ml)
                      </span>
                    </button>
                  </div>
                </div>

                {/* Volume Selector */}
                <div className="space-y-3 text-left">
                  <label className="text-xs uppercase tracking-widest text-gold block font-mono animate-fade-in">
                    Required Volume (Bottle Size) <span className="text-rose-500">*</span>
                  </label>
                  <div className={`grid gap-4 ${productFormat === 'oil' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {productFormat === 'oil' ? (
                      ['3 ml', '6 ml', '12 ml'].map((size) => {
                        const isActive = formData.selectedSize === size;
                        const sizeDescriptions: Record<string, string> = {
                          '3 ml': 'Trial bottle',
                          '6 ml': 'Half-Tola size',
                          '12 ml': 'Full-Tola size',
                        };
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, selectedSize: size }));
                              if (errors.selectedSize) {
                                setErrors(prev => ({ ...prev, selectedSize: '' }));
                              }
                            }}
                            className={`border px-4 py-4 flex flex-col items-center justify-center transition-all duration-300 rounded-[#020202] cursor-pointer group ${
                              isActive
                                ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(214,175,55,0.25)]'
                                : 'bg-black/45 border-gold/20 hover:border-gold/50 hover:bg-gold/5'
                            }`}
                          >
                            <span className={`font-serif text-base tracking-wider font-semibold block transition-colors ${isActive ? 'text-gold' : 'text-cream/85 group-hover:text-white'}`}>
                              {size}
                            </span>
                            <span className="text-[10px] text-cream/40 text-center mt-1 leading-tight font-light hidden sm:block">
                              {sizeDescriptions[size]}
                            </span>
                          </button>
                        );
                      })
                    ) : (
                      ['10 ml', '30 ml'].map((size) => {
                        const isActive = formData.selectedSize === size;
                        const sizeDescriptions: Record<string, string> = {
                          '10 ml': 'Travel Perfume Spray',
                          '30 ml': 'Boutique Perfume Spray',
                        };
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, selectedSize: size }));
                              if (errors.selectedSize) {
                                setErrors(prev => ({ ...prev, selectedSize: '' }));
                              }
                            }}
                            className={`border px-4 py-4 flex flex-col items-center justify-center transition-all duration-300 rounded-[#020202] cursor-pointer group ${
                              isActive
                                ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(214,175,55,0.25)]'
                                : 'bg-black/45 border-gold/20 hover:border-gold/50 hover:bg-gold/5'
                            }`}
                          >
                            <span className={`font-serif text-base tracking-wider font-semibold block transition-colors ${isActive ? 'text-gold' : 'text-cream/85 group-hover:text-white'}`}>
                              {size}
                            </span>
                            <span className="text-[10px] text-cream/40 text-center mt-1 leading-tight font-light hidden sm:block">
                              {sizeDescriptions[size]}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                  {productFormat === 'spray' && (
                    <div className="p-3.5 bg-gold/5 border border-gold/15 text-cream/80 text-[11px] font-mono tracking-wide leading-relaxed">
                      💡 <strong className="text-gold font-normal">Boutique Special Notice:</strong> Long-lasting inspired designer sprays are proudly crafted at our counter. We supply exact, premium oil-based matches for leading international scents in comfortable travel & daily sizes.
                    </div>
                  )}
                  {errors.selectedSize && (
                    <p className="text-rose-400 text-xs flex items-center space-x-1 mt-1 font-sans animate-bounce">
                      <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                      <span>{errors.selectedSize}</span>
                    </p>
                  )}
                </div>

                {/* Special Instructions (Optional) */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold text-left block font-mono">
                    Special Requests / Notes for the Scent Profilist <span className="text-cream/40 font-sans text-[10px]">(Optional)</span>
                  </label>
                  <textarea
                    name="specialInstructions"
                    rows={3}
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Seeking high-longevity oudh, purchasing an anniversary present, or requesting specific Indian wood notes..."
                    className="w-full bg-black/90 border border-gold/20 focus:border-gold focus:ring-gold/10 px-4 py-3 text-cream text-sm focus:outline-none focus:ring-1 rounded-none placeholder-cream/30 transition-all font-light resize-none"
                  />
                </div>

                {/* Submit Block */}
                <div className="pt-4">
                  <button
                    type="submit"
                    id="submit-consultation-btn"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-burgundy via-burgundy-dark to-burgundy border border-gold hover:border-gold-light text-white font-medium text-xs tracking-[0.25em] uppercase rounded-none transition-all duration-300 shadow-[0_4px_25px_rgba(128,0,32,0.4)] cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Scheduling Appointment...</span>
                    ) : (
                      <>
                        <Calendar className="h-4 w-4 text-gold" />
                        <span>Request Scent Consultation</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* CONSULTATION SUCCESS DISPLAY */
              <motion.div
                key="consultation-success-stage"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center space-y-6"
              >
                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-gold animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold">
                    Consultation Scheduled!
                  </h3>
                  <p className="text-gold uppercase tracking-[0.15em] text-xs font-mono">
                    Reservation ID: A1-RES-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>

                <div className="bg-black/60 border border-gold/10 p-6 max-w-md mx-auto text-left space-y-3 font-light text-sm">
                  <p className="border-b border-gold/10 pb-2 text-gold font-mono tracking-widest uppercase text-xs">Reservation Details</p>
                  <p><strong className="text-cream font-mono">Patron Name:</strong> <span className="text-white">{formData.fullName}</span></p>
                  <p><strong className="text-cream font-mono">Selected Fragrance:</strong> <span className="text-white">{formData.selectedAttar}</span></p>
                  <p><strong className="text-cream font-mono">Volume Requested:</strong> <span className="text-white">{formData.selectedSize}</span></p>
                  <p><strong className="text-cream font-mono">Preferred Visit:</strong> <span className="text-white">
                    {new Date(formData.visitDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span></p>
                  <p><strong className="text-cream font-mono">Boutique:</strong> <span className="text-white">Inside A-1 Luxury Paints, MLG Road, Nalgonda</span></p>
                </div>

                <p className="text-cream/70 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                  Excellent choice. Our counter master will be ready to host you. Please share this secure booking summary directly via WhatsApp to verify your consultation instant slot!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
                  <button
                    onClick={triggerWhatsAppRedirect}
                    id="success-whatsapp-btn"
                    className="w-full sm:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-widest uppercase rounded-none flex items-center justify-center space-x-2 transition-all cursor-pointer pointer-events-auto"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send details to WhatsApp</span>
                  </button>

                  <button
                    onClick={resetForm}
                    id="success-new-consult-btn"
                    className="w-full sm:w-auto px-6 py-4 bg-transparent border border-gold/40 text-gold hover:bg-gold/15 font-semibold text-xs tracking-widest uppercase rounded-none transition-all cursor-pointer"
                  >
                    <span>New Reservation</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
