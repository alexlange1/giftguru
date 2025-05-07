
import React from 'react';
import { GiftSuggestion } from '../types/gift';
import { ArrowRight } from 'lucide-react';

interface GiftCardProps {
  gift: GiftSuggestion;
  index: number;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, index }) => {
  return (
    <div 
      className="gift-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
    >
      <div className={`h-1.5 ${getCategoryColor(gift.category)}`}></div>
      
      <div className="p-6">
        {gift.category && (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 mb-3">
            {gift.category}
          </div>
        )}
        
        <h3 className="font-serif text-xl font-bold mb-2">{gift.name}</h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{gift.description}</p>
        
        <div className="flex justify-between items-center">
          {gift.price && <p className="text-sm font-medium">{gift.price}</p>}
          
          <button 
            className="inline-flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 text-sm font-medium transition-colors"
          >
            Buy Now <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get category color
const getCategoryColor = (category?: string): string => {
  switch (category?.toLowerCase()) {
    case 'tech':
      return 'bg-blue-500';
    case 'experience':
      return 'bg-purple-500';
    case 'handmade':
      return 'bg-amber-500';
    case 'cozy':
      return 'bg-green-500';
    default:
      return 'bg-primary';
  }
};

export default GiftCard;
