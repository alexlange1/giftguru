
import React from 'react';
import { GiftSuggestion } from '../types/gift';
import GiftCard from './GiftCard';
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

  // Group gifts by category for better organization
  const groupedSuggestions: Record<string, GiftSuggestion[]> = {};
  
  suggestions.forEach(suggestion => {
    if (!groupedSuggestions[suggestion.category]) {
      groupedSuggestions[suggestion.category] = [];
    }
    groupedSuggestions[suggestion.category].push(suggestion);
  });

  return (
    <section id="results" className="py-16 px-4 bg-gradient-to-r from-[#fcf5f9] to-[#f5eef7] dark:from-[#201920] dark:to-[#1a171f]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-primary/20 to-[#8B5CF6]/20 dark:from-primary/40 dark:to-[#8B5CF6]/40 rounded-full px-4 py-1.5 mb-4">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#8B5CF6]">
              Gift Suggestions
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Curated Just For Them
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Based on your input, we've handpicked these thoughtful gifts that are sure to delight.
          </p>
        </div>
        
        {/* Modern card layout similar to the example image */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-12">
          {/* Large feature card */}
          <Card className="md:col-span-6 overflow-hidden relative bg-gradient-to-r from-[#FDE1D3] to-[#FFDEE2] dark:from-[#392F36] dark:to-[#41293B] text-black dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-serif">Gift Highlights</CardTitle>
              <CardDescription className="text-black/70 dark:text-white/70">
                Our top suggestions based on your criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {suggestions.slice(0, 3).map((gift, index) => (
                  <div key={gift.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-white/20">
                    <div className="text-xs font-medium text-primary/80 mb-2">
                      {gift.category}
                    </div>
                    <h4 className="font-medium text-lg mb-1">{gift.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{gift.description}</p>
                    <div className="mt-3 text-sm font-medium">{gift.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Category cards - similar to health app design */}
          {Object.entries(groupedSuggestions).map(([category, gifts], index) => {
            // Different background colors based on category
            const bgColors = [
              'from-blue-200 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40',
              'from-purple-200 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40',
              'from-green-200 to-green-100 dark:from-green-900/40 dark:to-green-800/40',
              'from-yellow-200 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/40',
            ];
            const colorClass = bgColors[index % bgColors.length];
            
            return (
              <Card 
                key={category}
                className={`md:col-span-3 overflow-hidden bg-gradient-to-br ${colorClass}`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-serif">{category} Gifts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gifts.map(gift => (
                      <div key={gift.id} className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium">{gift.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{gift.description}</p>
                        <div className="text-xs font-medium text-right mt-1">{gift.price}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Traditional card view as a fallback/additional section */}
        <h3 className="font-serif text-2xl font-bold mb-6 mt-12">All Suggestions</h3>
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
