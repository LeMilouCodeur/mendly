import React from 'react';
import { Heart, Mail, Globe, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const MentionsLegales = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mendly-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-3">
              <Heart className="w-6 h-6 text-mendly-violet" />
              <span className="text-xl font-bold text-mendly-dark">Mendly</span>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-mendly-dark hover:text-mendly-violet transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-mendly-dark mb-8 text-center">
            📜 Mentions légales
          </h1>

          <div className="space-y-8">
            {/* Éditeur du site */}
            <section>
              <h2 className="text-2xl font-bold text-mendly-dark mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-mendly-violet rounded-full"></div>
                Éditeur du site
              </h2>
              <div className="bg-mendly-card rounded-lg p-6">
                <p className="text-mendly-dark/80 leading-relaxed mb-4">
                  Ce site est édité à titre personnel, dans le cadre d'un projet indépendant en cours de développement.
                </p>
                <p className="text-mendly-dark/80 leading-relaxed">
                  Pour toute demande, vous pouvez contacter l'éditeur à l'adresse suivante :
                </p>
                <div className="mt-3 flex items-center gap-2 text-mendly-violet font-semibold">
                  <Mail className="w-4 h-4" />
                  <a 
                    href="mailto:hello.mendly@gmail.com" 
                    className="hover:underline transition-all duration-300"
                  >
                    hello.mendly@gmail.com
                  </a>
                </div>
              </div>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-2xl font-bold text-mendly-dark mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-mendly-pink rounded-full"></div>
                Hébergement
              </h2>
              <div className="bg-mendly-card rounded-lg p-6">
                <p className="text-mendly-dark/80 leading-relaxed mb-4">
                  Ce site est hébergé par :
                </p>
                <div className="space-y-2 text-mendly-dark">
                  <p className="font-semibold">Vercel Inc.</p>
                  <p>340 S Lemon Ave #4133</p>
                  <p>Walnut, CA 91789 – USA</p>
                  <div className="mt-3 flex items-center gap-2 text-mendly-violet">
                    <Globe className="w-4 h-4" />
                    <a 
                      href="https://vercel.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline transition-all duration-300"
                    >
                      https://vercel.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-mendly-dark text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-mendly-pink" />
            <span className="font-bold">Mendly</span>
          </div>
          <p className="text-white/60 text-sm">
            © 2025 Mendly. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MentionsLegales;