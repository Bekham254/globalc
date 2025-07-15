import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({ selectedCountry, onCountryChange, sortBy, onSortChange }: FilterBarProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700 font-medium">Filter by:</span>
            
            <select 
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Countries</option>
              <option value="us">🇺🇸 United States</option>
              <option value="uk">🇬🇧 United Kingdom</option>
              <option value="germany">🇩🇪 Germany</option>
              <option value="italy">🇮🇹 Italy</option>
              <option value="canada">🇨🇦 Canada</option>
              <option value="australia">🇦🇺 Australia</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="balance">Balance: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}