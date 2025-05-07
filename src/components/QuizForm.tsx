
import React, { useState } from 'react';
import { GiftFormData } from '../types/gift';
import { ArrowRight, Gift, Lightbulb } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      age: value[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="quiz" className="py-16 px-4 bg-gradient-to-br from-[#fcf5f9] to-[#f5eef7] dark:from-[#201920] dark:to-[#1a171f]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
          Help us find your perfect gift
        </h2>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="age" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif">
                  Recipient's Age: {formData.age}
                </Label>
                <Slider 
                  defaultValue={[30]} 
                  max={100} 
                  step={1}
                  value={[formData.age]}
                  onValueChange={handleSliderChange}
                  className="my-6"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="relationship" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif">
                  Your Relationship
                </Label>
                <Select 
                  value={formData.relationship} 
                  onValueChange={(value) => handleSelectChange('relationship', value)}
                >
                  <SelectTrigger className="w-full h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-[#e5deff] dark:border-[#8B5CF6]/30 focus:ring-primary focus:ring-offset-0">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="partner">Partner/Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="coworker">Coworker</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="interests" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif">
                What do they love?
              </Label>
              <Textarea 
                id="interests" 
                name="interests" 
                value={formData.interests} 
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about their passions... (e.g., cooking, hiking, reading sci-fi, playing guitar)"
                className="w-full p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-[#e5deff] dark:border-[#8B5CF6]/30 rounded-xl resize-none focus:ring-primary focus:ring-offset-0"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif">
                  Budget Range
                </Label>
                <Select 
                  value={formData.budget} 
                  onValueChange={(value) => handleSelectChange('budget', value)}
                >
                  <SelectTrigger className="w-full h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-[#e5deff] dark:border-[#8B5CF6]/30 focus:ring-primary focus:ring-offset-0">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-25">Under $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="over-100">Over $100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="occasion" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif">
                  Occasion
                </Label>
                <Select 
                  value={formData.occasion} 
                  onValueChange={(value) => handleSelectChange('occasion', value)}
                >
                  <SelectTrigger className="w-full h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-[#e5deff] dark:border-[#8B5CF6]/30 focus:ring-primary focus:ring-offset-0">
                    <SelectValue placeholder="Select occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="christmas">Christmas</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="valentines">Valentine's Day</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="just-because">Just Because</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit" 
                className="w-full py-5 px-6 bg-gradient-to-r from-primary to-[#8B5CF6] text-white text-lg font-medium rounded-xl hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/30 transition-all duration-300 flex items-center justify-center"
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
                    <Gift className="mr-2 h-5 w-5" />
                    🎁 Find the perfect gift
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                Takes 2 seconds. Completely free.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuizForm;
