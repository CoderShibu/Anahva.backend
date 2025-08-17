import React, { useState } from 'react';
import Header from '@/components/Header';
import { Shield, Users, Globe, Zap, Heart } from 'lucide-react';

const About = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Real-Time Monitoring",
      description: "24/7 surveillance of transportation systems with instant alert capabilities."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Reporting",
      description: "Empowering citizens to report emergencies directly to response teams."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Coverage",
      description: "Comprehensive monitoring across air, rail, and road transportation."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Rapid Response",
      description: "AI-powered incident classification for faster emergency response."
    }
  ];

  const team = [
    { name: "Dr. Sarah Chen", role: "Emergency Response Specialist", expertise: "Crisis Management" },
    { name: "Michael Rodriguez", role: "Transportation Safety Engineer", expertise: "System Integration" },
    { name: "Emma Thompson", role: "Data Analytics Lead", expertise: "Predictive Modeling" },
    { name: "David Kim", role: "Technology Director", expertise: "Platform Architecture" }
  ];

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            About SafeNet360
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're dedicated to revolutionizing emergency response through cutting-edge technology, 
            real-time monitoring, and community-driven reporting systems.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="emergency-card p-8 mb-12">
          <div className="flex items-center mb-6">
            <Heart className="h-6 w-6 mr-3 text-red-500" />
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            SafeNet360 exists to save lives by providing the fastest, most accurate emergency 
            response system for transportation incidents. We believe that every second counts 
            in an emergency, and our platform ensures that help reaches those who need it 
            when they need it most.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="emergency-card p-6 text-center">
                <div className="gradient-info text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="emergency-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Impact by Numbers</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50,000+</div>
              <p className="text-gray-600 dark:text-gray-400">Emergency Reports</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">3.2 min</div>
              <p className="text-gray-600 dark:text-gray-400">Average Response Time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">Monitoring Coverage</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98.5%</div>
              <p className="text-gray-600 dark:text-gray-400">System Uptime</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Expert Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Updated to show only the requested names */}
            <div className="emergency-card p-6 text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Shibasish Banerjee</h3>
            </div>
            <div className="emergency-card p-6 text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Limnisha Changkakati</h3>
            </div>
            <div className="emergency-card p-6 text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Sanjana T G</h3>
            </div>
            <div className="emergency-card p-6 text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold">Spandana S</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
