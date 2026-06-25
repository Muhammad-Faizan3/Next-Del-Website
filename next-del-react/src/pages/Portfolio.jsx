import React from 'react';
import { Link } from 'react-router-dom';
import ThreeConstellation from '../components/ThreeConstellation';

export default function Portfolio() {
  const projects = [
    {
      icon: 'fa-shopping-cart',
      title: 'Ecommerce Platform',
      desc: 'Full-featured online store with payment integration and inventory management.',
      tags: ['Stripe', 'PayPal', 'React', 'Node.js']
    },
    {
      icon: 'fa-school',
      title: 'School Management System',
      desc: 'Complete administration and student management platform with parent portal.',
      tags: ['Next.js', 'MongoDB', 'Express']
    },
    {
      icon: 'fa-chart-pie',
      title: 'Business CRM Dashboard',
      desc: 'Analytics and customer relationship management with real-time metrics.',
      tags: ['React', 'D3.js', 'PostgreSQL']
    },
    {
      icon: 'fa-heartbeat',
      title: 'HealthTrack Mobile App',
      desc: 'Patient monitoring and telemedicine platform with video consultations.',
      tags: ['React Native', 'Firebase', 'WebRTC']
    },
    {
      icon: 'fa-robot',
      title: 'AI Customer Support Bot',
      desc: 'Conversational AI with multi-channel deployment and analytics.',
      tags: ['Python', 'NLP', 'Slack API']
    },
    {
      icon: 'fa-wallet',
      title: 'FinTech Dashboard',
      desc: 'Personal finance and investment tracking suite with real-time stocks.',
      tags: ['Angular', 'Django', 'WebSocket']
    }
  ];

  return (
    <div className="pt-24">
      {/* ===== PAGE HEADER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1a0a] to-[#1a2a1a] from-bg-primary to-bg-secondary text-white py-20 text-center">
        <ThreeConstellation
          primaryColor={0x00c853}
      secondaryColor={0x69f0ae}
          opacity={0.3}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block bg-white/10 text-brand-green-light font-bold text-xs uppercase tracking-widest px-4.5 py-1 rounded-full mb-4">
            Our Work
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Our Portfolio</h1>
          <p className="text-[#8aa0c0] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Check out some of our latest projects and see what we can do for you.
          </p>
        </div>
      </section>

      {/* ===== PORTFOLIO GRID ===== */}
      <section className="py-24 bg-bg-secondary dark:bg-bg-secondary ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-light-bg-primary dark:bg-dark-bg-card border border-white/10 dark:border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-102 hover:border-brand-green/30"
              >
                <i className={`fas ${project.icon} text-4xl bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-6 block`}></i>
                
                <h4 className="text-xl font-bold mb-3 text-text-primary dark:text-text-brand-darkPrimary">
                  {project.title}
                </h4>
                
                <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-sm mb-6 leading-relaxed">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-bg-secondary dark:bg-[#243024] text-text-brand-secondary dark:text-brand-green-light font-semibold text-xxs py-1.5 px-3.5 rounded-full border border-white/10 dark:border-brand-green-light/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-light-bg-primary dark:bg-bg-primary text-text-primary dark:text-text-brand-darkPrimary text-center ">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Ready to Start Your Project?</h2>
          <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-sm md:text-base max-w-lg mx-auto mb-8">
            Let's discuss your ideas and turn them into reality.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-brand-green to-brand-green-secondary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
