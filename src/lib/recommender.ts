import { Product, Interest, Relationship, Occasion, BudgetRange } from '../types/product';

interface UserPreferences {
  age: number;
  relationship: Relationship;
  interests: Interest[];
  additionalDetails?: string;
  budgetRange: BudgetRange;
  occasion: Occasion;
}

interface ProductSimilarity {
  productId: string;
  similarity: number;
}

export class GiftRecommender {
  private products: Product[];
  private productSimilarities: Map<string, ProductSimilarity[]>;

  constructor(products: Product[]) {
    this.products = products;
    this.productSimilarities = new Map();
    this.initializeProductSimilarities();
  }

  private initializeProductSimilarities() {
    // Calculate similarity between all pairs of products
    for (const product1 of this.products) {
      const similarities: ProductSimilarity[] = [];
      
      for (const product2 of this.products) {
        if (product1.id === product2.id) continue;
        
        const similarity = this.calculateProductSimilarity(product1, product2);
        similarities.push({
          productId: product2.id,
          similarity
        });
      }
      
      // Sort by similarity and keep top 10
      this.productSimilarities.set(
        product1.id,
        similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 10)
      );
    }
  }

  private calculateProductSimilarity(product1: Product, product2: Product): number {
    // Calculate similarity based on multiple factors
    const interestSimilarity = this.calculateInterestSimilarity(product1, product2);
    const priceSimilarity = this.calculatePriceSimilarity(product1, product2);
    const ageRangeSimilarity = this.calculateAgeRangeSimilarity(product1, product2);
    const relationshipSimilarity = this.calculateRelationshipSimilarity(product1, product2);
    const occasionSimilarity = this.calculateOccasionSimilarity(product1, product2);

    // Weighted combination of similarities
    return (
      interestSimilarity * 0.35 +
      priceSimilarity * 0.2 +
      ageRangeSimilarity * 0.15 +
      relationshipSimilarity * 0.15 +
      occasionSimilarity * 0.15
    );
  }

  private calculateInterestSimilarity(product1: Product, product2: Product): number {
    const commonInterests = product1.interests.filter(interest => 
      product2.interests.includes(interest)
    ).length;
    const totalInterests = new Set([...product1.interests, ...product2.interests]).size;
    return totalInterests > 0 ? commonInterests / totalInterests : 0;
  }

  private calculatePriceSimilarity(product1: Product, product2: Product): number {
    const maxPrice = Math.max(product1.price, product2.price);
    const priceDiff = Math.abs(product1.price - product2.price);
    return Math.max(0, 1 - priceDiff / maxPrice);
  }

  private calculateAgeRangeSimilarity(product1: Product, product2: Product): number {
    const overlap = Math.min(product1.ageRange.max, product2.ageRange.max) - 
                   Math.max(product1.ageRange.min, product2.ageRange.min);
    const totalRange = Math.max(product1.ageRange.max, product2.ageRange.max) - 
                      Math.min(product1.ageRange.min, product2.ageRange.min);
    return totalRange > 0 ? Math.max(0, overlap / totalRange) : 0;
  }

  private calculateRelationshipSimilarity(product1: Product, product2: Product): number {
    const commonRelationships = product1.suitableRelationships.filter(rel => 
      product2.suitableRelationships.includes(rel)
    ).length;
    const totalRelationships = new Set([...product1.suitableRelationships, ...product2.suitableRelationships]).size;
    return totalRelationships > 0 ? commonRelationships / totalRelationships : 0;
  }

  private calculateOccasionSimilarity(product1: Product, product2: Product): number {
    const commonOccasions = product1.suitableOccasions.filter(occ => 
      product2.suitableOccasions.includes(occ)
    ).length;
    const totalOccasions = new Set([...product1.suitableOccasions, ...product2.suitableOccasions]).size;
    return totalOccasions > 0 ? commonOccasions / totalOccasions : 0;
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
    return Math.max(0, 1 - distance / 20);
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
    return product.popularity / 1000;
  }

  private calculateRatingScore(product: Product): number {
    return product.rating / 5;
  }

  private calculateCollaborativeScore(product: Product, preferences: UserPreferences): number {
    // Find similar products based on user preferences
    const similarProducts = this.productSimilarities.get(product.id) || [];
    
    // Calculate a score based on how well similar products match user preferences
    let totalScore = 0;
    let count = 0;
    
    for (const { productId, similarity } of similarProducts) {
      const similarProduct = this.products.find(p => p.id === productId);
      if (!similarProduct) continue;
      
      const contentScore = this.calculateContentScore(similarProduct, preferences);
      totalScore += contentScore * similarity;
      count++;
    }
    
    return count > 0 ? totalScore / count : 0;
  }

  private calculateContentScore(product: Product, preferences: UserPreferences): number {
    const ageScore = this.calculateAgeScore(product, preferences.age);
    const interestScore = this.calculateInterestScore(product, preferences.interests);
    const relationshipScore = this.calculateRelationshipScore(product, preferences.relationship);
    const occasionScore = this.calculateOccasionScore(product, preferences.occasion);
    const budgetScore = this.calculateBudgetScore(product, preferences.budgetRange);
    const popularityScore = this.calculatePopularityScore(product);
    const ratingScore = this.calculateRatingScore(product);

    return (
      ageScore * 0.15 +
      interestScore * 0.25 +
      relationshipScore * 0.15 +
      occasionScore * 0.15 +
      budgetScore * 0.15 +
      popularityScore * 0.075 +
      ratingScore * 0.075
    );
  }

  public getRecommendations(preferences: UserPreferences, limit: number = 10): Product[] {
    // Strict budget filter for all budget ranges
    const { min, max } = this.getBudgetRange(preferences.budgetRange);
    let filteredProducts = this.products.filter(product => product.price >= min && product.price <= max);

    const scoredProducts = filteredProducts.map(product => {
      // Content-based score
      const contentScore = this.calculateContentScore(product, preferences);
      
      // Collaborative score
      const collaborativeScore = this.calculateCollaborativeScore(product, preferences);
      
      // Hybrid score (weighted combination)
      const totalScore = contentScore * 0.7 + collaborativeScore * 0.3;

      return {
        product,
        score: totalScore
      };
    });

    // Sort by score and filter for unique product names
    const uniqueNameMap = new Map<string, { product: Product; score: number }>();
    for (const item of scoredProducts.sort((a, b) => b.score - a.score)) {
      if (!uniqueNameMap.has(item.product.name)) {
        uniqueNameMap.set(item.product.name, item);
      }
      if (uniqueNameMap.size >= limit) break;
    }

    return Array.from(uniqueNameMap.values()).map(item => item.product);
  }
} 