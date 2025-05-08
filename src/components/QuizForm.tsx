
import React, { useState } from 'react';
import { GiftFormData } from '../types/gift';
import { 
  ArrowRight, Camera, Music, Book, 
  Utensils, Plane, Code, Lightbulb, 
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
  color: string;
}

interface RelationshipOption {
  value: string;
  label: string;
  emoji: string;
  color: string;
}

interface OccasionOption {
  value: string;
  label: string;
  emoji: string;
  color: string;
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

  // Pre-defined interest options with icons - added Creative and Gaming options
  const interestOptions: InterestOption[] = [
    { value: 'photography', label: 'Photography', icon: Camera, color: 'bg-blue-100 dark:bg-blue-900' },
    { value: 'music', label: 'Music', icon: Music, color: 'bg-purple-100 dark:bg-purple-900' },
    { value: 'reading', label: 'Reading', icon: Book, color: 'bg-yellow-100 dark:bg-yellow-900' },
    { value: 'cooking', label: 'Cooking', icon: Utensils, color: 'bg-red-100 dark:bg-red-900' },
    { value: 'travel', label: 'Travel', icon: Plane, color: 'bg-green-100 dark:bg-green-900' },
    { value: 'tech', label: 'Technology', icon: Code, color: 'bg-gray-100 dark:bg-gray-800' },
    { value: 'creative', label: 'Creative', icon: Palette, color: 'bg-pink-100 dark:bg-pink-900' },
    { value: 'gaming', label: 'Gaming', icon: Gamepad, color: 'bg-indigo-100 dark:bg-indigo-900' },
  ];
  
  // Relationship options with emojis and colors
  const relationshipOptions: RelationshipOption[] = [
    { value: 'friend', label: 'Friend', emoji: '👯', color: 'bg-blue-100 dark:bg-blue-800' },
    { value: 'partner', label: 'Partner/Spouse', emoji: '💑', color: 'bg-pink-100 dark:bg-pink-800' },
    { value: 'parent', label: 'Parent', emoji: '👪', color: 'bg-green-100 dark:bg-green-800' },
    { value: 'child', label: 'Child', emoji: '👶', color: 'bg-yellow-100 dark:bg-yellow-800' },
    { value: 'sibling', label: 'Sibling', emoji: '👨‍👩‍👧‍👦', color: 'bg-purple-100 dark:bg-purple-800' },
    { value: 'coworker', label: 'Coworker', emoji: '👨‍💼', color: 'bg-gray-100 dark:bg-gray-700' },
    { value: 'other', label: 'Other', emoji: '🤝', color: 'bg-orange-100 dark:bg-orange-800' },
  ];
  
  // Occasion options with emojis and colors
  const occasionOptions: OccasionOption[] = [
    { value: 'birthday', label: 'Birthday', emoji: '🎂', color: 'from-pink-500/20 to-orange-500/20' },
    { value: 'christmas', label: 'Christmas', emoji: '🎄', color: 'from-green-500/20 to-red-500/20' },
    { value: 'anniversary', label: 'Anniversary', emoji: '💍', color: 'from-purple-500/20 to-pink-500/20' },
    { value: 'valentines', label: 'Valentine\'s Day', emoji: '❤️', color: 'from-red-500/20 to-pink-500/20' },
    { value: 'graduation', label: 'Graduation', emoji: '🎓', color: 'from-blue-500/20 to-indigo-500/20' },
    { value: 'wedding', label: 'Wedding', emoji: '👰', color: 'from-blue-500/20 to-purple-500/20' },
    { value: 'just-because', label: 'Just Because', emoji: '✨', color: 'from-yellow-500/20 to-orange-500/20' },
    { value: 'other', label: 'Other', emoji: '🎁', color: 'from-gray-500/20 to-gray-400/20' },
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
    
    // Update interests in form data - but don't add to the textarea
    // Only store the selected interests ids in the formData
    const updatedInterests = selectedInterests.includes(interest) 
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
      
    setFormData(prev => ({
      ...prev,
      interests: updatedInterests.join(', ')
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
    if (!formData.interests && selectedInterests.length === 0) errors.interests = true;
    if (!formData.budget) errors.budget = true;
    if (!formData.occasion) errors.occasion = true;
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    onSubmit({
      ...formData,
      // For the textarea interests, we'll only use what's in the textArea as additional interests
      interests: [...selectedInterests, formData.interests].filter(Boolean).join(', ')
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
                          className={`p-4 rounded-xl transition-all flex flex-col items-center ${
                            formData.relationship === option.value
                              ? `${option.color} ring-2 ring-primary/70 shadow-md`
                              : 'bg-white/50 dark:bg-gray-700/50 hover:bg-white hover:dark:bg-gray-700'
                          } ${formErrors.relationship && 'border-red-500 dark:border-red-500'}`}
                        >
                          <span className="text-3xl mb-2">{option.emoji}</span>
                          <span className={`text-sm font-medium ${
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
                  {formErrors.interests && (
                    <p className="text-red-500 text-sm mb-2">Please select at least one interest</p>
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
                          <div className={`bg-gradient-to-r ${occasion.color} p-5 flex flex-col items-center justify-center h-full`}>
                            <div className="text-3xl mb-2">{occasion.emoji}</div>
                            <div className={`text-sm font-medium ${
                              formData.occasion === occasion.value ? 'font-bold' : ''
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
                    🔍 Find the perfect gift
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
