export type Relationship = 
  | 'Friend'
  | 'Partner/Spouse'
  | 'Parent'
  | 'Child'
  | 'Sibling'
  | 'Coworker'
  | 'Other';

export type Interest = 
  | 'Photography'
  | 'Music'
  | 'Reading'
  | 'Cooking'
  | 'Travel'
  | 'Technology'
  | 'Creative'
  | 'Gaming';

export type BudgetRange = 
  | 'Under $25'
  | '$25 - $50'
  | '$50 - $100'
  | 'Over $100';

export type Occasion = 
  | 'Birthday'
  | 'Christmas'
  | 'Anniversary'
  | 'Valentine\'s Day'
  | 'Graduation'
  | 'Wedding'
  | 'Just Because'
  | 'Other';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ageRange: {
    min: number;
    max: number;
  };
  interests: Interest[];
  suitableRelationships: Relationship[];
  suitableOccasions: Occasion[];
  tags: string[];
  rating: number;
  popularity: number;
  inStock: boolean;
  brand: string;
  category: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  shippingInfo: {
    isFreeShipping: boolean;
    estimatedDays: number;
  };
} 