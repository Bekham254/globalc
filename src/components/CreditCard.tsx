import React, { useState } from 'react';
import { CreditCard as CreditCardIcon, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface CreditCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  balance: number;
  cardType: 'visa' | 'mastercard' | 'amex' | 'paypal' | 'unionpay' | 'discover' | 'amex-gift';
  cardColor: string;
  rating: number;
  country: 'uk' | 'us' | 'germany' | 'italy' | 'canada' | 'australia';
  onAddToCart: (id: number) => void;
}

export default function CreditCard({ 
  id, title, description, price, balance, cardType, cardColor, rating, country, onAddToCart 
}: CreditCardProps) {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const countryFlags = {
    uk: '🇬🇧',
    us: '🇺🇸',
    germany: '🇩🇪',
    italy: '🇮🇹',
    canada: '🇨🇦',
    australia: '🇦🇺'
  };

  const paymentOptions = [
    {
      name: 'M-Pesa',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: 'bg-green-600 hover:bg-green-700',
      textColor: 'text-white'
    },
    {
      name: 'MTN Mobile Money',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: 'bg-yellow-500 hover:bg-yellow-600',
      textColor: 'text-white'
    },
    {
      name: 'Vodafone Cash',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-white'
    },
    {
      name: 'OPay',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    },
    {
      name: 'PayPal Transfer',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a.641.641 0 0 1-.633-.74L23.696.901C23.778.382 24.226 0 24.75 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
        </svg>
      ),
      color: 'bg-indigo-600 hover:bg-indigo-700',
      textColor: 'text-white'
    }
  ];

  const getCardLogo = () => {
    switch (cardType) {
      case 'visa':
        return (
          <div className="text-white font-bold text-2xl tracking-wider">VISA</div>
        );
      case 'mastercard':
        return (
          <div className="text-white font-bold text-xl tracking-wider">Mastercard</div>
        );
      case 'amex':
        return (
          <div className="text-white font-bold text-2xl tracking-wider">AMEX</div>
        );
      case 'paypal':
        return (
          <div className="bg-white px-4 py-2 rounded-lg shadow-md border">
            <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-sm">
              PayPal
            </div>
          </div>
        );
      case 'unionpay':
        return (
          <div className="bg-white px-4 py-2 rounded-lg shadow-md border">
            <svg viewBox="0 0 48 16" className="h-5 w-auto">
              <rect width="16" height="16" fill="#E21836"/>
              <rect x="16" width="16" height="16" fill="#0066CC"/>
              <rect x="32" width="16" height="16" fill="#00A651"/>
            </svg>
          </div>
        );
      case 'amex-gift':
        return (
          <div className="bg-white px-3 py-2 rounded-lg shadow-md border">
            <div className="text-blue-700 font-bold text-xs tracking-wide">
              AMERICAN EXPRESS
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const formatCardNumber = () => {
    if (cardType === 'paypal') {
      return 'account@paypal.com';
    }
    
    // Generate realistic card numbers based on type
    if (cardType === 'visa') {
      return '4929 **** **** 2213';
    } else if (cardType === 'mastercard') {
      return '5505 **** **** 0516';
    } else if (cardType === 'amex') {
      return '3400 **** **** 7866';
    }
    return '**** **** **** ****';
  };

  const handlePaymentSelect = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
    setShowPaymentDetails(true);
    setShowPaymentOptions(false);
  };

  const handleConfirmPayment = () => {
    createOrder();
  };

  const { user } = useAuth();

  const createOrder = async () => {
    if (!user) {
      alert('Please login to make a purchase');
      return;
    }

    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-order', {
        body: {
          cardId: id,
          amount: price,
          paymentMethod: selectedPayment
        }
      });

      if (error) throw error;

      alert(`Order created successfully! Order ID: ${data.orderId}\n\nPlease send payment to the provided details and upload your screenshot.`);
      setShowPaymentDetails(false);
      setSelectedPayment(null);
      onAddToCart(id);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  const getPaymentDetails = () => {
    if (selectedPayment === 'M-Pesa') {
      return {
        title: 'M-Pesa Payment Details',
        number: '6589934',
        label: 'Till Number',
        color: 'bg-green-600',
        icon: '📱'
      };
    } else if (selectedPayment === 'PayPal Transfer') {
      return {
        title: 'PayPal Transfer Details',
        number: '163632',
        label: 'Account Number',
        color: 'bg-indigo-600',
        icon: '💰'
      };
    } else {
      return {
        title: `${selectedPayment} Payment Details`,
        number: '163632',
        label: 'Account Number',
        color: selectedPayment === 'MTN Mobile Money' ? 'bg-yellow-500' : 
               selectedPayment === 'Vodafone Cash' ? 'bg-red-600' : 'bg-blue-600',
        icon: '💳'
      };
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadScreenshot = async () => {
    if (!selectedFile) {
      alert('Please select a screenshot first');
      return;
    }

    setIsUploading(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('screenshot', selectedFile);
      formData.append('cardId', id.toString());
      formData.append('cardTitle', title);
      formData.append('amount', price.toString());
      formData.append('paymentMethod', selectedPayment || '');
      formData.append('customerEmail', 'customer@example.com'); // In real app, get from user session
      
      // Simulate API call to send email with screenshot
      // In a real application, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll show success
      // In real implementation, this would send to cardvaulter@gmail.com
      console.log('Screenshot would be sent to cardvaulter@gmail.com with details:', {
        cardId: id,
        cardTitle: title,
        amount: price,
        paymentMethod: selectedPayment,
        fileName: selectedFile.name
      });
      
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setSelectedFile(null);
        setShowPaymentDetails(false);
        setSelectedPayment(null);
        onAddToCart(id);
      }, 2000);
      
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const getCardColor = () => {
    switch (cardType) {
      case 'visa':
        return 'bg-gradient-to-br from-blue-600 to-blue-800';
      case 'mastercard':
        return 'bg-gradient-to-br from-red-600 to-red-800';
      case 'amex':
        return 'bg-gradient-to-br from-blue-600 to-blue-800';
      default:
        return cardColor;
    }
  };

  const getCardholderName = () => {
    switch (cardType) {
      case 'visa':
        return 'ALEX JOHNSON';
      case 'mastercard':
        return 'SARAH WILSON';
      case 'amex':
        return 'MIKE BROWN';
      default:
        return 'CARDHOLDER NAME';
    }
  };

  // Special rendering for AMEX Gift Cards to match the screenshot design
  if (cardType === 'amex-gift') {
    return (
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-700">
        {/* AMEX Gift Card Visual */}
        <div className="p-6 text-center">
          <div className="bg-white rounded-lg p-8 mb-4 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-lg">
                American
              </div>
              <span className="text-2xl font-bold text-gray-800 ml-2">Express Gift Cards</span>
            </div>
            
            {/* Gift Card Image */}
            <div className="relative bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-lg p-4 mb-4 shadow-md">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300 opacity-80 rounded-lg"></div>
              <div className="relative text-white">
                <div className="text-center mb-2">
                  <div className="text-lg font-bold">Happy Birthday</div>
                </div>
                <div className="text-sm font-mono mb-2">3759 876543 21001</div>
                <div className="text-right text-xs">$0.00</div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            AMEX Gift Card ${balance}
          </h3>
          <div className="text-3xl font-bold text-orange-400 mb-6">
            ${price}
          </div>
          
          {/* Payment Options */}
          <div className="relative space-y-3">
            {!showPaymentDetails ? (
              <>
                <button 
                  onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>Choose Payment Method</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showPaymentOptions ? 'rotate-180' : ''}`} />
                </button>
                
                {showPaymentOptions && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                    {paymentOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handlePaymentSelect(option.name)}
                        className={`w-full ${option.color} ${option.textColor} font-bold py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 hover:opacity-90`}
                      >
                        {option.icon}
                        <span>Pay with {option.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">{getPaymentDetails().icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {getPaymentDetails().title}
                  </h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      {getPaymentDetails().label}:
                    </span>
                    <span className="text-lg font-bold text-gray-800 font-mono">
                      {getPaymentDetails().number}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-600">Amount:</span>
                    <span className="text-xl font-bold text-green-600">${price}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Send payment and receive gift card details
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setShowPaymentDetails(false);
                      setSelectedPayment(null);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className={`flex-1 ${getPaymentDetails().color} hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all`}
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Special rendering for PayPal transfers to match the screenshot design
  if (cardType === 'paypal') {
    return (
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-700">
        {/* PayPal Card Visual */}
        <div className="p-6 text-center">
          <div className="bg-white rounded-lg p-8 mb-4 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="#003087">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a.641.641 0 0 1-.633-.74L23.696.901C23.778.382 24.226 0 24.75 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
              </svg>
              <span className="text-3xl font-bold text-blue-600 ml-2">PayPal</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            PayPal Transfer ${balance}
          </h3>
          <div className="text-3xl font-bold text-orange-400 mb-6">
            ${price}
          </div>
          
          {/* Payment Options */}
          <div className="relative space-y-3">
            {!showPaymentDetails ? (
              <>
                <button 
                  onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  <span>Choose Payment Method</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showPaymentOptions ? 'rotate-180' : ''}`} />
                </button>
                
                {showPaymentOptions && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                    {paymentOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handlePaymentSelect(option.name)}
                        className={`w-full ${option.color} ${option.textColor} font-bold py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 hover:opacity-90`}
                      >
                        {option.icon}
                        <span>Pay with {option.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">{getPaymentDetails().icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {getPaymentDetails().title}
                  </h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      {getPaymentDetails().label}:
                    </span>
                    <span className="text-lg font-bold text-gray-800 font-mono">
                      {getPaymentDetails().number}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-600">Amount:</span>
                    <span className="text-xl font-bold text-green-600">${price}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    Send payment and receive PayPal account details
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setShowPaymentDetails(false);
                      setSelectedPayment(null);
                    }}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className={`flex-1 ${getPaymentDetails().color} hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all`}
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-200">
      {/* Credit Card Visual */}
      <div className="relative p-6">
        {/* Country and Card Type Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{countryFlags[country]}</span>
            <span className="text-gray-700 font-medium capitalize">
              {country === 'us' ? 'United States' : 
               country === 'uk' ? 'United Kingdom' : 
          </div>
          
          {/* Card Number */}
          <div className="mb-8">
            <div className="text-2xl font-mono tracking-wider font-bold">
              {formatCardNumber()}
            </div>
          </div>
          
          {/* Card Details */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-80 mb-1">CARDHOLDER</div>
              <div className="font-bold text-sm">{getCardholderName()}</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-80 mb-1">VALID THRU</div>
              <div className="font-bold text-sm">12/26</div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-80 mb-1">CVV</div>
              <div className="font-bold text-sm">***</div>
            </div>
          </div>
        </div>
      </div>
              <div>
                <div className="text-xs opacity-70">VALID THRU</div>
                <div className="font-mono font-bold">12/28</div>
              </div>
              <div>
                <div className="text-xs opacity-70">CVV</div>
                <div className="font-mono font-bold">***</div>
              </div>
            </div>
          </div>
          
          <div className="text-xs opacity-90 font-semibold">
            CARDHOLDER NAME
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Card balance and price */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {title}
          </h3>
          <div className="text-lg font-semibold text-gray-600 mb-1">
            Balance ${balance.toLocaleString()}
          </div>
          <div className="text-3xl font-bold text-orange-500 mb-2">
            ${price}
          </div>
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">({rating})</span>
          </div>
        </div>
            
        {/* Payment Options */}
        <div className="relative space-y-3">
          {!showPaymentDetails ? (
            <>
              <button 
                onClick={() => setShowPaymentOptions(!showPaymentOptions)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>Choose Payment Method</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showPaymentOptions ? 'rotate-180' : ''}`} />
              </button>
              
              {showPaymentOptions && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden">
                  {paymentOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handlePaymentSelect(option.name)}
                      className={`w-full ${option.color} ${option.textColor} font-bold py-3 px-4 flex items-center justify-center space-x-2 transition-all duration-200 hover:opacity-90`}
                    >
                      {option.icon}
                      <span>Pay with {option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">{getPaymentDetails().icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {getPaymentDetails().title}
                </h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    {getPaymentDetails().label}:
                  </span>
                  <span className="text-lg font-bold text-gray-800 font-mono">
                    {getPaymentDetails().number}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-600">Amount:</span>
                  <span className="text-xl font-bold text-green-600">${price}</span>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  Send payment and screenshot confirmation
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setShowPaymentDetails(false);
                    setSelectedPayment(null);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className={`flex-1 ${getPaymentDetails().color} hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all`}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}