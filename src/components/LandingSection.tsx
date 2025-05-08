
import React, { useEffect, useState } from 'react';
import { Gift, CakeSlice, PartyPopper } from 'lucide-react';

interface LandingSectionProps {
  onGetStarted: () => void;
}

interface FloatingEmoji {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  emoji: string;
  rotation: number;
  rotationSpeed: number;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  
  useEffect(() => {
    // Create floating emojis
    const emojis: FloatingEmoji[] = [];
    const emojiOptions = ['🎁', '🎀', '🎂', '🎊', '🎉', '💝', '🛍️', '✨'];
    
    for (let i = 0; i < 12; i++) {
      emojis.push({
        id: i,
        x: Math.random() * 100, // random position (0-100%)
        y: Math.random() * 100,
        size: Math.random() * 20 + 20, // random size (20-40px)
        speed: Math.random() * 0.2 + 0.1, // random speed
        emoji: emojiOptions[Math.floor(Math.random() * emojiOptions.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5
      });
    }
    
    setFloatingEmojis(emojis);
    
    // Animation loop for floating emojis
    let animationFrameId: number;
    let lastTime = Date.now();
    
    const animateEmojis = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      setFloatingEmojis(prevEmojis => 
        prevEmojis.map(emoji => {
          // Move emoji vertically (floating effect)
          let newY = emoji.y - emoji.speed * deltaTime / 50;
          // Loop back to bottom when reaching top
          if (newY < -5) newY = 105;
          
          // Add slight horizontal drift
          let newX = emoji.x + Math.sin(currentTime / 2000 + emoji.id) * 0.05;
          if (newX > 105) newX = -5;
          if (newX < -5) newX = 105;
          
          // Update rotation
          let newRotation = emoji.rotation + emoji.rotationSpeed * deltaTime / 50;
          if (newRotation > 360) newRotation -= 360;
          
          return {
            ...emoji,
            x: newX,
            y: newY,
            rotation: newRotation
          };
        })
      );
      
      animationFrameId = requestAnimationFrame(animateEmojis);
    };
    
    animateEmojis();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#fcf5f9] to-[#f5eef7] dark:from-[#201920] dark:to-[#1a171f]">
      <div className="absolute inset-0 bg-gift-pattern opacity-10"></div>
      
      {/* Floating emojis */}
      {floatingEmojis.map((emoji) => (
        <div 
          key={emoji.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            fontSize: `${emoji.size}px`,
            transform: `rotate(${emoji.rotation}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="flex items-center justify-center rounded-full bg-white/30 backdrop-blur-sm p-2 shadow-lg border border-white/40">
            <span>{emoji.emoji}</span>
          </div>
        </div>
      ))}
      
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
          className="px-8 py-4 bg-gradient-to-r from-primary to-[#8B5CF6] text-white font-medium rounded-full hover:shadow-lg hover:bg-primary-dark transition-all duration-300"
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
