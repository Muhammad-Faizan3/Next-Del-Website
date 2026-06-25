import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Toast from './Toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const showToastMsg = (message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToastMsg("Please fill in all required fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showToastMsg("Please enter a valid email address.", "error");
      return;
    }

    setLoading(true);

    const EMAILJS_PUBLIC_KEY = "wePKbY_ce076gNED7";
    const EMAILJS_SERVICE_ID = "service_gmg8doq";
    const EMAILJS_TEMPLATE_ID = "template_ia0mnym";
    const EMAILJS_AUTO_REPLY_TEMPLATE_ID = "template_ekzhrlt";

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);

      const templateParams = {
        from_name: name.trim(),
        from_email: email.trim(),
        message: message.trim(),
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, templateParams);

      showToastMsg("✅ Message sent successfully!", "success");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("EmailJS Error:", error);
      showToastMsg("❌ Failed to send message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          disabled={loading}
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-delay="150"
          className="w-full text-sm px-5 py-4 rounded-3xl border border-white/10 bg-bg-card text-text-primary focus:outline-none focus:border-brand-green disabled:opacity-50 transition-colors"
        />
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          disabled={loading}
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-delay="200"
          className="w-full text-sm px-5 py-4 rounded-3xl border border-white/10 bg-bg-card text-text-primary focus:outline-none focus:border-brand-green disabled:opacity-50 transition-colors"
        />
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project..."
          required
          disabled={loading}
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-delay="250"
          className="w-full h-36 text-sm px-5 py-4 rounded-3xl border border-white/10 bg-bg-card text-text-primary focus:outline-none focus:border-brand-green disabled:opacity-50 transition-colors resize-none"
        ></textarea>
        
        <button
          type="submit"
          disabled={loading}
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-delay="300"
          className="w-full bg-gradient-to-r from-brand-green to-brand-green-secondary text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Sending...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane"></i>
              Send Message
            </>
          )}
        </button>
      </form>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={handleCloseToast}
      />
    </>
  );
}
