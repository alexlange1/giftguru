
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import LandingSection from '../components/LandingSection';
import QuizForm from '../components/QuizForm';
import ResultSection from '../components/ResultSection';
import { GiftFormData, GiftSuggestion, GiftResponse } from '../types/gift';

const Index = () => {
  const { toast } = useToast();
  const quizRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGetStarted = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitForm = async (formData: GiftFormData) => {
    setIsLoading(true);
    setShowResults(true);

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/suggest', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      
      // For demo purposes, we'll mock the API response
      const mockResponse: GiftResponse = {
        suggestions: [
          {
            id: '1',
            name: 'Personalized Star Map',
            description: 'A custom star map showing the night sky from a specific date and location. Perfect for commemorating special moments.',
            category: 'Handmade',
            price: '$50-$75'
          },
          {
            id: '2',
            name: 'Sunset Projection Lamp',
            description: 'Projects a warm, sunset glow into any room. Creates a cozy, magical atmosphere for evenings.',
            category: 'Cozy',
            price: '$35-$45'
          },
          {
            id: '3',
            name: 'Wireless Noise-Cancelling Headphones',
            description: 'Premium sound quality with active noise cancellation for immersive listening experiences anywhere.',
            category: 'Tech',
            price: '$90-$120'
          },
          {
            id: '4',
            name: 'Hot Air Balloon Ride Experience',
            description: 'An unforgettable adventure soaring above scenic landscapes at sunrise with champagne toast included.',
            category: 'Experience',
            price: '$150-$250'
          },
          {
            id: '5',
            name: 'Artisanal Chocolate Tasting Box',
            description: 'A curated selection of premium chocolates from around the world with tasting notes and pairing suggestions.',
            category: 'Cozy',
            price: '$40-$60'
          }
        ]
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuggestions(mockResponse.suggestions);
      
      // Scroll to results after they load
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (error) {
      console.error('Error fetching gift suggestions:', error);
      toast({
        title: "Something went wrong",
        description: "Unable to get gift suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf5f9] to-[#f5eef7] dark:from-[#201920] dark:to-[#1a171f]">
      <LandingSection onGetStarted={handleGetStarted} />
      
      <div ref={quizRef}>
        <QuizForm onSubmit={handleSubmitForm} isSubmitting={isLoading} />
      </div>
      
      {(showResults || suggestions.length > 0) && (
        <ResultSection suggestions={suggestions} isLoading={isLoading} />
      )}
      
      <footer className="bg-white dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="font-serif text-2xl mb-4">
              GiftGuru – AI Gift Concierge
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Finding the perfect gift, made simple.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
