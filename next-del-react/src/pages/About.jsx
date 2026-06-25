import React from 'react';
import { Link } from 'react-router-dom';
import ThreeHelix from '../components/ThreeHelix';

export default function About() {
  const values = [
    {
      icon: 'fa-lightbulb',
      title: 'Innovation',
      desc: 'We embrace new technologies and creative approaches to solve complex problems.'
    },
    {
      icon: 'fa-users',
      title: 'Collaboration',
      desc: 'We work closely with our clients to ensure every project exceeds expectations.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Quality',
      desc: 'We never compromise on quality — every line of code is built with care and precision.'
    },
    {
      icon: 'fa-rocket',
      title: 'Growth',
      desc: 'We\'re committed to continuous learning and helping our clients grow their businesses.'
    }
  ];

  const team = [
    {
      initials: 'MA',
      name: 'Muhammad Afzal',
      role: 'CEO & Founder'
    },
    {
      initials: 'MF',
      name: 'Muhammad Faizan',
      role: 'Lead Developer'
    },
    {
      initials: 'MN',
      name: 'Mudassir Neveed',
      role: 'Frontend Developer'
    },
    {
      initials: 'SK',
      name: 'Salman Khan',
      role: 'Project Manager'
    }
  ];

  return (
    <div className="pt-24">
      {/* ===== PAGE HEADER ===== */}
      <section className="relative overflow-hidden bg-bg-secondary text-text-primary py-20 text-center">
        <ThreeHelix
          primaryColor={0x00c853}
      secondaryColor={0x69f0ae}
          opacity={0.3}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="inline-block bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest px-4.5 py-1 rounded-full mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Who We Are</h1>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Learn more about Next Del and our mission to build innovative digital solutions.
          </p>
        </div>
      </section>

      {/* ===== ABOUT CONTENT ===== */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Turning Ideas Into Digital Reality
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Next Del is a technology startup founded with a clear mission: to help businesses leverage the power of modern digital solutions. We believe that technology should work for people, not the other way around.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Our team combines deep technical expertise with a passion for design and user experience. We don't just build websites and apps — we create digital ecosystems that drive real business growth.
            </p>
            <p className="text-text-secondary leading-relaxed">
              From ecommerce platforms to custom software, we approach every project with the same level of dedication and attention to detail. Our goal is to be a trusted partner in your digital journey.
            </p>
            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-brand-green to-brand-green-secondary text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="bg-bg-card border border-white/10 rounded-3xl p-12 text-center">
              <i className="fas fa-cubes text-5xl text-brand-green animate-float-card mb-6 block"></i>
              <h3 className="text-2xl font-bold mb-3">Agile · Modern · Secure</h3>
              <p className="text-text-secondary text-sm mb-6">
                Built with passion and precision
              </p>
              <div className="flex justify-center gap-3.5 flex-wrap">
                <span className="bg-brand-green/10 text-brand-green font-bold text-xs px-5 py-2.5 rounded-full border border-brand-green/10">
                  12+ Projects
                </span>
                <span className="bg-brand-green/10 text-brand-green font-bold text-xs px-5 py-2.5 rounded-full border border-brand-green/10">
                  100% Satisfaction
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="inline-block bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-3">
              What Drives Us
            </h2>
            <p className="text-text-secondary text-sm">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="bg-bg-card border border-white/10 rounded-3xl p-8 transition-all hover:-translate-y-1.5 duration-300 hover:shadow-md"
              >
                <i className={`fas ${val.icon} text-4xl text-brand-green mb-6 block`}></i>
                <h4 className="text-lg font-bold mb-3 text-text-primary">{val.title}</h4>
                <p className="text-text-secondary text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="inline-block bg-brand-green/10 text-brand-green font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none mb-3">
              Meet the Team
            </h2>
            <p className="text-text-secondary text-sm">
              Passionate professionals dedicated to your success.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-bg-card border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-102"
              >
                <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 flex items-center justify-center text-xl font-bold mb-5 shadow-inner select-none">
                  {member.initials}
                </div>
                <h4 className="font-bold text-base text-text-primary leading-tight mb-1">{member.name}</h4>
                <p className="text-xxs font-semibold uppercase tracking-wider text-text-light">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
