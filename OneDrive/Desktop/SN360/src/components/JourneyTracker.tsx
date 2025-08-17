
import React, { useState } from 'react';
import { Search, Plane, Train, Bus, AlertTriangle, CheckCircle, Clock, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const JourneyTracker = () => {
  const [journeyInput, setJourneyInput] = useState('');
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  const mockJourneyData = {
    'AI171': {
      type: 'flight',
      route: 'Delhi (DEL) → Mumbai (BOM)',
      status: 'On Time',
      riskLevel: 'low',
      departure: '14:30',
      arrival: '16:45',
      incidents: [
        { date: '2024-01-15', type: 'Delay', reason: 'Weather conditions', severity: 'minor' },
        { date: '2024-01-10', type: 'Technical', reason: 'Minor maintenance', severity: 'minor' }
      ],
      weather: 'Clear skies expected throughout journey',
      safetyTips: [
        'Arrive at airport 2 hours early for domestic flights',
        'Keep essential documents handy',
        'Follow cabin crew instructions during turbulence'
      ]
    },
    '12841': {
      type: 'train',
      route: 'New Delhi → Chennai Central',
      status: 'Delayed by 45 min',
      riskLevel: 'moderate',
      departure: '16:55',
      arrival: '09:30+1',
      incidents: [
        { date: '2024-01-18', type: 'Signal', reason: 'Signal failure near Vijayawada', severity: 'moderate' },
        { date: '2024-01-12', type: 'Weather', reason: 'Heavy fog causing delays', severity: 'minor' }
      ],
      weather: 'Rain likely near Vijayawada – delays expected',
      safetyTips: [
        'Keep emergency contact numbers saved',
        'Stay hydrated during long journey',
        'Be cautious while boarding and alighting'
      ]
    },
    'DTC001': {
      type: 'bus',
      route: 'Connaught Place → IGI Airport',
      status: 'On Time',
      riskLevel: 'low',
      departure: '08:00',
      arrival: '09:15',
      incidents: [
        { date: '2024-01-16', type: 'Traffic', reason: 'Heavy traffic on Ring Road', severity: 'minor' }
      ],
      weather: 'Clear roads, normal traffic expected',
      safetyTips: [
        'Keep ticket and ID ready',
        'Secure your belongings',
        'Use seat belts where available'
      ]
    }
  };

  const handleSearch = async () => {
    if (!journeyInput.trim()) return;
    
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const data = mockJourneyData[journeyInput.toUpperCase()];
      setJourneyData(data || null);
      setLoading(false);
    }, 1000);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    if (status.includes('On Time')) return 'text-green-600 dark:text-green-400';
    if (status.includes('Delayed')) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      default: return <Search className="h-5 w-5" />;
    }
  };

  return (
    <div className="emergency-card p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Search className="h-5 w-5 mr-2 text-blue-500" />
        Check My Journey
      </h3>
      
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter flight (AI171), train (12841), or bus number (DTC001)"
          value={journeyInput}
          onChange={(e) => setJourneyInput(e.target.value)}
          className="flex-1"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {journeyData && (
        <div className="space-y-4">
          {/* Journey Header */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getTransportIcon(journeyData.type)}
              <div>
                <h4 className="font-medium">{journeyInput.toUpperCase()}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{journeyData.route}</p>
              </div>
            </div>
            <Badge className={getRiskColor(journeyData.riskLevel)}>
              {journeyData.riskLevel.charAt(0).toUpperCase() + journeyData.riskLevel.slice(1)} Risk
            </Badge>
          </div>

          {/* Status & Timing */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Current Status
              </h5>
              <p className={`font-medium ${getStatusColor(journeyData.status)}`}>
                {journeyData.status}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Departure: {journeyData.departure} | Arrival: {journeyData.arrival}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h5 className="font-medium mb-2 flex items-center">
                <Cloud className="h-4 w-4 mr-2" />
                Weather Impact
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {journeyData.weather}
              </p>
            </div>
          </div>

          {/* Past Incidents */}
          <div className="p-4 border rounded-lg">
            <h5 className="font-medium mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Recent Incidents ({journeyData.incidents.length})
            </h5>
            <div className="space-y-2">
              {journeyData.incidents.map((incident, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/30 rounded">
                  <div>
                    <span className="text-sm font-medium">{incident.date}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      {incident.type}: {incident.reason}
                    </span>
                  </div>
                  <Badge variant={incident.severity === 'minor' ? 'secondary' : 'destructive'}>
                    {incident.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="p-4 gradient-info rounded-lg text-white">
            <h5 className="font-medium mb-2">Safety Tips for Your Journey</h5>
            <ul className="text-sm space-y-1">
              {journeyData.safetyTips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {journeyInput && !journeyData && !loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <AlertTriangle className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Journey not found. Try: AI171, 12841, or DTC001</p>
          <p className="text-sm mt-1">More routes will be available soon!</p>
        </div>
      )}

      {!journeyInput && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p className="text-sm">Enter your journey details to track status and safety information</p>
        </div>
      )}
    </div>
  );
};

export default JourneyTracker;
