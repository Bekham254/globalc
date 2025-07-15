import React from 'react';
import { ShoppingCart, Search, Menu, CreditCard, User, LogOut } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isLoggedIn: boolean;
  user: { email: string; name: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Header({ 
  cartCount, 
  searchTerm, 
  onSearchChange, 
  isLoggedIn, 
  user, 
  onLoginClick, 
  onLogout 
}: HeaderProps) {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-8 h-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-800">CardVault</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Premium Cards</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Business</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">Support</a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login/User Section */}
            {isLoggedIn && user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            )}
            
            <button className="md:hidden p-2 text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}