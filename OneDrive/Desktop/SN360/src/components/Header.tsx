import React, { useState } from 'react';
import { Bell, Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ darkMode, toggleDarkMode }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="emergency-card sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-600 bg-clip-text text-transparent">
              SafeNet360
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</a>
            <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="/faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="relative p-2" onClick={() => {
              if (window.Notification && Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                  if (permission === "granted") {
                    new Notification("SafeNet360", { body: "Notifications enabled!" });
                  } else {
                    alert("Notifications are blocked in your browser.");
                  }
                });
              } else {
                alert("Notifications are not supported or are blocked in your browser.");
              }
            }}>
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </Button>


            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
              <a href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</a>
              <a href="/about" className="hover:text-blue-600 transition-colors">About</a>
              <a href="/faq" className="hover:text-blue-600 transition-colors">FAQ</a>

            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
