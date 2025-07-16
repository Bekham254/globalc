import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CreditCard from './components/CreditCard';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ScreenshotUpload from './components/ScreenshotUpload';

interface CardData {
  id: number;
  title: string;
  description: string;
  price: number;
  balance: number;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'unionpay';
  cardColor: string;
  rating: number;
  country: 'uk' | 'us' | 'germany' | 'italy' | 'canada' | 'australia';
}

const generateCardData = (): CardData[] => {
  // Adjusted distribution: More Visa/MasterCard, fewer Amex/UnionPay
  const cardTypes: Array<'visa' | 'mastercard' | 'amex' | 'discover' | 'unionpay' | 'paypal'> = [
    ...Array(25).fill('visa'),
    ...Array(25).fill('mastercard'),
    ...Array(8).fill('discover'),
    ...Array(4).fill('amex'),
    ...Array(3).fill('unionpay'),
    ...Array(5).fill('paypal')
  ];
  
  const countries: Array<'uk' | 'us' | 'germany' | 'italy' | 'canada' | 'australia'> = ['uk', 'us', 'germany', 'italy', 'canada', 'australia'];
  const cardColors = [
    'bg-gradient-to-br from-gray-800 to-gray-900',
    'bg-gradient-to-br from-blue-800 to-blue-900',
    'bg-gradient-to-br from-purple-800 to-purple-900',
    'bg-gradient-to-br from-green-800 to-green-900',
    'bg-gradient-to-br from-red-800 to-red-900',
    'bg-gradient-to-br from-indigo-800 to-indigo-900',
    'bg-gradient-to-br from-pink-800 to-pink-900',
    'bg-gradient-to-br from-yellow-600 to-yellow-700',
    'bg-gradient-to-br from-teal-800 to-teal-900',
    'bg-gradient-to-br from-orange-800 to-orange-900',
    'bg-gradient-to-br from-cyan-800 to-cyan-900',
    'bg-gradient-to-br from-emerald-800 to-emerald-900',
    'bg-gradient-to-br from-violet-800 to-violet-900',
    'bg-gradient-to-br from-rose-800 to-rose-900',
    'bg-gradient-to-br from-slate-800 to-slate-900'
  ];

  const countryNames = {
    uk: 'United Kingdom',
    us: 'United States',
    germany: 'Germany',
    italy: 'Italy',
    canada: 'Canada',
    australia: 'Australia'
  };

  const cardTypeNames = {
    visa: 'Visa',
    mastercard: 'MasterCard',
    amex: 'American Express',
    paypal: 'PayPal Transfer',
    unionpay: 'UnionPay'
  };

  const cards: CardData[] = [];

  for (let i = 1; i <= 65; i++) {
    const cardType = cardTypes[i - 1] || cardTypes[Math.floor(Math.random() * cardTypes.length)];
    const country = cardType === 'paypal' ? 'us' : countries[Math.floor(Math.random() * countries.length)];
    const cardColor = cardColors[Math.floor(Math.random() * cardColors.length)];
    const balance = cardType === 'paypal' 
      ? Math.floor(Math.random() * 2000) + 340 // 340-2340 for PayPal
      : Math.floor(Math.random() * 8000) + 380; // 380-8380 for cards
    const price = cardType === 'paypal' 
      ? Math.max(34, Math.round(balance * 0.10)) // 10% of balance for PayPal, minimum $34
      : Math.max(34, Math.round(balance * 0.08)); // 8% of balance for others, minimum $34
    const rating = Math.round((Math.random() * 1.5 + 3.5) * 10) / 10; // 3.5-5.0

    cards.push({
      id: i,
      title: cardType === 'paypal' 
        ? `${cardTypeNames[cardType]} Account`
        : `${cardTypeNames[cardType]} ${countryNames[country]} Card`,
      description: cardType === 'paypal'
        ? `Verified ${cardTypeNames[cardType]} account with high transaction limits and instant transfer capabilities.`
        : `Premium ${cardTypeNames[cardType]} credit card issued in ${countryNames[country]} with high spending limits and exclusive benefits.`,
      price,
      balance,
      cardType,
      cardColor,
      rating,
      country
    });
  }

  return cards;
};

const cardData = generateCardData();

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [filteredCards, setFilteredCards] = useState<CardData[]>(cardData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const handleAddToCart = (id: number) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setCartCount(prev => prev + 1);
  };

  const handleLogin = (email: string, password: string) => {
    // Simple login simulation - in real app, this would call an API
    if (email && password) {
      setIsLoggedIn(true);
      setUser({ email, name: email.split('@')[0] });
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCartCount(0);
  };

  useEffect(() => {
    let filtered = cardData.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || card.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });

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

    setFilteredCards(filtered);
  }, [searchTerm, selectedCountry, sortBy]);

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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Premium Credit Cards</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive collection of 65+ premium credit cards and PayPal accounts from around the world with high limits, 
            exceptional benefits, and instant mobile money payment options.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map(card => (
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
        
        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No cards found matching your criteria.</p>
          </div>
        )}
      </main>
      
      {/* Global Screenshot Upload Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ScreenshotUpload />
      </section>
      
      <Footer />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;