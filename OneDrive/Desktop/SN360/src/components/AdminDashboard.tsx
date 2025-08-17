import React, { useState } from 'react';
import { BarChart3, Users, MapPin, Clock, Filter, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Incident {
  id: string;
  type: string;
  location: string;
  status: 'new' | 'ongoing' | 'closed';
  severity: 'high' | 'medium' | 'low';
  time: string;
  assignedTo?: string;
}

const AdminDashboard = () => {
  const [filter, setFilter] = useState('all');
  const [incidents] = useState<Incident[]>([
    {
      id: '001',
      type: 'Aircraft Emergency',
      location: 'Indira Gandhi International Airport, Delhi',
      status: 'ongoing',
      severity: 'high',
      time: '10 min ago',
      assignedTo: 'Team Alpha'
    },
    {
      id: '002',
      type: 'Train Delay',
      location: 'Chhatrapati Shivaji Maharaj Terminus, Mumbai',
      status: 'new',
      severity: 'medium',
      time: '25 min ago'
    },
    {
      id: '003',
      type: 'Bus Breakdown',
      location: 'Howrah Bridge, Kolkata',
      status: 'closed',
      severity: 'low',
      time: '1 hour ago',
      assignedTo: 'Team Beta'
    }
  ]);

  const stats = [
    { label: 'Total Reports', value: '247', icon: <BarChart3 className="h-5 w-5" />, color: 'gradient-info' },
    { label: 'Active Incidents', value: '12', icon: <AlertTriangle className="h-5 w-5" />, color: 'gradient-alert' },
    { label: 'High Risk Zones', value: '8', icon: <MapPin className="h-5 w-5" />, color: 'gradient-alert' },
    { label: 'Avg Response Time', value: '4.2 min', icon: <Clock className="h-5 w-5" />, color: 'gradient-safe' }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      ongoing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      closed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    };
    return variants[status as keyof typeof variants] || variants.new;
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };
    return variants[severity as keyof typeof variants] || variants.medium;
  };

  const filteredIncidents = incidents.filter(incident => 
    filter === 'all' || incident.status === filter
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-lg p-4 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="opacity-80">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Heatmap Placeholder */}
      <div className="emergency-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-red-500" />
          Risk Heatmap
        </h3>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-48 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">ML-powered risk analysis coming soon</p>
          </div>
        </div>
      </div>

      {/* Incident Management */}
      <div className="emergency-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            Incident Management
          </h3>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredIncidents.map((incident) => (
            <div key={incident.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-sm text-gray-500">#{incident.id}</span>
                  <div>
                    <p className="font-medium">{incident.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{incident.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getSeverityBadge(incident.severity)}>
                    {incident.severity}
                  </Badge>
                  <Badge className={getStatusBadge(incident.status)}>
                    {incident.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{incident.time}</span>
                </div>
              </div>
              
              {incident.assignedTo && (
                <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  Assigned to: {incident.assignedTo}
                </div>
              )}
              
              <div className="mt-3 flex space-x-2">
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="outline">Assign Team</Button>
                <Button size="sm" variant="outline">Update Status</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Deployment */}
      <div className="emergency-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Resource Deployment
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Emergency Teams</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">8 teams available</p>
            <Button size="sm" className="w-full">Deploy Team</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Medical Units</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">12 units on standby</p>
            <Button size="sm" className="w-full">Dispatch Unit</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Support Equipment</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Equipment ready</p>
            <Button size="sm" className="w-full">Request Equipment</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
