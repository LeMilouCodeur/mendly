import React from 'react';
import { Users, Target, Brain } from 'lucide-react';
import { staticData } from '../data/staticData';

const FeaturesSection = () => {
  const iconMap = {
    '🤗': Users,
    '🧭': Target,
    '🧠': Brain
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mendly-dark mb-4">
            Ce qui rend Mendly unique
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {staticData.features.map((feature, index) => {
            const IconComponent = iconMap[feature.emoji];
            return (
              <div 
                key={index}
                className="bg-mendly-card rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="text-4xl mr-3">{feature.emoji}</div>
                  <IconComponent className="w-8 h-8 text-mendly-violet" />
                </div>
                
                <h3 className="text-xl font-bold text-mendly-dark mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-mendly-dark/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;