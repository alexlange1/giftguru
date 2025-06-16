import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import LandingSection from '../components/LandingSection';
import QuizForm from '../components/QuizForm';
import ResultSection from '../components/ResultSection';
import { GiftFormData, GiftSuggestion, GiftResponse } from '../types/gift';
import { GiftRecommender } from '../lib/recommender';
import { generateDummyProducts } from '../lib/generateDummyProducts';
import { Relationship, Interest, BudgetRange, Occasion } from '../types/product';

const Index = () => {
  const { toast } = useToast();
  const quizRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGetStarted = () => {
    quizRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mapping functions from form string values to strict types
  const mapRelationship = (value: string): Relationship => {
    switch (value.toLowerCase()) {
      case 'friend': return 'Friend';
      case 'partner':
      case 'partner/spouse': return 'Partner/Spouse';
      case 'parent': return 'Parent';
      case 'child': return 'Child';
      case 'sibling': return 'Sibling';
      case 'coworker': return 'Coworker';
      default: return 'Other';
    }
  };
  const mapInterest = (value: string): Interest => {
    switch (value.toLowerCase()) {
      case 'photography': return 'Photography';
      case 'music': return 'Music';
      case 'reading': return 'Reading';
      case 'cooking': return 'Cooking';
      case 'travel': return 'Travel';
      case 'tech':
      case 'technology': return 'Technology';
      case 'creative': return 'Creative';
      case 'gaming': return 'Gaming';
      default: return 'Creative'; // fallback
    }
  };
  const mapBudget = (value: string): BudgetRange => {
    switch (value) {
      case 'under-25': return 'Under $25';
      case '25-50': return '$25 - $50';
      case '50-100': return '$50 - $100';
      case 'over-100': return 'Over $100';
      default: return 'Under $25';
    }
  };
  const mapOccasion = (value: string): Occasion => {
    switch (value) {
      case 'birthday': return 'Birthday';
      case 'christmas': return 'Christmas';
      case 'anniversary': return 'Anniversary';
      case 'valentines': return "Valentine's Day";
      case 'graduation': return 'Graduation';
      case 'wedding': return 'Wedding';
      case 'just-because': return 'Just Because';
      case 'other': return 'Other';
      default: return 'Other';
    }
  };

  const handleSubmitForm = async (formData: GiftFormData) => {
    setIsLoading(true);
    setShowResults(true);

    try {
      // Use local recommender as the primary source
      const relationship = mapRelationship(formData.relationship);
      const interests = formData.interests.split(',').map(i => mapInterest(i.trim()));
      const budgetRange = mapBudget(formData.budget);
      const occasion = mapOccasion(formData.occasion);
      const products = generateDummyProducts(500);
      const recommender = new GiftRecommender(products);
      const recommendations = recommender.getRecommendations({
        age: formData.age,
        relationship,
        interests,
        budgetRange,
        occasion,
        additionalDetails: ''
      }, 10);
      const transformedSuggestions: GiftSuggestion[] = recommendations.map((product, index) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        imageUrl: product.imageUrl,
        price: `$${product.price}`,
        buyUrl: ''
      }));
      setSuggestions(transformedSuggestions);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Error generating gift suggestions:', error);
      toast({
        title: "Something went wrong",
        description: "Unable to get gift suggestions. Please try again.",
        variant: "destructive"
      });
      // Fallback to static mock data if even local recommender fails
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
      setSuggestions(mockResponse.suggestions);
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
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/bf1b3eae-447d-434a-a140-0f395a12ebe7.png" 
                alt="GiftGuru Logo" 
                className="h-12 w-auto"
              />
              <h2 className="font-serif text-2xl">
                GiftGuru – AI Gift Concierge
              </h2>
            </div>
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
