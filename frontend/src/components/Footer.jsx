import React from 'react';
import { Heart, Mail, Instagram, FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-mendly-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          {/* Brand */}
          <div className="inline-flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-mendly-pink" />
            <span className="text-xl font-bold">Mendly</span>
          </div>
          
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Fait avec soin pour t'aider à aller de l'avant.
          </p>

          {/* Links */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <a 
              href="mailto:contact@mendly.app" 
              className="flex items-center gap-2 text-white/70 hover:text-mendly-pink transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>
            
            <a 
              href="https://instagram.com/mendly.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-mendly-pink transition-colors duration-300"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            
            <a 
              href="/mentions-legales" 
              className="flex items-center gap-2 text-white/70 hover:text-mendly-pink transition-colors duration-300"
            >
              <FileText className="w-4 h-4" />
              <span>Mentions légales</span>
            </a>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2025 Mendly. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;