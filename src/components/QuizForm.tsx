
import React, { useState } from 'react';
import { GiftFormData } from '../types/gift';
import { ArrowRight } from 'lucide-react';

interface QuizFormProps {
  onSubmit: (data: GiftFormData) => void;
  isSubmitting: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<GiftFormData>({
    age: 30,
    relationship: '',
    interests: '',
    budget: '',
    occasion: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="quiz" className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
          Help us find your perfect gift
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Recipient's Age
                </label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange}
                  min="0"
                  max="120"
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Relationship
                </label>
                <select 
                  id="relationship" 
                  name="relationship" 
                  value={formData.relationship} 
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="" disabled>Select relationship</option>
                  <option value="friend">Friend</option>
                  <option value="partner">Partner/Spouse</option>
                  <option value="parent">Parent</option>
                  <option value="child">Child</option>
                  <option value="sibling">Sibling</option>
                  <option value="coworker">Coworker</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Interests or Hobbies
              </label>
              <textarea 
                id="interests" 
                name="interests" 
                value={formData.interests} 
                onChange={handleChange}
                rows={3}
                placeholder="What do they enjoy? (e.g., cooking, hiking, reading sci-fi, playing guitar)"
                className="block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary resize-none"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Budget Range
                </label>
                <select 
                  id="budget" 
                  name="budget" 
                  value={formData.budget} 
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="" disabled>Select budget</option>
                  <option value="under-25">Under $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="over-100">Over $100</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Occasion
                </label>
                <select 
                  id="occasion" 
                  name="occasion" 
                  value={formData.occasion} 
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="" disabled>Select occasion</option>
                  <option value="birthday">Birthday</option>
                  <option value="christmas">Christmas</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="valentines">Valentine's Day</option>
                  <option value="graduation">Graduation</option>
                  <option value="wedding">Wedding</option>
                  <option value="just-because">Just Because</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full py-4 px-6 bg-primary text-white text-lg font-medium rounded-xl hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Finding perfect gifts...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Find the Perfect Gift
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuizForm;
