import React, { useState } from 'react';
import { Star, CreditCard as CreditCardIcon, Copy, Plus, Minus } from 'lucide-react';

interface CreditCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  balance: number;
  cardType: string;
  cardColor: string;
  rating: number;
  country: string;
  onAddToCart: (id: number) => void;
  onSelectForPayment: (card: { id: number; title: string; price: number }) => void;
}

const getCountryFlag = (country: string) => {
  const flags: { [key: string]: string } = {
    'us': '🇺🇸',
    'uk': '🇬🇧',
    'germany': '🇩🇪',
    'italy': '🇮🇹',
    'canada': '🇨🇦',
    'australia': '🇦🇺'
  };
  return flags[country.toLowerCase()] || '🌍';
};

const getCountryName = (country: string) => {
  const names: { [key: string]: string } = {
    'us': 'United States',
    'uk': 'United Kingdom',
    'germany': 'Germany',
    'italy': 'Italy',
    'canada': 'Canada',
    'australia': 'Australia'
  };
  return names[country.toLowerCase()] || country;
};

const getCardColors = (cardType: string) => {
  switch (cardType.toLowerCase()) {
    case 'visa':
      return 'from-blue-600 to-blue-800';
    case 'mastercard':
      return 'from-red-600 to-red-800';
    case 'amex':
    case 'american express':
      return 'from-blue-600 to-blue-800';
    case 'unionpay':
      return 'from-green-600 to-green-800';
    case 'discover':
      return 'from-orange-600 to-orange-800';
    default:
      return 'from-gray-600 to-gray-800';
  }
};

const getCardNumber = (cardType: string) => {
  switch (cardType.toLowerCase()) {
    case 'visa':
      return '4929 **** **** 2213';
    case 'mastercard':
      return '5505 **** **** 0516';
    case 'amex':
    case 'american express':
      return '3400 **** **** 7866';
    case 'unionpay':
      return '6221 **** **** 1234';
    case 'discover':
      return '6011 **** **** 5678';
    default:
      return '**** **** **** ****';
  }
};

const getCardholderName = (cardType: string) => {
  const names = ['ALEX JOHNSON', 'SARAH WILSON', 'MIKE BROWN', 'JOHN SMITH', 'EMMA DAVIS'];
  return names[Math.floor(Math.random() * names.length)];
};

export default function CreditCard({
  id,
  title,
  description,
  price,
  balance,
  cardType,
  cardColor,
  rating,
  country,
  onAddToCart,
  onSelectForPayment
}: CreditCardProps) {
  const [currentBalance, setCurrentBalance] = useState(balance);
  const isPayPal = cardType.toLowerCase().includes('paypal');
  const isGiftCard = cardType.toLowerCase().includes('gift');

  const handleAddBalance = () => {
    setCurrentBalance(prev => prev + 500);
  };

  const handleRemoveBalance = () => {
    setCurrentBalance(prev => Math.max(0, prev - 500));
  };

  if (isPayPal) {
    return (
      <div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCountryFlag(country)}</span>
                <span className="font-semibold text-gray-700">{getCountryName(country)}</span>
              </div>
              <div className="bg-blue-100 px-3 py-1 rounded-full">
                <span className="text-blue-800 font-semibold text-sm">PayPal</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-6 text-white mb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="text-2xl font-bold">PayPal</div>
              </div>
              <div className="text-lg font-mono">{getCardholderName('paypal')}</div>
            </div>

            <h3 className="font-bold text-lg mb-2">{title}</h3>

            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-orange-600">${price}</div>
            </div>

            <button
              onClick={() => handleUSDTPayment(title, price)}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold border border-green-500"
            >
              <div className="flex items-center justify-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Buy with USDT</span>
              </div>
            </button>
          </div>
        </div>
        <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 font-semibold">Balance: ${currentBalance.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddBalance}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add $500
            </button>
            <button
              onClick={handleRemoveBalance}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <Minus className="w-4 h-4" />
              Remove $500
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isGiftCard) {
    return (
      <div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCountryFlag(country)}</span>
                <span className="font-semibold text-gray-700">{getCountryName(country)}</span>
              </div>
              <div className="bg-purple-100 px-3 py-1 rounded-full">
                <span className="text-purple-800 font-semibold text-sm">AMEX</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white mb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-6 bg-yellow-400 rounded"></div>
                <div className="text-xl font-bold">AMEX</div>
              </div>
              <div className="text-lg font-mono mb-4">{getCardNumber('amex')}</div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs opacity-75">CARDHOLDER</div>
                  <div className="font-semibold">{getCardholderName('amex')}</div>
                </div>
                <div>
                  <div className="text-xs opacity-75">VALID THRU</div>
                  <div className="font-semibold">12/26</div>
                </div>
                <div>
                  <div className="text-xs opacity-75">CVV</div>
                  <div className="font-semibold">***</div>
                </div>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2">{title}</h3>

            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-orange-600">${price}</div>
            </div>

            <button
              onClick={() => handleUSDTPayment(title, price)}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold border border-green-500"
            >
              <div className="flex items-center justify-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Buy with USDT</span>
              </div>
            </button>
          </div>
        </div>
        <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 font-semibold">Balance: ${currentBalance.toLocaleString()}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddBalance}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add $500
            </button>
            <button
              onClick={handleRemoveBalance}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
            >
              <Minus className="w-4 h-4" />
              Remove $500
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular credit/debit cards
  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{getCountryFlag(country)}</span>
              <span className="font-semibold text-gray-700">{getCountryName(country)}</span>
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-gray-800 font-semibold text-sm">{cardType.toUpperCase()}</span>
            </div>
          </div>

          <div className={`bg-gradient-to-r ${getCardColors(cardType)} rounded-lg p-6 text-white mb-4`}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-6 bg-yellow-400 rounded"></div>
              <div className="text-xl font-bold">{cardType.toUpperCase()}</div>
            </div>
            <div className="text-lg font-mono mb-4">{getCardNumber(cardType)}</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs opacity-75">CARDHOLDER</div>
                <div className="font-semibold">{getCardholderName(cardType)}</div>
              </div>
              <div>
                <div className="text-xs opacity-75">VALID THRU</div>
                <div className="font-semibold">12/26</div>
              </div>
              <div>
                <div className="text-xs opacity-75">CVV</div>
                <div className="font-semibold">***</div>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2">{title}</h3>

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-orange-600">${price}</div>
          </div>

          <button
            onClick={() => onSelectForPayment({ id, title, price })}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold border border-green-500"
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Select for Payment</span>
            </div>
          </button>
        </div>
      </div>
      <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 font-semibold">Balance: ${currentBalance.toLocaleString()}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAddBalance}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add $500
          </button>
          <button
            onClick={handleRemoveBalance}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
          >
            <Minus className="w-4 h-4" />
            Remove $500
          </button>
        </div>
      </div>
    </div>
  );
}