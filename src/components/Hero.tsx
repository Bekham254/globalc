import React from 'react';
import { CreditCard, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Global <span className="text-orange-400">Cards & Transfers</span> Marketplace
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Access 85+ exclusive credit cards, PayPal transfers, and gift cards from 6 countries with high limits, premium benefits, and multiple mobile money payment options.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Browse Cards
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-800 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300">
              Learn More
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <CreditCard className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">High Limits</h3>
              <p className="text-gray-100">Premium cards with substantial credit limits</p>
            </div>
            <div className="flex flex-col items-center">
              <Zap className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Delivery</h3>
              <p className="text-gray-100">Immediate access after mobile money payment</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure & Anonymous</h3>
              <p className="text-gray-100">Protected transactions with privacy guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}