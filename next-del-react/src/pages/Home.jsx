import React from 'react';
import { Link } from 'react-router-dom';
import ThreeBackground from '../components/ThreeBackground';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center bg-dark-bg-primary text-text-primary py-24 " id="home">
        <ThreeBackground
          primaryColor={0x00c853}
      secondaryColor={0x69f0ae}
      emissiveColor={0x00a844}
          opacity={0.3}
        />
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start" data-aos="fade-right" data-aos-duration="1000">
            <span className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green-secondary font-bold text-xs uppercase tracking-widest px-4.5 py-1.5 rounded-full border border-brand-green/15 backdrop-blur-md mb-6">
              <i className="fas fa-code text-sm"></i> Digital product studio
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Build Your Digital<br />Future With <span className="bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent">Next Del</span>
            </h1>
            
            <p className="text-[#94b894] text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
              We create modern websites, ecommerce platforms, and custom software solutions that help businesses grow online.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-brand-green to-brand-green-secondary text-white font-bold py-4 px-10 rounded-full hover:scale-102 hover:shadow-lg active:scale-98 transition-all duration-300 text-sm"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="300"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white/10 hover:border-brand-green text-white font-bold py-4 px-10 rounded-full hover:bg-brand-green/5 transition-all duration-300 text-sm"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="400"
              >
                Contact Us
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-6 md:gap-12 w-full pt-8 border-t border-white/8">
              <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="500">
                <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent block">12+</span>
                <span className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-xs font-semibold uppercase tracking-wider block mt-1">Projects</span>
              </div>
              <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="600">
                <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent block">100%</span>
                <span className="text-[#94b894] text-xs font-semibold uppercase tracking-wider block mt-1">Satisfaction</span>
              </div>
              <div data-aos="fade-up" data-aos-duration="600" data-aos-delay="700">
                <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent block">24/7</span>
                <span className="text-[#94b894] text-xs font-semibold uppercase tracking-wider block mt-1">Support</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative flex justify-center items-center py-12" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="200">
            {/* Main Floating Card */}
            <div className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color shadow-2xl backdrop-blur-2xl rounded-3xl p-10 max-w-sm text-center relative z-10 animate-float-card hover:scale-102 hover:border-brand-green/30 hover:shadow-brand-green/15 duration-300">
              <i className="fas fa-rocket text-5xl bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-6 block"></i>
              <h3 className="text-2xl font-bold text-text-brand-primary dark:text-text-primary mb-3">Next Generation Solutions</h3>
              <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-sm leading-relaxed">
                Built with cutting-edge technology for maximum performance and fluid user experiences
              </p>
            </div>
            
            {/* Floating Top Badge */}
            <div className="absolute top-4 right-4 bg-white/8 border border-white/8 backdrop-blur-lg px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold text-white pointer-events-none z-20 animate-float-badge" style={{ animationDelay: '0.5s' }}>
              <i className="fas fa-check-circle text-brand-green-secondary text-sm"></i> 100% Secure
            </div>
            
            {/* Floating Bottom Badge */}
            <div className="absolute bottom-4 left-4 bg-white/8 border border-white/8 backdrop-blur-lg px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold text-white pointer-events-none z-20 animate-float-badge" style={{ animationDelay: '1s' }}>
              <i className="fas fa-bolt text-brand-green-secondary text-sm"></i> Fast Delivery
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-xxs font-bold uppercase tracking-widest text-text-brand-secondary dark:text-text-brand-darkSecondary animate-bounce-down">
          <span>Scroll</span>
          <i className="fas fa-chevron-down text-sm"></i>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="relative py-28 bg-bg-secondary dark:bg-dark-bg-secondary overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7" data-aos="fade-right" data-aos-duration="800">
            <span className="inline-block bg-brand-green/10 text-brand-green  dark:text-brand-green-light font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              Turning ideas into powerful online solutions
            </h2>
            <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-lg leading-relaxed mb-6">
              Next Del is a technology startup focused on building scalable digital products. We help businesses transform ideas into powerful online solutions — from ecommerce to custom software. Our team combines creativity with technical excellence to deliver results that drive growth.
            </p>
            <Link
              to="/about"
              className="inline-block bg-gradient-to-r from-brand-green to-brand-green-secondary text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
            >
              Learn More
            </Link>
          </div>
          
          <div className="lg:col-span-5" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
            <div className="bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] from-bg-card to-bg-card-hover border border-border-light dark:border-border-color rounded-3xl p-12 text-center ">
              <i className="fas fa-cubes text-5xl text-brand-green animate-float-card mb-6 block"></i>
              <h3 className="text-2xl font-bold mb-3">Agile · Modern · Secure</h3>
              <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-sm">
                Built with passion and precision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="relative py-28 bg-bg-primary dark:bg-dark-bg-primary overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="600">
            <span className="inline-block bg-brand-green/10 text-brand-green  dark:text-brand-green-light font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              What We Do
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4">
              Our Services
            </h2>
            <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-base">
              End-to-end digital solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div 
              className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-light-bg-card-hover dark:hover:bg-bg-card-hover group"
              data-aos="fade-up" 
              data-aos-duration="600" 
              data-aos-delay="100"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-green to-brand-green-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <i className="fas fa-store text-4xl bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-6 block"></i>
              <h3 className="text-xl font-bold mb-4">Ecommerce Development</h3>
              <ul className="text-text-brand-secondary dark:text-text-brand-darkSecondary space-y-2 text-sm">
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Online stores</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Product management</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Payment integration</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Customer accounts</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Admin dashboard</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div 
              className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-light-bg-card-hover dark:hover:bg-bg-card-hover group"
              data-aos="fade-up" 
              data-aos-duration="600" 
              data-aos-delay="200"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-green to-brand-green-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <i className="fas fa-code text-4xl bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-6 block"></i>
              <h3 className="text-xl font-bold mb-4">Custom Code Development</h3>
              <ul className="text-text-brand-secondary dark:text-text-brand-darkSecondary space-y-2 text-sm">
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Web applications</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Business software</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> APIs &amp; integration</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Database solutions</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div 
              className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-light-bg-card-hover dark:hover:bg-bg-card-hover group"
              data-aos="fade-up" 
              data-aos-duration="600" 
              data-aos-delay="300"
            >
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-green to-brand-green-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <i className="fas fa-globe text-4xl bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-6 block"></i>
              <h3 className="text-xl font-bold mb-4">Web Development</h3>
              <ul className="text-text-brand-secondary dark:text-text-brand-darkSecondary space-y-2 text-sm">
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Company websites</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Landing pages</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> Responsive design</li>
                <li><span className="text-brand-green mr-1.5 font-bold">▸</span> CMS Development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE SECTION ===== */}
      <section className="relative py-28 bg-bg-secondary dark:bg-dark-bg-secondary text-text-brand-primary dark:text-text-primary overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="600">
            <span className="inline-block bg-brand-green/10  text-brand-green dark:text-brand-green-light font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Why Next Del
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4 text-text-brand-primary dark:text-text-primary">
              Built to Perform
            </h2>
            <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-base">
              We combine innovation with reliability to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: 'fa-microchip', title: 'Modern Technology' },
              { icon: 'fa-pen-ruler', title: 'Professional Design' },
              { icon: 'fa-shield-alt', title: 'Secure Development' },
              { icon: 'fa-expand', title: 'Scalable Solutions' },
              { icon: 'fa-headset', title: 'Fast Support' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-bg-primary dark:bg-dark-bg-card border border-border-light dark:border-border-color backdrop-blur-md rounded-2xl p-6.5 text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-light-bg-card-hover dark:hover:bg-bg-card-hover hover:border-brand-green/30"
                data-aos="flip-up"
                data-aos-duration="600"
                data-aos-delay={(index + 1) * 100}
              >
                <i className={`fas ${item.icon} text-3xl text-brand-green-secondary mb-4 block`}></i>
                <h4 className="font-bold text-sm leading-tight text-text-brand-primary dark:text-text-primary">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="relative py-28 bg-bg-secondary dark:bg-dark-bg-secondary overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="600">
            <span className="inline-block bg-brand-green/10 text-brand-green  dark:text-brand-green-light font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4">
              From Idea to Launch
            </h2>
            <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-base">
              A transparent, structured approach to building your digital product.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', icon: 'fa-search', title: 'Research & Planning' },
              { num: '02', icon: 'fa-paint-brush', title: 'UI/UX Design' },
              { num: '03', icon: 'fa-laptop-code', title: 'Development' },
              { num: '04', icon: 'fa-rocket', title: 'Launch & Support' }
            ].map((step, index) => (
              <div 
                key={index}
                className="bg-bg-primary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 relative flex flex-col items-start "
                data-aos={index === 0 ? 'fade-right' : index === 3 ? 'fade-left' : 'fade-up'}
                data-aos-duration="600"
                data-aos-delay={(index + 1) * 100}
              >
                <span className="text-4xl font-black bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-4">{step.num}</span>
                <i className={`fas ${step.icon} text-2xl text-text-brand-secondary dark:text-brand-green-light mb-4 block`}></i>
                <h4 className="text-lg font-bold text-text-brand-primary dark:text-text-primary leading-tight">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section className="relative py-28 bg-bg-primary dark:bg-dark-bg-primary overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="600">
            <span className="inline-block bg-brand-green/10 text-brand-green  dark:text-brand-green-light font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Technology
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4">
              Modern Stack
            </h2>
            <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-base">
              We use the latest tools and frameworks to build high-performance solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <div 
              className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 "
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="100"
            >
              <h4 className="text-xl font-bold mb-6 text-text-brand-primary dark:text-text-primary">Frontend</h4>
              <div className="flex flex-wrap gap-2.5">
                {['React.js', 'Next.js', 'JavaScript', 'HTML/CSS'].map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="bg-bg-primary dark:bg-dark-bg-primary text-text-brand-secondary dark:text-text-brand-darkSecondary font-semibold text-xs py-2 px-4.5 rounded-full border border-border-light dark:border-border-color cursor-default"
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-delay={(idx + 1) * 50 + 100}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div 
              className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 "
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="200"
            >
              <h4 className="text-xl font-bold mb-6 text-text-brand-primary dark:text-text-primary">Backend</h4>
              <div className="flex flex-wrap gap-2.5">
                {['Node.js', 'Express.js', 'MongoDB'].map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="bg-bg-primary dark:bg-dark-bg-primary text-text-brand-secondary dark:text-text-brand-darkSecondary font-semibold text-xs py-2 px-4.5 rounded-full border border-border-light dark:border-border-color cursor-default"
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-delay={(idx + 1) * 50 + 200}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CMS */}
            <div 
  className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 "
  data-aos="fade-left"
  data-aos-duration="600"
  data-aos-delay="300"
>
  <h4 className="text-xl font-bold mb-6 text-text-brand-primary dark:text-text-primary">
    CMS
  </h4>

  <div className="flex flex-wrap gap-2.5">
    {[
      'WordPress',
      'Shopify',
      'Strapi',
      'Sanity CMS',
      'Payload CMS'
    ].map((tag, idx) => (
      <span 
        key={idx} 
        className="bg-bg-primary dark:bg-dark-bg-primary text-text-brand-secondary dark:text-text-brand-darkSecondary font-semibold text-xs py-2 px-4.5 rounded-full border border-border-light dark:border-border-color cursor-default"
        data-aos="zoom-in"
        data-aos-duration="400"
        data-aos-delay={350 + idx * 100}
      >
        {tag}
      </span>
    ))}
  </div>
</div>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO PREVIEW ===== */}
      <section className="relative py-28 bg-bg-secondary dark:bg-dark-bg-secondary overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="600">
            <span className="inline-block bg-brand-green/10 text-brand-green  dark:text-brand-green-light font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4">
              Recent Work
            </h2>
            <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-base">
              Check out some of our latest projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: 'fa-shopping-cart', title: 'Ecommerce Platform', desc: 'Full-featured online store with payment integration', tech: 'Stripe, PayPal, inventory & order tracking' },
              { icon: 'fa-school', title: 'School Management System', desc: 'Complete administration and student management', tech: 'Attendance, grading, parent portal & reports' },
              { icon: 'fa-chart-pie', title: 'Business CRM Dashboard', desc: 'Analytics and customer relationship management', tech: 'Lead scoring, pipeline, real-time metrics' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-bg-primary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 text-center flex flex-col items-center justify-center transition-all duration-300 hover:scale-102 hover:border-brand-green/30"
                data-aos="flip-left"
                data-aos-duration="700"
                data-aos-delay={(idx + 1) * 100}
              >
                <i className={`fas ${item.icon} text-4xl bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent mb-6 block`}></i>
                <h4 className="text-xl font-bold mb-3 text-text-brand-primary dark:text-text-primary">{item.title}</h4>
                <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-sm mb-4 leading-relaxed">{item.desc}</p>
                <p className="text-xs text-text-brand-light dark:text-text-brand-darkLight italic">{item.tech}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/portfolio"
              className="inline-block bg-gradient-to-r from-brand-green to-brand-green-secondary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
              data-aos="fade-up"
              data-aos-duration="600"
            >
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT PREVIEW ===== */}
      <section className="relative py-28 bg-bg-primary dark:bg-dark-bg-primary overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="600">
            <span className="inline-block bg-white/10 text-brand-green dark:text-brand-green-light font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full mb-4">
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-base">
              Have a project in mind? Let's talk and turn your vision into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" data-aos-duration="800">
              <p className="text-text-brand-secondary dark:text-text-brand-darkSecondary text-lg leading-relaxed mb-8">
                Reach out and let's start your digital journey.
              </p>
              <div className="flex items-center gap-4 bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-2xl p-6.5 max-w-md shadow-sm ">
                <i className="fas fa-envelope text-3xl text-brand-green"></i>
                <div>
                  <h5 className="text-xxs font-bold text-text-brand-light dark:text-text-brand-darkLight uppercase tracking-widest m-0">Send an Email</h5>
                  <span className="text-base font-bold text-text-brand-primary dark:text-text-primary block mt-1">nextdelofficial@gmail.com</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <a 
                  href="https://www.linkedin.com/in/nextdel-tech-7bb46b418/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-12 h-12 rounded-full border border-border-light dark:border-border-color text-text-brand-secondary dark:text-text-brand-darkSecondary hover:bg-brand-green hover:text-white dark:hover:bg-brand-green dark:hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
                  data-aos="zoom-in"
                  data-aos-duration="400"
                  data-aos-delay="150"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a 
                  href="https://www.instagram.com/nextdelofficial/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-12 h-12 rounded-full border border-border-light dark:border-border-color text-text-brand-secondary dark:text-text-brand-darkSecondary hover:bg-brand-green hover:text-white dark:hover:bg-brand-green dark:hover:text-white flex items-center justify-center text-lg transition-all duration-300 hover:-translate-y-1"
                  data-aos="zoom-in"
                  data-aos-duration="400"
                  data-aos-delay="200"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            <div className="bg-bg-secondary dark:bg-dark-bg-card border border-border-light dark:border-border-color rounded-3xl p-8 shadow-md" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
