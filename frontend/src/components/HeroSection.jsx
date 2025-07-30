import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import EmailCapture from './EmailCapture';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-mendly-light via-white to-mendly-card flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md mb-6">
            <Heart className="w-8 h-8 text-mendly-violet" />
            <span className="text-2xl font-bold text-mendly-dark">Mendly</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-mendly-dark mb-6 leading-tight">
          💜 Ta rupture fait mal ?
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-mendly-dark/80 mb-4 max-w-3xl mx-auto leading-relaxed">
          Mendly t'aide à retrouver confiance et sérénité, jour après jour.
        </p>

        <p className="text-lg md:text-xl text-mendly-violet font-semibold mb-2">
          Plus qu'une app : ton compagnon intelligent.
        </p>

        <p className="text-base md:text-lg text-mendly-dark/70 mb-12 max-w-2xl mx-auto">
          À la fois l'écoute d'un bon ami, les conseils d'un coach et les outils d'un thérapeute.
        </p>

        {/* Email Capture */}
        <div className="max-w-md mx-auto">
          <EmailCapture />
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center items-center gap-4 opacity-60">
          <Sparkles className="w-4 h-4 text-mendly-violet animate-pulse" />
          <div className="w-16 h-px bg-mendly-violet/30"></div>
          <Sparkles className="w-4 h-4 text-mendly-pink animate-pulse delay-300" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;