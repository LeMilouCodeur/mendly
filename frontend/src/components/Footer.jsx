import React from 'react';
import { Heart, Mail, Instagram, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <div className="flex items-center justify-center gap-8 flex-wrap mb-6">
            <a 
              href="mailto:hello.mendly@gmail.com" 
              className="flex items-center gap-2 text-white/70 hover:text-mendly-pink transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span>Contact : hello.mendly@gmail.com</span>
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
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link 
              to="/mentions-legales" 
              className="flex items-center gap-2 text-white/70 hover:text-mendly-violet transition-colors duration-300 text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Mentions légales</span>
            </Link>
            
            <Link 
              to="/politique-confidentialite" 
              className="flex items-center gap-2 text-white/70 hover:text-mendly-violet transition-colors duration-300 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Politique de confidentialité</span>
            </Link>
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