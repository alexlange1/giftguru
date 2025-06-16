
import React from 'react';
import { GiftSuggestion } from '../types/gift';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultSectionProps {
  suggestions: GiftSuggestion[];
  isLoading: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({ suggestions, isLoading }) => {
  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 h-64 animate-pulse border border-gray-100 dark:border-gray-700" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const topSuggestions = suggestions.slice(0, 6);

  // Helper to format price to 2 decimal places
  const formatPrice = (price?: string) => {
    if (!price) return '';
    // Remove $ if present, parse as float, round, and add $ back
    const num = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) return price;
    return `$${num.toFixed(2)}`;
  };

  return (
    <section id="results" className="py-16 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Perfect Gift Recommendations
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Handpicked suggestions just for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topSuggestions.map((gift, index) => (
            <Card 
              key={gift.id} 
              className="group overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors">
                    {gift.name}
                  </CardTitle>
                  {gift.category && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      {gift.category}
                    </span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {gift.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(gift.price)}
                  </div>
                  
                  <button className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                    View Gift
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
