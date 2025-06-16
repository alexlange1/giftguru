import { Product, Interest, Relationship, Occasion, BudgetRange } from '../types/product';
import xlsx from 'xlsx';
import path from 'path';

// Helper functions to map string values to enums
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
    case 'Under $25': return 'Under $25';
    case '$25 - $50': return '$25 - $50';
    case '$50 - $100': return '$50 - $100';
    case 'Over $100': return 'Over $100';
    default: return 'Under $25';
  }
};
const mapOccasion = (value: string): Occasion => {
  switch (value) {
    case 'Birthday': return 'Birthday';
    case 'Christmas': return 'Christmas';
    case 'Anniversary': return 'Anniversary';
    case "Valentine's Day": return "Valentine's Day";
    case 'Graduation': return 'Graduation';
    case 'Wedding': return 'Wedding';
    case 'Just Because': return 'Just Because';
    case 'Other': return 'Other';
    default: return 'Other';
  }
};

export function generateDummyProducts(): Product[] {
  const filePath = path.resolve('final_giftlist.xlsx');
  const wb = xlsx.readFile(filePath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws, { header: 1, range: 1, blankrows: false });

  return rows.map((row: any[], idx: number) => {
    const [gift_id, gift_name, description, price, budget_range, occasion, age_range, relationship, interests, brand_or_notes] = row;
    return {
      id: gift_id || `gift_${idx}`,
      name: gift_name || '',
      description: description || '',
      price: typeof price === 'number' ? price : parseFloat(price),
      imageUrl: '',
      ageRange: { min: 0, max: 100 }, // Could be improved by parsing age_range
      interests: (interests || '').split(',').map((i: string) => mapInterest(i.trim())).filter(Boolean),
      suitableRelationships: [mapRelationship(relationship || '')],
      suitableOccasions: [mapOccasion(occasion || '')],
      tags: brand_or_notes ? [brand_or_notes] : [],
      rating: 4.5, // Placeholder
      popularity: 500, // Placeholder
      inStock: true,
      brand: '',
      category: '',
      weight: 1,
      dimensions: { length: 1, width: 1, height: 1 },
      shippingInfo: { isFreeShipping: true, estimatedDays: 5 },
    };
  });
} 