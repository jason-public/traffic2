import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
      title="맨 위로 이동"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-3 sm:p-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-blue-500/30 print:hidden group"
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span className="sr-only">맨 위로 이동</span>
    </button>
  );
};
