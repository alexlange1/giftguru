
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
  area: 'top' | 'left' | 'right' | 'bottom'; // To control positioning
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  
  useEffect(() => {
    // Create floating emojis
    const emojis: FloatingEmoji[] = [];
    // More diverse emoji options with better variety
    const emojiOptions = [
      '🎁', '🎀', '🎂', '🎊', '🎉', '💝', '🛍️', '✨', 
      '🎄', '🧸', '🎈', '💍', '👑', '🏆', '🎵'
    ];
    
    // Define different areas for emojis to avoid text
    const areas: Array<'top' | 'left' | 'right' | 'bottom'> = ['top', 'left', 'right', 'bottom'];
    
    // Reduce number of emojis and track used ones to avoid duplicates
    const usedEmojis = new Set();
    
    for (let i = 0; i < 10; i++) { // Reduced from 15 to 10
      // Assign different areas for better distribution
      const area = areas[i % areas.length];
      
      // Get unique emoji
      let emoji;
      do {
        emoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
      } while (usedEmojis.has(emoji) && usedEmojis.size < emojiOptions.length);
      
      usedEmojis.add(emoji);
      
      // Configure initial position based on area to avoid text in center
      let xPosition: number;
      let yPosition: number;
      
      switch(area) {
        case 'top':
          xPosition = 15 + Math.random() * 70; // More centered horizontally at top
          yPosition = Math.random() * 20; // Top 20%
          break;
        case 'left':
          xPosition = Math.random() * 20; // Left 20%
          yPosition = 20 + Math.random() * 60; // Middle 60% vertically
          break;
        case 'right':
          xPosition = 80 + Math.random() * 20; // Right 20%
          yPosition = 20 + Math.random() * 60; // Middle 60% vertically
          break;
        case 'bottom':
          xPosition = 15 + Math.random() * 70; // More centered horizontally at bottom
          yPosition = 80 + Math.random() * 20; // Bottom 20%
          break;
      }
      
      // Ensure emojis don't rotate too much - keep them upright-ish
      const limitedRotation = (Math.random() * 30) - 15; // -15 to +15 degrees
      
      emojis.push({
        id: i,
        x: xPosition,
        y: yPosition,
        size: Math.random() * 15 + 20, // random size (20-35px)
        speed: Math.random() * 0.15 + 0.05, // Slightly slower for better visibility
        emoji: emoji,
        rotation: limitedRotation,
        rotationSpeed: (Math.random() - 0.5) * 0.2, // Reduced rotation speed
        area: area
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
          // Calculate movement based on emoji's area
          let newX = emoji.x;
          let newY = emoji.y;
          
          // Improved movement patterns that don't all converge toward the middle
          switch(emoji.area) {
            case 'top':
              // Top emojis move in small circular patterns
              newX = emoji.x + (Math.sin(currentTime / 3000 + emoji.id) * 0.05);
              newY = emoji.y + (Math.cos(currentTime / 2500 + emoji.id) * 0.03 + emoji.speed * deltaTime / 100);
              if (newY > 20) {
                // When reaching the bottom of their area, reset to top with new X position
                newY = 0;
                newX = 15 + Math.random() * 70;
              }
              break;
            case 'left':
              // Left emojis float horizontally with some up/down movement
              newX = emoji.x + (emoji.speed * deltaTime / 100);
              newY = emoji.y + (Math.sin(currentTime / 2500 + emoji.id) * 0.04);
              if (newX > 20) {
                // When reaching the right of their area, reset to left with new Y position
                newX = 0;
                newY = 20 + Math.random() * 60;
              }
              break;
            case 'right':
              // Right emojis float left with some up/down movement
              newX = emoji.x - (emoji.speed * deltaTime / 100);
              newY = emoji.y + (Math.sin(currentTime / 2500 + emoji.id) * 0.04);
              if (newX < 80) {
                // When reaching the left of their area, reset to right with new Y position
                newX = 100;
                newY = 20 + Math.random() * 60;
              }
              break;
            case 'bottom':
              // Bottom emojis move in gentle wave patterns
              newX = emoji.x + (Math.sin(currentTime / 3000 + emoji.id) * 0.05);
              newY = emoji.y - (emoji.speed * deltaTime / 100);
              if (newY < 80) {
                // When reaching the top of their area, reset to bottom with new X position
                newY = 100;
                newX = 15 + Math.random() * 70;
              }
              break;
          }
          
          // Keep emojis within bounds
          if (newX > 100) newX = 100;
          if (newX < 0) newX = 0;
          
          // Limit rotation to keep emojis upright (-20 to +20 degrees)
          let newRotation = emoji.rotation + (emoji.rotationSpeed * deltaTime / 100);
          if (newRotation > 20) newRotation = 20;
          if (newRotation < -20) newRotation = -20;
          
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
            transition: 'transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out'
          }}
        >
          <div className={`flex items-center justify-center rounded-full 
            ${emoji.area === 'top' ? 'bg-[#FDE1D3]/30' : 
              emoji.area === 'left' ? 'bg-[#D3E4FD]/30' : 
              emoji.area === 'right' ? 'bg-[#E5DEFF]/30' : 
              'bg-[#FFDEE2]/30'} 
            backdrop-blur-sm p-2 shadow-lg border border-white/40 hover:scale-110 transition-transform duration-300`}
        >
            <span>{emoji.emoji}</span>
          </div>
        </div>
      ))}
      
      <div className="max-w-3xl mx-auto text-center z-10 animate-fade-in">
        <div className="inline-flex items-center justify-center p-2 px-4 mb-6 bg-accent/30 backdrop-blur-sm rounded-full border border-white/40 shadow-md hover:shadow-lg transition-all">
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
