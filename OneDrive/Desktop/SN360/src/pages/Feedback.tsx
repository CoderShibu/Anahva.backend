
import React, { useState } from 'react';
import Header from '@/components/Header';
import { MessageSquare, Send, Star, ThumbsUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const Feedback = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    category: '',
    rating: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it and get back to you if needed.",
      variant: "default",
    });

    // Reset form
    setFeedback({
      name: '',
      email: '',
      category: '',
      rating: '',
      subject: '',
      message: ''
    });
  };

  const categories = [
    { value: 'bug', label: 'Bug Report', icon: <AlertCircle className="h-4 w-4" /> },
    { value: 'feature', label: 'Feature Request', icon: <Star className="h-4 w-4" /> },
    { value: 'improvement', label: 'Improvement Suggestion', icon: <ThumbsUp className="h-4 w-4" /> },
    { value: 'general', label: 'General Feedback', icon: <MessageSquare className="h-4 w-4" /> },
    { value: 'emergency', label: 'Emergency Response Feedback', icon: <AlertCircle className="h-4 w-4" /> }
  ];

  const ratings = [
    { value: '5', label: '5 - Excellent' },
    { value: '4', label: '4 - Good' },
    { value: '3', label: '3 - Average' },
    { value: '2', label: '2 - Poor' },
    { value: '1', label: '1 - Very Poor' }
  ];

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Your Feedback Matters
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Help us improve SafeNet360 and save more lives
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feedback Form */}
            <div className="lg:col-span-2">
              <div className="emergency-card p-6">
                <div className="flex items-center mb-6">
                  <MessageSquare className="h-6 w-6 mr-3 text-blue-500" />
                  <h2 className="text-2xl font-bold">Submit Feedback</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input
                        placeholder="Your full name"
                        value={feedback.name}
                        onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={feedback.email}
                        onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  {/* Category and Rating */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Feedback Category</label>
                      <Select value={feedback.category} onValueChange={(value) => setFeedback({...feedback, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center">
                                {category.icon}
                                <span className="ml-2">{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Overall Rating</label>
                      <Select value={feedback.rating} onValueChange={(value) => setFeedback({...feedback, rating: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your experience" />
                        </SelectTrigger>
                        <SelectContent>
                          {ratings.map((rating) => (
                            <SelectItem key={rating.value} value={rating.value}>
                              {rating.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="Brief description of your feedback"
                      value={feedback.subject}
                      onChange={(e) => setFeedback({...feedback, subject: e.target.value})}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Detailed Feedback</label>
                    <Textarea
                      placeholder="Please provide detailed feedback, suggestions, or describe any issues you've encountered..."
                      value={feedback.message}
                      onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-info text-white font-medium">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Feedback Guidelines */}
              <div className="emergency-card p-6">
                <h3 className="text-lg font-semibold mb-4">Feedback Guidelines</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <p>Be specific about issues or suggestions</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p>Include steps to reproduce bugs</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <p>Suggest improvements constructively</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p>Report emergency response issues immediately</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="emergency-card p-6">
                <h3 className="text-lg font-semibold mb-4">Response Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bug Reports</span>
                    <span className="text-sm font-medium text-red-500">24-48 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Feature Requests</span>
                    <span className="text-sm font-medium text-blue-500">1-2 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">General Feedback</span>
                    <span className="text-sm font-medium text-green-500">3-5 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Issues</span>
                    <span className="text-sm font-medium text-red-600">Immediate</span>
                  </div>
                </div>
              </div>

              {/* Contact Alternative */}
              <div className="emergency-card p-6 gradient-safe text-white">
                <h3 className="font-semibold mb-2">Urgent Issues?</h3>
                <p className="text-sm mb-3">
                  For critical bugs affecting emergency response, contact us immediately:
                </p>
                <p className="text-sm font-mono">emergency@safenet360.org</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
