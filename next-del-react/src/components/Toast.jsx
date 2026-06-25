import React, { useEffect } from 'react';

export default function Toast({ message, type = 'success', show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl transition-all duration-300 animate-bounce ${
        type === 'error'
          ? 'bg-red-500 text-white'
          : 'bg-bg-card/95 text-white'
      }`}
    >
      <i
        className={`fas ${
          type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle text-brand-green'
        }`}
      ></i>
      <span className="text-xs font-semibold tracking-wide">{message}</span>
    </div>
  );
}
