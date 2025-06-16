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
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const topSuggestions = suggestions.slice(0, 5);

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
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topSuggestions.map((gift) => (
            <Card key={gift.id} className="overflow-hidden relative bg-white dark:bg-gray-900 text-black dark:text-white shadow-xl border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif mb-1">{gift.name}</CardTitle>
                {gift.category && (
                  <CardDescription className="text-primary/80 text-xs mb-2">
                    {gift.category}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4 min-h-[60px]">{gift.description}</p>
                <div className="mt-2 text-base font-bold">{formatPrice(gift.price)}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
