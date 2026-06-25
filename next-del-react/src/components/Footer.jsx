import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-bg-section border-t border-white/5 py-12 text-center text-text-light relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className="text-lg md:text-xl font-bold mb-4 text-text-primary"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          Next Del — <span className="bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent">Turning Ideas Into Digital Reality</span>
        </div>
        
        <div 
          className="flex flex-wrap justify-center gap-6 md:gap-10 my-6 text-sm"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="100"
        >
          <Link to="/" className="text-text-light hover:text-text-primary transition-colors duration-200">Home</Link>
          <Link to="/about" className="text-text-light hover:text-text-primary transition-colors duration-200">About</Link>
          <Link to="/services" className="text-text-light hover:text-text-primary transition-colors duration-200">Services</Link>
          <Link to="/portfolio" className="text-text-light hover:text-text-primary transition-colors duration-200">Portfolio</Link>
          <Link to="/contact" className="text-text-light hover:text-text-primary transition-colors duration-200">Contact</Link>
        </div>
        
        <div 
          className="text-xs text-text-secondary mt-8"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
        >
          &copy; {new Date().getFullYear()} Next Del. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
