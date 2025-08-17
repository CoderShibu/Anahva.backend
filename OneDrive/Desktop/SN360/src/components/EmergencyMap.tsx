import React, { useState } from 'react';
import { MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Incident {
  id: string;
  type: 'plane' | 'train' | 'bus';
  location: string;
  status: 'active' | 'resolved' | 'investigating';
  severity: 'high' | 'medium' | 'low';
  time: string;
  coordinates: [number, number];
}

const EmergencyMap = () => {
  const [incidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'plane',
      location: 'Indira Gandhi International Airport, Delhi',
      status: 'active',
      severity: 'high',
      time: '10 min ago',
      coordinates: [28.5562, 77.1000]
    },
    {
      id: '2',
      type: 'train',
      location: 'Chhatrapati Shivaji Maharaj Terminus, Mumbai',
      status: 'investigating',
      severity: 'medium',
      time: '25 min ago',
      coordinates: [18.9402, 72.8356]
    },
    {
      id: '3',
      type: 'bus',
      location: 'Howrah Bridge, Kolkata',
      status: 'resolved',
      severity: 'low',
      time: '1 hour ago',
      coordinates: [22.5850, 88.3468]
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string, severity: string) => {
    if (status === 'active' && severity === 'high') return 'gradient-alert';
    if (status === 'resolved') return 'gradient-safe';
    return 'gradient-info';
  };

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <div className="emergency-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-500" />
          Live Emergency Map
        </h3>
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">Interactive Map Coming Soon</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">Real-time incident tracking</p>
          </div>
          
          {/* Simulated incident markers */}
          <div className="absolute top-4 left-8 w-3 h-3 bg-red-500 rounded-full pulse-animation"></div>
          <div className="absolute bottom-8 right-12 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-8 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Active Incidents List */}
      <div className="emergency-card p-6">
        <h3 className="text-lg font-semibold mb-4">Active Incidents</h3>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className={`p-4 rounded-lg text-white ${getStatusColor(incident.status, incident.severity)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(incident.status)}
                  <div>
                    <p className="font-medium capitalize">
                      {incident.type} Emergency - {incident.location}
                    </p>
                    <p className="text-sm opacity-90">{incident.time}</p>
                  </div>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize">
                  {incident.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyMap;
