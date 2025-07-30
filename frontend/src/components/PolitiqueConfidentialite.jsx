import React from 'react';
import { Heart, Mail, Shield, Lock, Eye, Clock, Cookie, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const PolitiqueConfidentialite = () => {
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
            🔐 Politique de confidentialité
          </h1>

          <div className="space-y-8">
            {/* Données collectées */}
            <section>
              <h2 className="text-2xl font-bold text-mendly-dark mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-mendly-violet/20 rounded-full flex items-center justify-center">
                  <Eye className="w-4 h-4 text-mendly-violet" />
                </div>
                Données collectées
              </h2>
              <div className="bg-mendly-card rounded-lg p-6">
                <p className="text-mendly-dark/80 leading-relaxed">
                  Lorsque vous remplissez le formulaire pour recevoir des informations sur le lancement, nous collectons uniquement votre adresse email avec votre consentement.
                </p>
              </div>
            </section>

            {/* Utilisation des données */}
            <section>
              <h2 className="text-2xl font-bold text-mendly-dark mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-mendly-pink/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-mendly-pink" />
                </div>
                Utilisation des données
              </h2>
              <div className="bg-mendly-card rounded-lg p-6 space-y-4">
                <p className="text-mendly-dark/80 leading-relaxed">
                  Votre email est utilisé exclusivement pour vous informer de l'évolution du projet, du lancement de l'application, ou d'éventuelles mises à jour.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-mendly-violet">
                  <p className="text-mendly-dark font-semibold">
                    ✅ Nous ne vendons ni ne partageons vos données avec des tiers.
                  </p>
                </div>
              </div>
            </section>

            {/* Durée de conservation */}
            <section>
              <h2 className="text-2xl font-bold text-mendly-dark mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-mendly-violet/20 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-mendly-violet" />
                </div>
                Durée de conservation
              </h2>
              <div className="bg-mendly-card rounded-lg p-6">
                <p className="text-mendly-dark/80 leading-relaxed">
                  Vos données sont conservées uniquement pendant la durée du développement du projet, et supprimées sur simple demande.
                </p>
              </div>
            </section>

            {/* Exercice de vos droits */}
            <section>
              <h2 className="text-2xl font-bold text-mendly-dark mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-mendly-pink/20 rounded-full flex items-center justify-center">
                  <Lock className="w-4 h-4 text-mendly-pink" />
                </div>
                Exercice de vos droits
              </h2>
              <div className="bg-mendly-card rounded-lg p-6 space-y-4">
                <p className="text-mendly-dark/80 leading-relaxed">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
                </p>
                <p className="text-mendly-dark/80 leading-relaxed">
                  Vous pouvez exercer ce droit en écrivant à :
                </p>
                <div className="flex items-center gap-2 text-mendly-violet font-semibold">
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

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-mendly-dark mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-mendly-violet/20 rounded-full flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-mendly-violet" />
                </div>
                🍪 Cookies
              </h2>
              <div className="bg-mendly-card rounded-lg p-6">
                <p className="text-mendly-dark/80 leading-relaxed mb-3">
                  Ce site peut utiliser des cookies pour des mesures d'audience anonymes.
                </p>
                <p className="text-mendly-dark/80 leading-relaxed">
                  Vous pouvez les refuser ou les désactiver via les paramètres de votre navigateur.
                </p>
              </div>
            </section>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-mendly-violet/10 to-mendly-pink/10 rounded-xl p-8">
            <h3 className="text-xl font-bold text-mendly-dark mb-4">
              Des questions sur vos données ?
            </h3>
            <p className="text-mendly-dark/70 mb-6">
              Nous sommes là pour vous expliquer et vous aider à exercer vos droits.
            </p>
            <a 
              href="mailto:hello.mendly@gmail.com"
              className="inline-flex items-center gap-2 bg-mendly-violet hover:bg-mendly-violet/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Nous contacter
            </a>
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

export default PolitiqueConfidentialite;