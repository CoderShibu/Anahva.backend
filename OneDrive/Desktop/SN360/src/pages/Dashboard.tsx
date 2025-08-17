
import React, { useState } from 'react';
import Header from '@/components/Header';
import AdminDashboard from '@/components/AdminDashboard';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Emergency Command Center</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time incident monitoring and response coordination
          </p>
        </div>
        <AdminDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
