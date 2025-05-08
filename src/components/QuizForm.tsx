
import React, { useState } from 'react';
import { GiftFormData } from '../types/gift';
import { ArrowRight, Gift, Lightbulb, Heart, Camera, Music, Book, Utensils, Plane, Code } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';

interface QuizFormProps {
  onSubmit: (data: GiftFormData) => void;
  isSubmitting: boolean;
}

interface InterestOption {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<GiftFormData>({
    age: 30,
    relationship: '',
    interests: '',
    budget: '',
    occasion: ''
  });
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Pre-defined interest options with icons
  const interestOptions: InterestOption[] = [
    { value: 'photography', label: 'Photography', icon: Camera, color: 'bg-blue-100 dark:bg-blue-900' },
    { value: 'music', label: 'Music', icon: Music, color: 'bg-purple-100 dark:bg-purple-900' },
    { value: 'reading', label: 'Reading', icon: Book, color: 'bg-yellow-100 dark:bg-yellow-900' },
    { value: 'cooking', label: 'Cooking', icon: Utensils, color: 'bg-red-100 dark:bg-red-900' },
    { value: 'travel', label: 'Travel', icon: Plane, color: 'bg-green-100 dark:bg-green-900' },
    { value: 'tech', label: 'Technology', icon: Code, color: 'bg-gray-100 dark:bg-gray-800' },
  ];

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
  
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
    
    // Update interests in form data
    const updatedInterests = selectedInterests.includes(interest) 
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
      
    setFormData(prev => ({
      ...prev,
      interests: [...updatedInterests, formData.interests.trim() ? formData.interests : ''].filter(Boolean).join(', ')
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="quiz" className="py-16 px-4 bg-gradient-to-br from-[#fcf5f9] to-[#f5eef7] dark:from-[#201920] dark:to-[#1a171f]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-center">
          Help us find your perfect gift
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Tell us about who you're shopping for and we'll suggest unique gifts they'll love
        </p>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 border border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <Card className="border border-[#e5deff]/50 dark:border-[#8B5CF6]/30 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#F5F5F5] to-[#E5DEFF]/30 dark:from-gray-800 dark:to-[#201920] p-4 border-b border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
                  <h3 className="font-serif text-lg font-medium">Who are you shopping for?</h3>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="age" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif mb-3 block">
                      Their Age: {formData.age}
                    </Label>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[30]} 
                        max={100} 
                        step={1}
                        value={[formData.age]}
                        onValueChange={handleSliderChange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-xs text-gray-500 px-2 -mt-2">
                        <span>1</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="relationship" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif mb-3 block">
                      Your Relationship
                    </Label>
                    <Select 
                      value={formData.relationship} 
                      onValueChange={(value) => handleSelectChange('relationship', value)}
                    >
                      <SelectTrigger className="w-full h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-[#e5deff] dark:border-[#8B5CF6]/30 focus:ring-primary focus:ring-offset-0">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friend" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-blue-500" />
                          Friend
                        </SelectItem>
                        <SelectItem value="partner" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-red-500" />
                          Partner/Spouse
                        </SelectItem>
                        <SelectItem value="parent" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-green-500" />
                          Parent
                        </SelectItem>
                        <SelectItem value="child" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-yellow-500" />
                          Child
                        </SelectItem>
                        <SelectItem value="sibling" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-purple-500" />
                          Sibling
                        </SelectItem>
                        <SelectItem value="coworker" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-gray-500" />
                          Coworker
                        </SelectItem>
                        <SelectItem value="other" className="flex items-center">
                          <Heart className="mr-2 h-4 w-4 text-pink-500" />
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-[#e5deff]/50 dark:border-[#8B5CF6]/30 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#F5F5F5] to-[#E5DEFF]/30 dark:from-gray-800 dark:to-[#201920] p-4 border-b border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
                  <h3 className="font-serif text-lg font-medium">Their Interests</h3>
                </div>
                <CardContent className="p-6">
                  <Label className="text-gray-800 dark:text-gray-200 mb-4 block">
                    Select interests that apply (or add your own below)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest.value}
                        type="button"
                        onClick={() => toggleInterest(interest.value)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                          selectedInterests.includes(interest.value)
                            ? `${interest.color} ring-2 ring-primary`
                            : 'bg-white/50 dark:bg-gray-700/50 hover:bg-white hover:dark:bg-gray-700'
                        }`}
                      >
                        <interest.icon className={`h-6 w-6 mb-2 ${
                          selectedInterests.includes(interest.value) ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                        }`} />
                        <span className="text-sm font-medium">{interest.label}</span>
                      </button>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="interests" className="text-gray-800 dark:text-gray-200 mb-2 block">
                      Add more details about what they love
                    </Label>
                    <Textarea 
                      id="interests" 
                      name="interests" 
                      value={formData.interests} 
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about their passions... (e.g., specific genres, brands they love, hobbies)"
                      className="w-full p-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-[#e5deff] dark:border-[#8B5CF6]/30 rounded-xl resize-none focus:ring-primary focus:ring-offset-0"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-[#e5deff]/50 dark:border-[#8B5CF6]/30 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#F5F5F5] to-[#E5DEFF]/30 dark:from-gray-800 dark:to-[#201920] p-4 border-b border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
                  <h3 className="font-serif text-lg font-medium">Gift Details</h3>
                </div>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="budget" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif mb-3 block">
                      Budget Range
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['under-25', '25-50', '50-100', 'over-100'].map((budget, index) => {
                        const labels = ['Under $25', '$25 - $50', '$50 - $100', 'Over $100'];
                        return (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => handleSelectChange('budget', budget)}
                            className={`p-3 rounded-xl transition-all ${
                              formData.budget === budget
                                ? 'bg-primary/20 border-2 border-primary'
                                : 'bg-white/50 dark:bg-gray-700/50 border border-[#e5deff] dark:border-[#8B5CF6]/30'
                            }`}
                          >
                            <div className="text-center">
                              <span className={`text-md ${formData.budget === budget ? 'font-bold text-primary' : ''}`}>
                                {labels[index]}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="occasion" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif mb-3 block">
                      Occasion
                    </Label>
                    <Select 
                      value={formData.occasion} 
                      onValueChange={(value) => handleSelectChange('occasion', value)}
                    >
                      <SelectTrigger className="w-full h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-[#e5deff] dark:border-[#8B5CF6]/30 focus:ring-primary focus:ring-offset-0">
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
                </CardContent>
              </Card>
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
