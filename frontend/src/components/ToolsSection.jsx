import React from 'react';
import { MessageSquare, Smartphone, HeartHandshake, BookOpen, PenTool, Settings } from 'lucide-react';
import { staticData } from '../data/staticData';

const ToolsSection = () => {
  const iconMap = {
    '💬': MessageSquare,
    '📱': Smartphone,
    '😰': HeartHandshake,
    '🤔': BookOpen,
    '📝': PenTool
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-mendly-dark mb-4">
            Des outils concrets pour chaque galère
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticData.tools.map((tool, index) => {
            const IconComponent = iconMap[tool.emoji] || Settings;
            return (
              <div 
                key={index}
                className="bg-mendly-card rounded-xl p-6 hover:bg-mendly-card/80 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-2xl">{tool.emoji}</div>
                  <IconComponent className="w-6 h-6 text-mendly-violet mt-1" />
                </div>
                
                <h3 className="font-bold text-mendly-dark mb-3 text-lg">
                  {tool.problem}
                </h3>
                
                <p className="text-mendly-dark/70 leading-relaxed">
                  {tool.solution}
                </p>
              </div>
            );
          })}
          
          {/* Additional tool */}
          <div className="bg-mendly-card rounded-xl p-6 hover:bg-mendly-card/80 transition-all duration-300 transform hover:scale-105 border-2 border-mendly-violet/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-2xl">🔧</div>
              <Settings className="w-6 h-6 text-mendly-violet mt-1" />
            </div>
            
            <h3 className="font-bold text-mendly-dark mb-3 text-lg">
              Et plein d'autres modules
            </h3>
            
            <p className="text-mendly-dark/70 leading-relaxed">
              Selon tes besoins du moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;