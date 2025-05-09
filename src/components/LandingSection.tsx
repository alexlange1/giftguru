
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
  color: string;
  yOffset: number;
  yDirection: number;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onGetStarted }) => {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  
  useEffect(() => {
    // Create floating emojis with improved positioning
    const emojis: FloatingEmoji[] = [];
    
    // More diverse emoji options with better variety
    const emojiOptions = [
      '🎁', '🎀', '🎂', '🎊', '🎉', '💝', '🛍️', 
      '🎄', '🧸', '🎈', '💍', '👑', '🏆', '🎵',
      '🎪', '🎨', '🎭', '🎟️', '🎠', '🧩', '🎯',
      '🚗', '✈️', '🌈', '🌟', '💎'
    ];
    
    // Bubble colors
    const bubbleColors = [
      'bg-[#FDE1D3]/30',
      'bg-[#D3E4FD]/30',
      'bg-[#E5DEFF]/30',
      'bg-[#FFDEE2]/30',
      'bg-[#D3FDE1]/30',
      'bg-[#F5F5DC]/30',
      'bg-[#E1FDFD]/30',
      'bg-[#FDF5E1]/30'
    ];
    
    // Reduce number of emojis and ensure uniqueness
    const usedEmojis = new Set();
    
    for (let i = 0; i < 11; i++) { // Increased to 11 emojis (4 more than the original 7)
      // Get unique emoji
      let emoji;
      do {
        emoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
      } while (usedEmojis.has(emoji) && usedEmojis.size < emojiOptions.length);
      
      usedEmojis.add(emoji);
      
      // Define distributed positions across the screen
      // Avoid the center area (30% to 70% of width, 20% to 70% of height)
      let xPosition: number;
      let yPosition: number;
      
      // Distribute emojis around the screen but not in center
      switch(i % 9) {
        case 0: // Top left
          xPosition = 5 + Math.random() * 20;
          yPosition = 5 + Math.random() * 20;
          break;
        case 1: // Top right
          xPosition = 75 + Math.random() * 20;
          yPosition = 5 + Math.random() * 20;
          break;
        case 2: // Bottom left
          xPosition = 5 + Math.random() * 20;
          yPosition = 75 + Math.random() * 20;
          break;
        case 3: // Bottom right
          xPosition = 75 + Math.random() * 20;
          yPosition = 75 + Math.random() * 20;
          break;
        case 4: // Top center (but not too close to center)
          xPosition = 30 + Math.random() * 40;
          yPosition = 5 + Math.random() * 15;
          break;
        case 5: // Bottom center (but not too close to center)
          xPosition = 30 + Math.random() * 40;
          yPosition = 80 + Math.random() * 15;
          break;
        case 6: // Left middle
          xPosition = 5 + Math.random() * 15;
          yPosition = 30 + Math.random() * 40;
          break;
        case 7: // Right middle
          xPosition = 80 + Math.random() * 15;
          yPosition = 30 + Math.random() * 40;
          break;
        case 8: // Extra position (upper left quadrant)
          xPosition = 15 + Math.random() * 15;
          yPosition = 15 + Math.random() * 15;
          break;
        default:
          xPosition = 40 + Math.random() * 20;
          yPosition = 40 + Math.random() * 20;
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
        color: color,
        yOffset: 0,
        yDirection: Math.random() > 0.5 ? 1 : -1 // Random initial direction
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
          // Calculate vertical floating animation
          let yOffset = emoji.yOffset + (emoji.yDirection * 0.05 * deltaTime / 50);
          
          // Reverse direction when reaching limits
          let yDirection = emoji.yDirection;
          if (Math.abs(yOffset) > 8) {
            yDirection *= -1;
            yOffset = yDirection > 0 ? -8 : 8;
          }
          
          // Calculate horizontal gentle sway
          const xOffset = Math.sin(currentTime / 3000 + emoji.id) * 3;
                    
          // Minimal rotation to keep emojis mostly upright
          let newRotation = emoji.rotation + (emoji.rotationSpeed * deltaTime / 100);
          if (newRotation > 5) newRotation = 5;
          if (newRotation < -5) newRotation = -5;
          
          return {
            ...emoji,
            yOffset,
            yDirection,
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
            left: `${emoji.x + Math.sin(Date.now() / 3000 + emoji.id) * 3}%`,
            top: `${emoji.y + emoji.yOffset}%`,
            fontSize: `${emoji.size}px`,
            transform: `rotate(${emoji.rotation}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <div className={`flex items-center justify-center rounded-full aspect-square ${emoji.color} backdrop-blur-sm p-2 shadow-lg border border-white/40 hover:scale-110 transition-transform duration-300`} style={{width: `${emoji.size * 1.8}px`, height: `${emoji.size * 1.8}px`}}>
            <span>{emoji.emoji}</span>
          </div>
        </div>
      ))}
      
      <div className="max-w-3xl mx-auto text-center z-10 animate-fade-in">
        <div className="inline-flex items-center justify-center p-2 px-4 mb-6 bg-accent/30 backdrop-blur-sm rounded-full border border-white/40 shadow-md hover:shadow-lg transition-all">
          <img 
            src="/lovable-uploads/bf1b3eae-447d-434a-a140-0f395a12ebe7.png" 
            alt="GiftGuru Logo" 
            className="w-6 h-6 mr-2"
          />
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
