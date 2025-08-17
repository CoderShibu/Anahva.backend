
import React, { useState } from 'react';
import Header from '@/components/Header';
import EmergencyCallButtons from '@/components/EmergencyCallButtons';
import JourneyTracker from '@/components/JourneyTracker';
import EmergencyMap from '@/components/EmergencyMap';
import EmergencyForm from '@/components/EmergencyForm';
import SafetyTips from '@/components/SafetyTips';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-blue-600 to-green-500 bg-clip-text text-transparent">
            SafeNet360
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Life-Saving Emergency Monitoring Platform
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Real-time transportation emergency tracking and response coordination
          </p>
        </div>

        {/* Emergency Call Buttons - Quick Access */}
        <EmergencyCallButtons />

        {/* Journey Tracker */}
        <JourneyTracker />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Map and Safety Tips */}
          <div className="space-y-8">
            <EmergencyMap />
            <SafetyTips />
          </div>

          {/* Right Column - Emergency Form */}
          <div>
            <EmergencyForm />
          </div>
        </div>

        {/* Emergency Contact Info */}
        <div className="mt-12 emergency-card p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Emergency Contacts</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div>
              <span className="font-medium">Police:</span>
              <span className="ml-2 text-red-600 dark:text-red-400 font-bold">100</span>
            </div>
            <div>
              <span className="font-medium">Fire:</span>
              <span className="ml-2 text-red-600 dark:text-red-400 font-bold">101</span>
            </div>
            <div>
              <span className="font-medium">Ambulance:</span>
              <span className="ml-2 text-red-600 dark:text-red-400 font-bold">102</span>
            </div>
            <div>
              <span className="font-medium">Women Helpline:</span>
              <span className="ml-2 text-blue-600 dark:text-blue-400">1091</span>
            </div>
            <div>
              <span className="font-medium">Disaster Relief:</span>
              <span className="ml-2 text-green-600 dark:text-green-400">1070</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
