import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CreditCard from './components/CreditCard';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';

interface User {
  email: string;
  name: string;
}

interface CardData {
  id: number;
  title: string;
  description: string;
  price: number;
  balance: number;
  cardType: 'visa' | 'mastercard' | 'amex' | 'paypal' | 'unionpay' | 'discover' | 'amex-gift';
  cardColor: string;
  rating: number;
  country: 'uk' | 'us' | 'germany' | 'italy' | 'canada' | 'australia';
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [cartCount, setCartCount] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Generate cards data
  const cardsData = useMemo(() => {
    const cards: CardData[] = [];
    let id = 1;

    // Card types distribution
    const cardTypes = [
      { type: 'visa' as const, count: 15 },
      { type: 'mastercard' as const, count: 15 },
      { type: 'amex' as const, count: 10 },
      { type: 'unionpay' as const, count: 8 },
      { type: 'discover' as const, count: 7 },
      { type: 'paypal' as const, count: 10 }, // PayPal transfers
      { type: 'amex-gift' as const, count: 10 } // AMEX Gift Cards
    ];

    const countries: Array<'uk' | 'us' | 'germany' | 'italy' | 'canada' | 'australia'> = 
      ['uk', 'us', 'germany', 'italy', 'canada', 'australia'];

    const cardColors = [
      'bg-gradient-to-br from-blue-600 to-blue-800',
      'bg-gradient-to-br from-purple-600 to-purple-800',
      'bg-gradient-to-br from-green-600 to-green-800',
      'bg-gradient-to-br from-red-600 to-red-800',
      'bg-gradient-to-br from-indigo-600 to-indigo-800',
      'bg-gradient-to-br from-pink-600 to-pink-800',
      'bg-gradient-to-br from-yellow-600 to-yellow-800',
      'bg-gradient-to-br from-teal-600 to-teal-800'
    ];

    cardTypes.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        const country = type === 'paypal' ? 'us' : countries[Math.floor(Math.random() * countries.length)];
        const isPayPal = type === 'paypal';
        const isAmexGift = type === 'amex-gift';
        
        // Different balance ranges for PayPal vs cards
        const balance = isPayPal 
          ? Math.floor(Math.random() * (2500 - 500) + 500) // $500-$2500 for PayPal
          : isAmexGift
          ? Math.floor(Math.random() * (3000 - 1000) + 1000) // $1000-$3000 for AMEX Gift Cards
          : Math.floor(Math.random() * (15000 - 1000) + 1000); // $1000-$15000 for cards
        
        // Minimum price is $34
        const basePrice = Math.max(34, Math.floor(balance * (0.02 + Math.random() * 0.08)));
        
        cards.push({
          id: id++,
          title: isPayPal 
            ? `PayPal Transfer $${balance}`
            : isAmexGift
            ? `AMEX Gift Card $${balance}`
            : `${type.charAt(0).toUpperCase() + type.slice(1)} ${country.toUpperCase()} Card`,
          description: isPayPal
            ? `Verified PayPal account with $${balance.toLocaleString()} transfer limit. Instant access after payment confirmation.`
            : isAmexGift
            ? `American Express gift card with $${balance.toLocaleString()} balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.`
            : `Premium ${type} credit card from ${country.toUpperCase()} with $${balance.toLocaleString()} balance. High approval rate and instant delivery.`,
          price: basePrice,
          balance,
          cardType: type,
          cardColor: cardColors[Math.floor(Math.random() * cardColors.length)],
          rating: Math.round((4.0 + Math.random() * 1.0) * 10) / 10,
          country
        });
      }
    });

    return cards.sort(() => Math.random() - 0.5); // Shuffle the cards
  }, []);

  // Filter and sort cards
  const filteredAndSortedCards = useMemo(() => {
    let filtered = cardsData.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || 
                            card.country === selectedCountry ||
                            (selectedCountry === 'us' && card.cardType === 'paypal'); // PayPal shows in US filter
      return matchesSearch && matchesCountry;
    });

    // Sort cards
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'balance':
          return b.balance - a.balance;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [cardsData, searchTerm, selectedCountry, sortBy]);

  const handleAddToCart = (cardId: number) => {
    setCartCount(prev => prev + 1);
    // In a real app, you'd add the card to a cart state
    console.log(`Added card ${cardId} to cart`);
  };

  const handleLogin = (email: string, password: string): boolean => {
    // Extract name from email (simple approach for demo)
    const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    
    setUser({ email, name });
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    return true;
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCartCount(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartCount}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
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
            Available Cards, PayPal Transfers & Gift Cards ({filteredAndSortedCards.length})
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCards.map(card => (
            <CreditCard
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              price={card.price}
              balance={card.balance}
              cardType={card.cardType}
              cardColor={card.cardColor}
              rating={card.rating}
              country={card.country}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
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
        onLogin={handleLogin}
      />
    </div>
  );
}