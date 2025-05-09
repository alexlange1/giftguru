
import React, { useState } from 'react';
import { GiftFormData } from '../types/gift';
import { 
  Gift, Camera, Music, Book, 
  Utensils, Plane, Code, 
  Palette, Scissors, Gamepad
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import { Toggle } from '@/components/ui/toggle';

interface QuizFormProps {
  onSubmit: (data: GiftFormData) => void;
  isSubmitting: boolean;
}

interface InterestOption {
  value: string;
  label: string;
  icon: React.ElementType;
}

interface RelationshipOption {
  value: string;
  label: string;
  emoji: string;
}

interface OccasionOption {
  value: string;
  label: string;
  emoji: string;
  gradient: string;
}

const RequiredIndicator = () => (
  <span className="text-red-500 ml-1">*</span>
);

const QuizForm: React.FC<QuizFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<GiftFormData>({
    age: 30,
    relationship: '',
    interests: '',
    budget: '',
    occasion: ''
  });
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

  // Pre-defined interest options with icons
  const interestOptions: InterestOption[] = [
    { value: 'photography', label: 'Photography', icon: Camera },
    { value: 'music', label: 'Music', icon: Music },
    { value: 'reading', label: 'Reading', icon: Book },
    { value: 'cooking', label: 'Cooking', icon: Utensils },
    { value: 'travel', label: 'Travel', icon: Plane },
    { value: 'tech', label: 'Technology', icon: Code },
    { value: 'creative', label: 'Creative', icon: Palette },
    { value: 'gaming', label: 'Gaming', icon: Gamepad },
  ];
  
  // Relationship options with emojis and gradients
  const relationshipOptions: RelationshipOption[] = [
    { value: 'friend', label: 'Friend', emoji: '👯' },
    { value: 'partner', label: 'Partner/Spouse', emoji: '💑' },
    { value: 'parent', label: 'Parent', emoji: '👪' },
    { value: 'child', label: 'Child', emoji: '👶' },
    { value: 'sibling', label: 'Sibling', emoji: '👨‍👩‍👧‍👦' },
    { value: 'coworker', label: 'Coworker', emoji: '👨‍💼' },
    { value: 'other', label: 'Other', emoji: '🤝' },
  ];
  
  // Occasion options with emojis and consistent gradients
  const occasionOptions: OccasionOption[] = [
    { value: 'birthday', label: 'Birthday', emoji: '🎂', gradient: 'from-pink-500/20 to-orange-500/20' },
    { value: 'christmas', label: 'Christmas', emoji: '🎄', gradient: 'from-green-500/20 to-red-500/20' },
    { value: 'anniversary', label: 'Anniversary', emoji: '💍', gradient: 'from-purple-500/20 to-pink-500/20' },
    { value: 'valentines', label: 'Valentine\'s Day', emoji: '❤️', gradient: 'from-red-500/20 to-pink-500/20' },
    { value: 'graduation', label: 'Graduation', emoji: '🎓', gradient: 'from-blue-500/20 to-indigo-500/20' },
    { value: 'wedding', label: 'Wedding', emoji: '👰', gradient: 'from-blue-500/20 to-purple-500/20' },
    { value: 'just-because', label: 'Just Because', emoji: '✨', gradient: 'from-yellow-500/20 to-orange-500/20' },
    { value: 'other', label: 'Other', emoji: '🎁', gradient: 'from-gray-500/20 to-gray-400/20' },
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
    setFormErrors(prev => ({ ...prev, [name]: false }));
  };
  
  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({
      ...prev,
      age: value[0]
    }));
    setFormErrors(prev => ({ ...prev, age: false }));
  };
  
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
    
    // Update the selected interests in form data without affecting the textarea
    const updatedInterests = selectedInterests.includes(interest) 
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
      
    // Set the interests field to the joined list of selected interests
    setFormData(prev => ({
      ...prev,
      interests: prev.interests // Keep the text value from the textarea unchanged
    }));
    
    // Clear interest error if any were selected
    if (!selectedInterests.includes(interest)) {
      setFormErrors(prev => ({ ...prev, interests: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const errors: Record<string, boolean> = {};
    if (!formData.relationship) errors.relationship = true;
    if (!formData.budget) errors.budget = true;
    if (!formData.occasion) errors.occasion = true;
    if (selectedInterests.length === 0 && !formData.interests) errors.interests = true;
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Create the combined interests to submit - it includes both selected interests and additional interests from textarea
    const combinedInterests = [
      ...selectedInterests,
      ...(formData.interests ? [formData.interests] : [])
    ].join(', ');
    
    onSubmit({
      ...formData,
      interests: combinedInterests
    });
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
                      Their Age: {formData.age} <RequiredIndicator />
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
                      Your Relationship <RequiredIndicator />
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {relationshipOptions.map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelectChange('relationship', option.value)}
                          className={`p-4 rounded-xl transition-all ${
                            formData.relationship === option.value
                              ? 'bg-gradient-to-r from-primary/20 to-primary/5 ring-2 ring-primary/70 shadow-md'
                              : 'bg-white/50 dark:bg-gray-700/50 hover:bg-white hover:dark:bg-gray-700'
                          } ${formErrors.relationship ? 'border-red-500 dark:border-red-500' : ''}`}
                        >
                          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg mb-2 flex items-center justify-center">
                            <span className="text-3xl">{option.emoji}</span>
                          </div>
                          <span className={`text-sm font-medium block text-center ${
                            formData.relationship === option.value ? 'font-bold' : ''
                          }`}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    {formErrors.relationship && (
                      <p className="text-red-500 text-sm mt-2">Please select your relationship</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-[#e5deff]/50 dark:border-[#8B5CF6]/30 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-[#F5F5F5] to-[#E5DEFF]/30 dark:from-gray-800 dark:to-[#201920] p-4 border-b border-[#e5deff]/30 dark:border-[#8B5CF6]/20">
                  <h3 className="font-serif text-lg font-medium">Their Interests <RequiredIndicator /></h3>
                </div>
                <CardContent className="p-6">
                  <Label className="text-gray-800 dark:text-gray-200 mb-4 block">
                    Select interests that apply <RequiredIndicator />
                  </Label>
                  <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 ${
                    formErrors.interests ? 'border border-red-500 rounded-lg p-2' : ''
                  }`}>
                    {interestOptions.map((interest) => (
                      <button
                        key={interest.value}
                        type="button"
                        onClick={() => toggleInterest(interest.value)}
                        className={`rounded-xl overflow-hidden transition-all ${
                          selectedInterests.includes(interest.value)
                            ? 'ring-2 ring-primary shadow-md'
                            : 'hover:shadow-md'
                        }`}
                      >
                        <div className={`bg-gradient-to-r ${
                          selectedInterests.includes(interest.value)
                            ? 'from-primary/20 to-primary/5'
                            : 'from-gray-100 to-white dark:from-gray-700 dark:to-gray-800'
                        } p-5 flex flex-col items-center justify-center h-full`}>
                          <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full mb-2 shadow-sm">
                            <interest.icon className={`h-6 w-6 ${
                              selectedInterests.includes(interest.value) ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                            }`} />
                          </div>
                          <span className={`text-sm font-medium ${
                            selectedInterests.includes(interest.value) ? 'font-bold text-primary' : ''
                          }`}>{interest.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {formErrors.interests && (
                    <p className="text-red-500 text-sm mb-2">Please select at least one interest or provide details</p>
                  )}
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
                      placeholder="Additional interests, favorite brands, hobbies, or any other relevant details..."
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
                      Budget Range <RequiredIndicator />
                    </Label>
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${
                      formErrors.budget ? 'border border-red-500 rounded-lg p-2' : ''
                    }`}>
                      {[
                        { id: 'under-25', label: 'Under $25', emoji: '💰' },
                        { id: '25-50', label: '$25 - $50', emoji: '💰💰' },
                        { id: '50-100', label: '$50 - $100', emoji: '💰💰💰' },
                        { id: 'over-100', label: 'Over $100', emoji: '💰💰💰💰' },
                      ].map((budget) => (
                        <button
                          key={budget.id}
                          type="button"
                          onClick={() => handleSelectChange('budget', budget.id)}
                          className={`p-3 rounded-xl transition-all ${
                            formData.budget === budget.id
                              ? 'bg-primary/20 border-2 border-primary shadow-md'
                              : 'bg-white/50 dark:bg-gray-700/50 border border-[#e5deff] dark:border-[#8B5CF6]/30'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-xl mb-1">{budget.emoji}</div>
                            <span className={`text-md ${formData.budget === budget.id ? 'font-bold text-primary' : ''}`}>
                              {budget.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                    {formErrors.budget && (
                      <p className="text-red-500 text-sm mt-2">Please select a budget range</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="occasion" className="text-lg font-medium text-gray-800 dark:text-gray-200 font-serif mb-3 block">
                      Occasion <RequiredIndicator />
                    </Label>
                    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ${
                      formErrors.occasion ? 'border border-red-500 rounded-lg p-2' : ''
                    }`}>
                      {occasionOptions.map(occasion => (
                        <button 
                          key={occasion.value}
                          type="button"
                          onClick={() => handleSelectChange('occasion', occasion.value)}
                          className={`rounded-xl overflow-hidden transition-all ${
                            formData.occasion === occasion.value
                              ? 'ring-2 ring-primary shadow-md'
                              : 'hover:shadow-md'
                          }`}
                        >
                          <div className={`bg-gradient-to-r ${occasion.gradient} p-5 flex flex-col items-center justify-center h-full`}>
                            <div className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-full mb-2 shadow-sm">
                              <span className="text-2xl">{occasion.emoji}</span>
                            </div>
                            <div className={`text-sm font-medium ${
                              formData.occasion === occasion.value ? 'font-bold text-primary' : ''
                            }`}>
                              {occasion.label}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    {formErrors.occasion && (
                      <p className="text-red-500 text-sm mt-2">Please select an occasion</p>
                    )}
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
                    Find the perfect gift
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
