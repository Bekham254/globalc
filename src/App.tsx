import React, { useState } from 'react';
import { CreditCard as CreditCardIcon, ChevronDown } from 'lucide-react';

interface CreditCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  balance: number;
  cardType: 'visa' | 'mastercard' | 'amex' | 'paypal' | 'unionpay';
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
          <div className="bg-white px-3 py-2 rounded-lg shadow-md border">
            <div className="text-blue-800 font-bold text-lg tracking-wider">VISA</div>
          </div>
        );
      case 'mastercard':
        return (
          <div className="bg-white px-3 py-2 rounded-lg shadow-md border flex items-center">
            <div className="w-7 h-7 bg-red-500 rounded-full"></div>
            <div className="w-7 h-7 bg-yellow-400 rounded-full -ml-3"></div>
          </div>
        );
      case 'amex':
        return (
          <div className="bg-white px-3 py-2 rounded-lg shadow-md border">
            <div className="text-blue-700 font-bold text-xs tracking-wide">
              AMERICAN EXPRESS
            </div>
          </div>
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
      default:
        return null;
    }
  };

  const formatCardNumber = () => {
    if (cardType === 'paypal') {
      return 'account@paypal.com';
    }
    const baseNumber = cardType === 'amex' ? '3*** ******* *****' : '**** **** **** ****';
    return baseNumber;
  };

  const handlePaymentSelect = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
    setShowPaymentDetails(true);
    setShowPaymentOptions(false);
  };

  const handleConfirmPayment = () => {
    setShowPaymentDetails(false);
    setSelectedPayment(null);
    onAddToCart(id);
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

  // Special rendering for PayPal transfers to match the screenshot design
  if (cardType === 'paypal') {
    return (
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-700 text-white">
        {/* PayPal Card Visual */}
        <div className="p-6 text-center">
          <div className="bg-white rounded-lg p-6 mb-4 shadow-lg">
            <div className="flex items-center justify-center mb-4">
  ];
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
      <div className="relative p-4">
        <div className={`${cardColor} rounded-lg p-4 text-white relative overflow-hidden shadow-xl`}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-5 rounded-full -ml-8 -mb-8"></div>
          
          {/* Country Flag in top-left corner */}
          <div className="absolute top-3 left-3">
            <span className="text-3xl">{countryFlags[country]}</span>
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <CreditCardIcon className="w-6 h-6 text-white opacity-80" />
            {getCardLogo()}
          </div>
          
          <div className="mb-4">
            <div className="text-xl font-mono tracking-wider mb-2 font-bold">
              {formatCardNumber()}
            </div>
            <div className="flex justify-between text-sm">
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
      
      <div className="p-4">
        {/* Card balance and price */}
        <div className="text-center mb-4">
          <div className="text-lg font-bold text-gray-800 mb-1">
            Balance ${balance.toLocaleString()}
          </div>
          <div className="text-2xl font-bold text-green-600">
            ${price}
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