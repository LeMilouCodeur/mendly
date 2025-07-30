import React from 'react';
import { Target, Bot, AlertCircle } from 'lucide-react';
import { staticData } from '../data/staticData';

const BenefitsSection = () => {
  const iconMap = {
    '🎯': Target,
    '🤖': Bot,
    '🚨': AlertCircle
  };

  return (
    <section className="py-20 bg-mendly-light">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mendly-dark mb-4">
            Ce qui t'attend avec Mendly
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {staticData.benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.emoji];
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="text-4xl mr-3">{benefit.emoji}</div>
                  <IconComponent className="w-8 h-8 text-mendly-violet" />
                </div>
                
                <h3 className="text-xl font-bold text-mendly-dark mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-mendly-dark/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to Action Text */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold text-mendly-dark mb-4">
            Envie de te sentir mieux ?
          </h3>
          <p className="text-lg text-mendly-dark/80 mb-2 max-w-2xl mx-auto">
            Mendly t'accompagne pas à pas, avec douceur et pragmatisme.
          </p>
          <p className="text-base text-mendly-dark/70 max-w-xl mx-auto">
            Pas de promesse magique, mais des outils qui fonctionnent vraiment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;