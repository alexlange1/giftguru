import React, { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';

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
  area: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // More specific areas
  color: string;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  
  useEffect(() => {
    // Create floating emojis with improved positioning
    const emojis: FloatingEmoji[] = [];
    
    // More diverse emoji options with better variety
    const emojiOptions = [
      '🎁', '🎀', '🎂', '🎊', '🎉', '💝', '🛍️', '✨', 
      '🎄', '🧸', '🎈', '💍', '👑', '🏆', '🎵', '🧁',
      '🍰', '🎪', '🎨', '🎭', '🎟️', '🎠'
    ];
    
    // Bubble colors
    const bubbleColors = [
      'bg-[#FDE1D3]/30',
      'bg-[#D3E4FD]/30',
      'bg-[#E5DEFF]/30',
      'bg-[#FFDEE2]/30',
      'bg-[#D3FDE1]/30',
      'bg-[#F5F5DC]/30'
    ];
    
    // Define different corner areas for emojis to avoid center
    const areas: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = [
      'top-left', 'top-right', 'bottom-left', 'bottom-right'
    ];
    
    // Reduce number of emojis and ensure uniqueness
    const usedEmojis = new Set();
    
    for (let i = 0; i < 8; i++) { // Reduced from 10 to 8
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
        case 'top-left':
          xPosition = Math.random() * 25; // Left 25%
          yPosition = Math.random() * 25; // Top 25%
          break;
        case 'top-right':
          xPosition = 75 + Math.random() * 25; // Right 25%
          yPosition = Math.random() * 25; // Top 25%
          break;
        case 'bottom-left':
          xPosition = Math.random() * 25; // Left 25%
          yPosition = 75 + Math.random() * 25; // Bottom 25%
          break;
        case 'bottom-right':
        default:
          xPosition = 75 + Math.random() * 25; // Right 25%
          yPosition = 75 + Math.random() * 25; // Bottom 25%
          break;
      }
      
      // Ensure emojis don't rotate too much - keep them upright-ish
      const limitedRotation = (Math.random() * 10) - 5; // -5 to +5 degrees only
      
      // Select a random bubble color
      const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
      
      emojis.push({
        id: i,
        x: xPosition,
        y: yPosition,
        size: Math.random() * 10 + 25, // random size (25-35px)
        speed: Math.random() * 0.15 + 0.05, // Slightly slower for better visibility
        emoji: emoji,
        rotation: limitedRotation,
        rotationSpeed: (Math.random() - 0.5) * 0.1, // Reduced rotation speed
        area: area,
        color: color
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
          
          // Movement patterns that stay in their respective corners
          switch(emoji.area) {
            case 'top-left':
              // Top-left emojis move in a small circular pattern in their corner
              newX = emoji.x + Math.sin(currentTime / 3000 + emoji.id) * 0.5;
              newY = emoji.y + Math.cos(currentTime / 2500 + emoji.id) * 0.5;
              
              // Keep in top-left region
              if (newX > 25) newX = 5;
              if (newX < 0) newX = 20;
              if (newY > 25) newY = 5;
              if (newY < 0) newY = 20;
              break;
              
            case 'top-right':
              // Top-right emojis float in their corner
              newX = emoji.x + Math.sin(currentTime / 3200 + emoji.id) * 0.5;
              newY = emoji.y + Math.cos(currentTime / 2800 + emoji.id) * 0.5;
              
              // Keep in top-right region
              if (newX > 100) newX = 80;
              if (newX < 75) newX = 95;
              if (newY > 25) newY = 5;
              if (newY < 0) newY = 20;
              break;
              
            case 'bottom-left':
              // Bottom-left emojis float in their corner
              newX = emoji.x + Math.sin(currentTime / 2700 + emoji.id) * 0.5;
              newY = emoji.y + Math.cos(currentTime / 3100 + emoji.id) * 0.5;
              
              // Keep in bottom-left region
              if (newX > 25) newX = 5;
              if (newX < 0) newX = 20;
              if (newY > 100) newY = 80;
              if (newY < 75) newY = 95;
              break;
              
            case 'bottom-right':
              // Bottom-right emojis float in their corner
              newX = emoji.x + Math.sin(currentTime / 2900 + emoji.id) * 0.5;
              newY = emoji.y + Math.cos(currentTime / 3300 + emoji.id) * 0.5;
              
              // Keep in bottom-right region
              if (newX > 100) newX = 80;
              if (newX < 75) newX = 95;
              if (newY > 100) newY = 80;
              if (newY < 75) newY = 95;
              break;
          }
          
          // Minimal rotation to keep emojis mostly upright
          let newRotation = emoji.rotation + (emoji.rotationSpeed * deltaTime / 100);
          if (newRotation > 5) newRotation = 5;
          if (newRotation < -5) newRotation = -5;
          
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
          <div className={`flex items-center justify-center rounded-full ${emoji.color} backdrop-blur-sm p-2 shadow-lg border border-white/40 hover:scale-110 transition-transform duration-300`}>
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
