import React from 'react';
import { Rocket, Mail } from 'lucide-react';
import EmailCapture from './EmailCapture';

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-mendly-violet/10 via-mendly-pink/5 to-mendly-card">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-mendly-dark mb-6">
            📨 Reçois ton accès dès la sortie
          </h2>
        </div>

        {/* Email Capture */}
        <div className="max-w-md mx-auto mb-8">
          <EmailCapture 
            variant="secondary" 
            ctaText="Tester Mendly dès le lancement 🚀"
          />
        </div>

        {/* Disclaimer */}
        <div className="flex items-center justify-center gap-2 text-sm text-mendly-dark/60">
          <Mail className="w-4 h-4" />
          <p>Tu peux te désinscrire à tout moment, bien sûr.</p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;