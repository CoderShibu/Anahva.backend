import React from 'react';
import { Shield, AlertCircle, Phone, Users } from 'lucide-react';

const SafetyTips = () => {
  const tips = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Stay Calm",
      description: "Keep a clear head and assess your surroundings before taking action."
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call for Help",
      description: "Dial 100 for Police, 102 for Ambulance, 101 for Fire in India. Use this platform for incident reporting."
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Help Others",
      description: "Assist others if safe to do so, but prioritize your own safety first."
    },
    {
      icon: <AlertCircle className="h-5 w-5" />,
      title: "Stay Informed",
      description: "Follow official government advisories and avoid spreading unverified information."
    }
  ];

  return (
    <div className="emergency-card p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-green-500" />
        Emergency Safety Tips (India)
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="text-blue-500 mt-1">
              {tip.icon}
            </div>
            <div>
              <h4 className="font-medium text-sm">{tip.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 gradient-info rounded-lg text-white">
        <p className="text-sm">
          <strong>Remember:</strong> Your safety is the top priority. Always remove yourself from danger before attempting to help others or document incidents.
        </p>
      </div>
    </div>
  );
};

export default SafetyTips;
