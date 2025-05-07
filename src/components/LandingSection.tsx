
import React from 'react';
import { Gift } from 'lucide-react';

interface LandingSectionProps {
  onGetStarted: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#fcf5f9] to-[#f5eef7] dark:from-[#201920] dark:to-[#1a171f]">
      <div className="absolute inset-0 bg-gift-pattern opacity-10"></div>
      
      <div className="max-w-3xl mx-auto text-center z-10 animate-fade-in">
        <div className="inline-flex items-center justify-center p-2 mb-6 bg-accent/30 backdrop-blur-sm rounded-full">
          <Gift className="w-6 h-6 mr-2 text-primary" />
          <span className="text-sm font-medium">AI Gift Concierge</span>
        </div>
        
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          <span className="block">Gifts that surprise.</span>
          <span className="block text-primary">Magic that delights.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Tell us about your special someone, and our AI will craft personalized gift ideas
          that capture the perfect sentiment for any occasion.
        </p>
        
        <button 
          onClick={onGetStarted}
          className="px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Get Started
          <span className="ml-2 inline-block transform group-hover:translate-x-1 transition-transform">→</span>
        </button>

        <div className="mt-16 flex justify-center">
          <div className="w-1.5 h-8 bg-primary/30 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
