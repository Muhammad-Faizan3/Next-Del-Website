import React from 'react';
import ContactForm from '../components/ContactForm';
import ThreeGlobe from '../components/ThreeGlobe';

export default function Contact() {
  const contactDetails = [
    {
      icon: 'fa-envelope',
      label: 'Email',
      value: 'nextdelofficial@gmail.com',
      href: 'mailto:nextdelofficial@gmail.com'
    },
    {
      icon: 'fa-phone',
      label: 'Phone',
      value: '+92 304 2582657',
      href: 'tel:+92 304 2582657'
    },
    {
      icon: 'fa-map-marker-alt',
      label: 'Location',
      value: 'Pakistan',
      href: null
    }
  ];

  return (
    <div className="pt-24">
      {/* ===== PAGE HEADER ===== */}
      <section className="relative overflow-hidden bg-bg-secondary text-text-primary py-20 text-center">
        <ThreeGlobe
          primaryColor={0x00c853}
          secondaryColor={0x69f0ae}
          opacity={0.3}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest px-4.5 py-1 rounded-full mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Contact Us</h1>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Have a project in mind? Let's talk and turn your vision into reality.
          </p>
        </div>
      </section>

      {/* ===== CONTACT MAIN ===== */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Info Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                Reach out and let's start your digital journey. We're here to help you every step of the way.
              </p>
            </div>

            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <div key={idx} className="flex gap-4.5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green border border-brand-green/15 flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${detail.icon} text-lg`}></i>
                  </div>
                  <div>
                    <h4 className="text-xxs font-bold text-text-light uppercase tracking-wider mb-1">
                      {detail.label}
                    </h4>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="font-bold text-base text-text-primary hover:text-brand-green transition-colors"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="font-bold text-base text-text-primary">
                        {detail.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/nextdel-tech-7bb46b418/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-12 h-12 rounded-full border border-white/10 text-text-secondary hover:bg-brand-green hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.instagram.com/nextdeltech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full border border-white/10 text-text-secondary hover:bg-brand-green hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/people/Maf-Del/61590785262042/?fb_profile_edit_entry_point=%257B%2522click_point%2522%253A%2522edit_profile_button%2522%252C%2522feature%2522%253A%2522profile_header%2522%257D&sk=about"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-12 h-12 rounded-full border border-white/10 text-text-secondary hover:bg-brand-green hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              {/* TikTok - Green Hover */}
              <a
                href="https://www.tiktok.com/@nextdel.tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-12 h-12 rounded-full border border-white/10 text-text-secondary hover:bg-brand-green hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="https://wa.me/03042582657"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-12 h-12 rounded-full border border-white/10 text-text-secondary hover:bg-[#25d366] hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
              >
                <i className="fab fa-whatsapp"></i>
              </a>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-6 bg-bg-card border border-white/10 rounded-3xl p-8 md:p-10 shadow-md">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
