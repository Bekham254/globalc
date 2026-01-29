import React, { useState } from 'react';
import { Star, CreditCard as CreditCardIcon, Copy } from 'lucide-react';
import PaymentMethodModal from './PaymentMethodModal';

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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const isPayPal = cardType.toLowerCase().includes('paypal');
  const isGiftCard = cardType.toLowerCase().includes('gift');

  if (isPayPal) {
    return (
      <>
        <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">💰</span>
              <span className="font-semibold text-gray-300 text-lg">PayPal Transfer</span>
            </div>
            <div className="bg-gray-700 px-4 py-2 rounded-full">
              <span className="text-gray-200 font-semibold text-sm">Instant</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-6 aspect-video flex flex-col justify-center items-center">
            <div className="text-5xl font-bold mb-4">PayPal</div>
            <div className="text-4xl font-bold">${balance}</div>
          </div>

          <div className="text-center mb-6">
            <div className="text-gray-400 text-sm mb-2">Transfer Amount</div>
            <div className="text-4xl font-bold text-cyan-400">${balance}</div>
          </div>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-red-500">${price}</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition"
            >
              Pay with USDT
            </button>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition"
            >
              Pay with M-PESA
            </button>
          </div>
        </div>

        <PaymentMethodModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          cardTitle={title}
          cardPrice={price}
        />
      </>
    );
  }

  if (isGiftCard) {
    const giftCardGradients: { [key: string]: string } = {
      'amazon': 'from-orange-400 to-yellow-500',
      'apple': 'from-gray-500 to-gray-700',
      'ebay': 'from-red-500 to-red-700',
      'google': 'from-blue-400 to-red-400',
      'itunes': 'from-purple-500 to-purple-700'
    };

    const getTitleKeyword = () => {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('amazon')) return 'amazon';
      if (lowerTitle.includes('apple')) return 'apple';
      if (lowerTitle.includes('ebay')) return 'ebay';
      if (lowerTitle.includes('google')) return 'google';
      if (lowerTitle.includes('itunes')) return 'itunes';
      return 'amazon';
    };

    const gradient = giftCardGradients[getTitleKeyword()] || giftCardGradients['amazon'];

    return (
      <>
        <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="font-semibold text-gray-300 text-lg">{title}</div>
            <div className="bg-gray-700 px-4 py-2 rounded-full">
              <span className="text-gray-200 font-semibold text-sm">GIFT CARD</span>
            </div>
          </div>

          <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 text-white mb-6 aspect-video flex flex-col justify-center items-center`}>
            <div className="text-5xl font-bold">{title.split(' ')[0]}</div>
          </div>

          <div className="text-center mb-6">
            <div className="text-gray-400 text-sm mb-2">Card Value</div>
            <div className="text-4xl font-bold text-cyan-400">${balance}</div>
          </div>

          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-red-500">${price}</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition"
            >
              Pay with USDT
            </button>
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition"
            >
              Pay with M-PESA
            </button>
          </div>
        </div>

        <PaymentMethodModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          cardTitle={title}
          cardPrice={price}
        />
      </>
    );
  }

  // Regular credit/debit cards
  return (
    <>
      <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getCountryFlag(country)}</span>
            <span className="font-semibold text-gray-300 text-lg">{getCountryName(country)}</span>
          </div>
          <div className="bg-gray-700 px-4 py-2 rounded-full">
            <span className="text-gray-200 font-semibold text-sm">{cardType.toUpperCase()}</span>
          </div>
        </div>

        <div className={`bg-gradient-to-br ${getCardColors(cardType)} rounded-2xl p-8 text-white mb-6 aspect-video flex flex-col justify-between`}>
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 bg-yellow-400 rounded-lg"></div>
            <div className="text-2xl font-bold">{cardType.toUpperCase()}</div>
          </div>
          <div>
            <div className="text-lg font-mono tracking-widest mb-4">{getCardNumber(cardType)}</div>
            <div className="flex justify-between">
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
        </div>

        <div className="text-center mb-6">
          <div className="text-gray-400 text-sm mb-2">Total Balance</div>
          <div className="text-4xl font-bold text-cyan-400">${balance.toLocaleString()}</div>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-red-500">${price}</div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition"
          >
            Pay with USDT
          </button>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition"
          >
            Pay with M-PESA
          </button>
        </div>
      </div>

      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cardTitle={title}
        cardPrice={price}
      />
    </>
  );
}