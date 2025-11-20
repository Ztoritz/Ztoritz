import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gauge, Phone } from 'lucide-react';
import { PageRoute } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Hem', path: PageRoute.HOME },
    { name: 'Produkter', path: PageRoute.PRODUCTS },
    { name: 'Tjänster', path: PageRoute.SERVICES },
    { name: 'Om Oss', path: PageRoute.ABOUT },
    { name: 'Kontakt', path: PageRoute.CONTACT },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to={PageRoute.HOME} className="flex items-center gap-2">
                <div className="bg-secondary p-2 rounded-lg">
                    <Gauge className="h-8 w-8 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-2xl text-primary tracking-tight">HYDMOS</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Industry Systems</span>
                </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-secondary border-b-2 border-secondary'
                    : 'text-gray-600 hover:text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
                href="tel:+46812345678"
                className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-secondary transition-colors flex items-center gap-2"
            >
                <Phone size={16} />
                08-123 45 67
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-4 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-secondary'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
             <a 
                href="tel:+46812345678"
                className="block w-full text-center bg-primary text-white px-5 py-3 mt-4 rounded-lg font-bold"
            >
                Ring Oss
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;