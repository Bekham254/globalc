import React from 'react';
import { Bitcoin, Shield, Clock, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">CardVault</h3>
            <p className="text-gray-300 mb-4">
              Your trusted marketplace for premium credit cards with instant M-Pesa payments 
              and guaranteed delivery.
            </p>
            <div className="flex space-x-4">
              <Bitcoin className="w-6 h-6 text-orange-400" />
              <Shield className="w-6 h-6 text-orange-400" />
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Countries</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">🇺🇸 United States</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">🇬🇧 United Kingdom</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">🇩🇪 Germany</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">🇮🇹 Italy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">🇨🇦 Canada</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">🇦🇺 Australia</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Payment Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-orange-400 mr-3" />
                <span className="text-gray-300">cardvaulter@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-orange-400 mr-3" />
                <span className="text-gray-300">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-orange-400 mr-3" />
                <span className="text-gray-300">Worldwide</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 CardVault. All transactions secured with mobile money.</p>
        </div>
      </div>
    </footer>
  );
}