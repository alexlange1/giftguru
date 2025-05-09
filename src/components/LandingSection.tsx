
import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

interface LandingSectionProps {
  onGetStarted: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#fcf8fd] to-[#f3ecff] dark:from-[#201920] dark:to-[#1a121f]">
      <div className="absolute inset-0 bg-gift-pattern opacity-20"></div>
      <div className="max-w-5xl mx-auto px-6 md:px-8 relative">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/ba2a520d-9188-46b0-8d95-82bb88ac924e.png" 
              alt="GiftGuru Logo" 
              className="h-32 w-auto"
            />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-center mb-6">
            Find the <span className="text-primary">Perfect Gift</span> in Seconds
          </h1>
          <p className="text-lg md:text-xl text-center mb-10 max-w-2xl text-gray-700 dark:text-gray-300">
            Our AI-powered gift concierge helps you discover unique and thoughtful gifts for any person and occasion.
          </p>
          
          <div className="flex gap-4 flex-col sm:flex-row">
            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-primary to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-primary text-lg py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Gift className="mr-2 h-5 w-5" />
              Find a Gift Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#8B5CF6]/30 text-lg py-6 px-8 rounded-xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm"
            >
              Learn How It Works
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
              <div className="bg-gradient-to-r from-primary/20 to-[#8B5CF6]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Simple & Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Answer a few questions and get personalized gift ideas in seconds.
              </p>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
              <div className="bg-gradient-to-r from-primary/20 to-[#8B5CF6]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Thoughtful Gifts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Curated recommendations based on interests, relationship, and occasion.
              </p>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
              <div className="bg-gradient-to-r from-primary/20 to-[#8B5CF6]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <span className="text-2xl">💫</span>
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Unique Ideas</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover creative gift options you won't find elsewhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
