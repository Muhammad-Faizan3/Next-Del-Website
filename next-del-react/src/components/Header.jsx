import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] py-4 transition-all duration-300 backdrop-blur-md border-b ${
        scrolled
          ? 'bg-bg-secondary/95 shadow-md border-bg-card'
          : 'bg-bg-primary/70 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Logo Container */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* Logo Image */}
          <img 
            src={Logo} 
            alt="Next Del Logo" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Logo Text */}
          <span className="text-2xl font-black tracking-tight text-text-primary transition-opacity duration-300 group-hover:opacity-90">
            Next{' '}
            <span className="bg-gradient-to-r from-brand-green to-brand-green-secondary bg-clip-text text-transparent">
              Del
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 font-medium">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm tracking-wide relative pb-1 transition-colors duration-200 hover:text-brand-green ${
                  isActive
                    ? 'text-brand-green font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-green'
                    : 'text-text-secondary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="bg-brand-green text-white hover:bg-brand-green-dark px-6 py-2 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Let's talk
          </Link>
        </div>

        {/* Mobile menu layout */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] cursor-pointer p-1 z-50"
            aria-label="Toggle menu"
          >
            <span className={`w-7 h-[3px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`w-7 h-[3px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-7 h-[3px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-bg-secondary flex flex-col justify-center items-center gap-8 font-semibold text-lg transition-transform duration-300 md:hidden z-40 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map((link, index) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className="text-text-primary hover:text-brand-green text-2xl transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className="bg-brand-green text-white px-8 py-3 rounded-full hover:bg-brand-green-dark transition-all hover:scale-105"
        >
          Let's talk
        </Link>
      </div>
    </header>
  );
}