
import React from 'react';
import { GiftSuggestion } from '../types/gift';
import GiftCard from './GiftCard';

interface ResultSectionProps {
  suggestions: GiftSuggestion[];
  isLoading: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({ suggestions, isLoading }) => {
  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-shimmer"></div>
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto animate-shimmer" style={{ animationDelay: '0.1s' }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-64">
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 animate-shimmer" style={{ animationDelay: `${i * 0.1}s` }}></div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 animate-shimmer" style={{ animationDelay: `${i * 0.1 + 0.1}s` }}></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-2 animate-shimmer" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 animate-shimmer" style={{ animationDelay: `${i * 0.1 + 0.3}s` }}></div>
                <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded-full animate-shimmer" style={{ animationDelay: `${i * 0.1 + 0.4}s` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <section id="results" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Curated Just For Them
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Based on your input, we've handpicked these thoughtful gifts that are sure to delight.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((gift, index) => (
            <GiftCard key={gift.id} gift={gift} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
