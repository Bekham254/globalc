import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CreditCard from './components/CreditCard'; 
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ExchangeRatesModal from './components/ExchangeRatesModal';
import { useCards } from './hooks/useCards';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cartCount, setCartCount] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isExchangeRatesModalOpen, setIsExchangeRatesModalOpen] = useState(false);

  const { cards: filteredAndSortedCards, loading } = useCards(searchTerm, selectedCountry, sortBy);
  const { user } = useAuth();

  const handleAddToCart = (cardId: number) => {
    setCartCount(prev => prev + 1);
    // In a real app, you'd add the card to a cart state
    console.log(`Added card ${cardId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartCount}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onExchangeRatesClick={() => setIsExchangeRatesModalOpen(true)}
      />
      
      <Hero />
      
      <FilterBar 
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Available Darkweb Cards, PayPal Transfers & Gift Cards (85)
          </h2>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">Loading cards...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCards.map(card => (
              <CreditCard
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                price={card.price}
                balance={card.balance}
                cardType={card.card_type as any}
                cardColor={card.card_color}
                rating={card.rating}
                country={card.country as any}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
        
        {filteredAndSortedCards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">No cards found</div>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
      
      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      
      <ExchangeRatesModal 
        isOpen={isExchangeRatesModalOpen}
        onClose={() => setIsExchangeRatesModalOpen(false)}
      />
    </div>
  );
}