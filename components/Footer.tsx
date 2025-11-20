import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">HYDMOS</h3>
            <p className="text-gray-400 mb-4 max-w-sm leading-relaxed">
              Vi är din partner inom avancerad hydraulik och gasteknik. 
              Med årtionden av erfarenhet levererar vi säkra och effektiva lösningar för industrin.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Snabblänkar</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Produkter</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Service & Underhåll</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Om Företaget</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Kontakta Oss</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Kontaktinfo</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 w-5 h-5 text-secondary" />
                <span>Industrivägen 12,<br />123 45 Stockholm</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 w-5 h-5 text-secondary" />
                <a href="tel:+46812345678" className="hover:text-white">08-123 45 67</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 w-5 h-5 text-secondary" />
                <a href="mailto:info@hydmos.se" className="hover:text-white">info@hydmos.se</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Hydmos AB. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;