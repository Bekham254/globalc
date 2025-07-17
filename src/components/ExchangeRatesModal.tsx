import React from 'react';
import { X, DollarSign, TrendingUp } from 'lucide-react';

interface ExchangeRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExchangeRatesModal({ isOpen, onClose }: ExchangeRatesModalProps) {
  if (!isOpen) return null;

  const exchangeRates = [
    { currency: 'ZMK', rate: 23, flag: '🇿🇲', name: 'Zambian Kwacha' },
    { currency: 'EGP', rate: 49, flag: '🇪🇬', name: 'Egyptian Pound' },
    { currency: 'KSH', rate: 129, flag: '🇰🇪', name: 'Kenyan Shilling' },
    { currency: 'NGN', rate: 1529, flag: '🇳🇬', name: 'Nigerian Naira' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Exchange Rates</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-8 h-8 text-green-600 mr-2" />
              <span className="text-3xl font-bold text-gray-800">1 USD =</span>
            </div>
            <p className="text-gray-600">Current exchange rates for mobile money payments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exchangeRates.map((rate, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{rate.flag}</span>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{rate.currency}</div>
                      <div className="text-sm text-gray-600">{rate.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">
                      {rate.rate.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">per USD</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 mt-1">ℹ️</div>
              <div>
                <div className="text-sm font-medium text-blue-800 mb-1">Payment Information</div>
                <div className="text-sm text-blue-700">
                  Use these rates when calculating your mobile money payment amount. 
                  All debit cards are 2D for enhanced security and compatibility.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}