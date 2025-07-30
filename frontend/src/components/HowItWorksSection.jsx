import React from 'react';
import { MessageCircle, UserCheck, Shield, ArrowRight } from 'lucide-react';
import { mockData } from '../mock';

const HowItWorksSection = () => {
  const icons = [MessageCircle, UserCheck, Shield];

  return (
    <section className="py-20 bg-mendly-light">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mendly-dark mb-4">
            Comment ça marche
          </h2>
        </div>

        <div className="space-y-8">
          {mockData.steps.map((step, index) => {
            const IconComponent = icons[index];
            return (
              <div 
                key={index}
                className="flex items-center gap-8 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-mendly-violet rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-mendly-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-mendly-dark/70 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < mockData.steps.length - 1 && (
                  <div className="hidden md:flex flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-mendly-violet/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;