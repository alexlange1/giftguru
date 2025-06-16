import { useState, useMemo } from 'react';
import { Product, Interest, Relationship, Occasion, BudgetRange } from '../types/product';
import { GiftRecommender } from '../lib/recommender';
import { generateDummyProducts } from '../lib/generateDummyProducts';

interface UseGiftRecommenderProps {
  age: number;
  relationship: Relationship;
  interests: Interest[];
  additionalDetails?: string;
  budgetRange: BudgetRange;
  occasion: Occasion;
}

export function useGiftRecommender({
  age,
  relationship,
  interests,
  additionalDetails,
  budgetRange,
  occasion
}: UseGiftRecommenderProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate dummy products only once
  const products = useMemo(() => generateDummyProducts(500), []);

  const getRecommendations = async (limit: number = 10) => {
    try {
      setIsLoading(true);
      setError(null);

      const recommender = new GiftRecommender(products);
      const results = recommender.getRecommendations(
        {
          age,
          relationship,
          interests,
          additionalDetails,
          budgetRange,
          occasion
        },
        limit
      );

      setRecommendations(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while getting recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    recommendations,
    isLoading,
    error,
    getRecommendations
  };
} 