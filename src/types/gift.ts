
export interface GiftFormData {
  age: number;
  relationship: string;
  interests: string;
  budget: string;
  occasion: string;
}

export interface GiftSuggestion {
  id: string;
  name: string;
  description: string;
  category?: string;
  imageUrl?: string;
  price?: string;
  buyUrl?: string;
}

export interface GiftResponse {
  suggestions: GiftSuggestion[];
}
