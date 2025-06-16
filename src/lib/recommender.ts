import { Product, Interest, Relationship, Occasion, BudgetRange } from '../types/product';

interface UserPreferences {
  age: number;
  relationship: Relationship;
  interests: Interest[];
  additionalDetails?: string;
  budgetRange: BudgetRange;
  occasion: Occasion;
}

export class GiftRecommender {
  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  private getBudgetRange(budgetRange: BudgetRange): { min: number; max: number } {
    switch (budgetRange) {
      case 'Under $25':
        return { min: 0, max: 25 };
      case '$25 - $50':
        return { min: 25, max: 50 };
      case '$50 - $100':
        return { min: 50, max: 100 };
      case 'Over $100':
        return { min: 100, max: Infinity };
      default:
        return { min: 0, max: Infinity };
    }
  }

  private calculateAgeScore(product: Product, userAge: number): number {
    const { min, max } = product.ageRange;
    if (userAge >= min && userAge <= max) return 1;
    const distance = Math.min(Math.abs(userAge - min), Math.abs(userAge - max));
    return Math.max(0, 1 - distance / 20); // Score decreases as age difference increases
  }

  private calculateInterestScore(product: Product, userInterests: Interest[]): number {
    if (userInterests.length === 0) return 0;
    const matchingInterests = product.interests.filter(interest => 
      userInterests.includes(interest)
    ).length;
    return matchingInterests / userInterests.length;
  }

  private calculateRelationshipScore(product: Product, relationship: Relationship): number {
    return product.suitableRelationships.includes(relationship) ? 1 : 0;
  }

  private calculateOccasionScore(product: Product, occasion: Occasion): number {
    return product.suitableOccasions.includes(occasion) ? 1 : 0;
  }

  private calculateBudgetScore(product: Product, budgetRange: BudgetRange): number {
    const { min, max } = this.getBudgetRange(budgetRange);
    if (product.price >= min && product.price <= max) return 1;
    if (product.price < min) return 0.5;
    return Math.max(0, 1 - (product.price - max) / max);
  }

  private calculatePopularityScore(product: Product): number {
    return product.popularity / 1000; // Normalize popularity score
  }

  private calculateRatingScore(product: Product): number {
    return product.rating / 5; // Normalize rating score
  }

  public getRecommendations(preferences: UserPreferences, limit: number = 10): Product[] {
    const scoredProducts = this.products.map(product => {
      const ageScore = this.calculateAgeScore(product, preferences.age);
      const interestScore = this.calculateInterestScore(product, preferences.interests);
      const relationshipScore = this.calculateRelationshipScore(product, preferences.relationship);
      const occasionScore = this.calculateOccasionScore(product, preferences.occasion);
      const budgetScore = this.calculateBudgetScore(product, preferences.budgetRange);
      const popularityScore = this.calculatePopularityScore(product);
      const ratingScore = this.calculateRatingScore(product);

      // Weighted scoring system
      const totalScore = 
        ageScore * 0.15 +
        interestScore * 0.25 +
        relationshipScore * 0.15 +
        occasionScore * 0.15 +
        budgetScore * 0.15 +
        popularityScore * 0.075 +
        ratingScore * 0.075;

      return {
        product,
        score: totalScore
      };
    });

    // Sort by score and return top recommendations
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }
} 