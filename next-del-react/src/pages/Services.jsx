import React from 'react';
import ThreeWaves from '../components/ThreeWaves';

export default function Services() {
  const services = [
    {
      icon: 'fa-store',
      title: 'Ecommerce Development',
      desc: 'Full-featured online stores with seamless payment integration and inventory management.',
      list: ['Online stores', 'Product management', 'Payment integration', 'Customer accounts', 'Admin dashboard']
    },
    {
      icon: 'fa-code',
      title: 'Custom Development',
      desc: 'Bespoke web applications and business software built to your exact requirements.',
      list: ['Web applications', 'Business software', 'APIs & integration', 'Database solutions']
    },
    {
      icon: 'fa-globe',
      title: 'Web Development',
      desc: 'Professional websites, landing pages, and CMS solutions that drive results.',
      list: ['Company websites', 'Landing pages', 'Responsive design', 'CMS Development']
    },
    {
      icon: 'fa-mobile-alt',
      title: 'Mobile App Development',
      desc: 'Native and cross-platform mobile applications for iOS and Android.',
      list: ['iOS & Android apps', 'Cross-platform solutions', 'UI/UX design', 'App store deployment']
    },
    {
      icon: 'fa-shopify',
      title: 'Shopify Development',
      desc: 'Complete Shopify store setup, customization, and optimization.',
      list: ['Store setup', 'Custom themes', 'App integration', 'Performance optimization']
    },
    {
      icon: 'fa-wordpress',
      title: 'WordPress Development',
      desc: 'Custom WordPress themes, plugins, and performance optimization.',
      list: ['Custom themes', 'Plugin development', 'Performance optimization', 'Maintenance & support']
    }
  ];

  const steps = [
    { num: '01', icon: 'fa-search', title: 'Research & Planning' },
    { num: '02', icon: 'fa-paint-brush', title: 'UI/UX Design' },
    { num: '03', icon: 'fa-laptop-code', title: 'Development' },
    { num: '04', icon: 'fa-rocket', title: 'Launch & Support' }
  ];

  return (
    <div className="pt-24">
      {/* ===== PAGE HEADER ===== */}
      <section className="relative overflow-hidden bg-bg-secondary text-text-primary py-20 text-center">
        <ThreeWaves
          color={0x00c853}
          opacity={0.3}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest px-4.5 py-1 rounded-full mb-4">
            What We Do
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Our Services</h1>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            End-to-end digital solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="bg-bg-card border border-white/10 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-green to-brand-green-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                {/* Check if it is fontawesome brand icon vs standard class */}
                <i className={`text-4xl bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-6 block ${
                  item.icon.startsWith('fa-') ? `fas ${item.icon}` : `fab ${item.icon}`
                }`}></i>
                
                <h3 className="text-xl font-bold mb-3 text-text-primary">
                  {item.title}
                </h3>
                
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  {item.desc}
                </p>
                
                <ul className="text-text-secondary space-y-2 text-xs">
                  {item.list.map((li, i) => (
                    <li key={i}>
                      <span className="text-brand-green mr-1.5 font-bold">▸</span> {li}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="inline-block bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-3">
              How We Work
            </h2>
            <p className="text-text-secondary text-sm">
              A transparent, structured approach to building your digital product.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-bg-card border border-white/10 rounded-3xl p-8 relative flex flex-col items-start"
              >
                <span className="text-4xl font-black bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-4">
                  {step.num}
                </span>
                <i className={`fas ${step.icon} text-2xl text-text-secondary mb-4 block`}></i>
                <h4 className="text-lg font-bold text-text-primary leading-tight">
                  {step.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
