import React from 'react';
import { Star, CreditCard as CreditCardIcon } from 'lucide-react';

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
  onAddToCart
}: CreditCardProps) {
  const isPayPal = cardType.toLowerCase().includes('paypal');
  const isGiftCard = cardType.toLowerCase().includes('gift');

  if (isPayPal) {
    return (
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
              <div className="text-right">
                <div className="text-sm opacity-75">Balance</div>
                <div className="text-xl font-bold">${balance.toLocaleString()}</div>
              </div>
            </div>
            <div className="text-lg font-mono">{getCardholderName('paypal')}</div>
            <div className="text-sm opacity-75 mt-2">Instant Transfer Available</div>
          </div>

          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({rating})</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">${price}</div>
          </div>
          
          <button
            onClick={() => onAddToCart(id)}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold border border-green-500"
          >
            Buy with USDT
          </button>
        </div>
      </div>
    );
  }

  if (isGiftCard) {
    return (
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
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({rating})</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">${price}</div>
          </div>
          
          <button
            onClick={() => onAddToCart(id)}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold border border-green-500"
          >
            Buy with USDT
          </button>
        </div>
      </div>
    );
  }

  // Regular credit/debit cards
  return (
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
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({rating})</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">${price}</div>
        </div>
        
        <button
          onClick={() => onAddToCart(id)}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold border border-green-500"
        >
          Buy with USDT
        </button>
      </div>
    </div>
  );
}