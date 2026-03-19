import React from 'react';
import { ShoppingCart, Search, Menu, CreditCard, User, LogOut, FileText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onLoginClick: () => void;
  onExchangeRatesClick: () => void;
  onSubmissionsClick: () => void;
}

export default function Header({
  cartCount,
  searchTerm,
  onSearchChange,
  onLoginClick,
  onExchangeRatesClick,
  onSubmissionsClick
}: HeaderProps) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">CardVault</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-green-400 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-300 hover:text-green-400 font-medium transition-colors">Darkweb</a>
              <button 
                onClick={onExchangeRatesClick}
                className="text-gray-300 hover:text-green-400 font-medium transition-colors"
              >
                Exchange Rates
              </button>
              <a href="#" className="text-gray-300 hover:text-green-400 font-medium transition-colors">Support</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="relative p-2 text-gray-300 hover:text-green-400 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login/User Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">{user.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={onSubmissionsClick}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
                  title="View submissions"
                >
                  <FileText className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors border border-green-500"
              >
                Login
              </button>
            )}
            
            <button className="md:hidden p-2 text-gray-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}