import React, { useState } from 'react';
import { X, Bitcoin, Phone } from 'lucide-react';
import CopyButton from './CopyButton';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardTitle: string;
  cardPrice: number;
  selectedMethod?: 'usdt' | 'mpesa' | 'opay' | 'zap' | 'vodafone' | 'mtn-momo' | 'mtn-mobile' | 'mtn-uganda' | 'other' | null;
}

const USDT_TRC20_ADDRESS = "TBc4q4B9y8zYCAm7k67mpTjjQbdaLztwiF";

const PAYMENT_DETAILS = {
  opay: {
    businessName: 'OPay Merchant',
    phone: '+234 803 456 7890',
    businessId: 'OPY-2024-5678'
  },
  zap: {
    businessName: 'Zap Pay Store',
    phone: '+233 50 123 4567',
    businessId: 'ZAP-9876-5432'
  },
  vodafone: {
    businessName: 'Vodafone Cash Merchant',
    shortCode: '*110#',
    accountNumber: '02567891234'
  },
  'mtn-momo': {
    businessName: 'MTN MoMo Merchant',
    phone: '+256 700 123 456',
    accountNumber: 'MTN-MOM-987654'
  },
  'mtn-mobile': {
    businessName: 'MTN Mobile Money',
    phone: '+260 976 543 210',
    accountNumber: 'MTN-MM-456789'
  },
  'mtn-uganda': {
    businessName: 'MTN Uganda Merchant',
    phone: '+256 752 345 678',
    accountNumber: 'MTNU-123456789'
  }
};

export default function PaymentMethodModal({
  isOpen,
  onClose,
  cardTitle,
  cardPrice,
  selectedMethod: propSelectedMethod
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'usdt' | 'mpesa' | 'opay' | 'zap' | 'vodafone' | 'mtn-momo' | 'mtn-mobile' | 'mtn-uganda' | 'other' | null>(propSelectedMethod || null);

  if (!isOpen) return null;

  if (selectedMethod === 'usdt') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">USDT Payment Instructions</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Bitcoin className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-cyan-400">${cardPrice} USDT</span></p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Payment Address (TRC-20)</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-800 p-3 rounded border border-gray-700 text-sm font-mono break-all text-cyan-400">
                    {USDT_TRC20_ADDRESS}
                  </code>
                  <CopyButton text={USDT_TRC20_ADDRESS} variant="dark" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Payment Steps</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Copy the USDT address</div>
                    <div className="text-sm text-gray-400">Click the copy button above</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Send USDT (TRC-20)</div>
                    <div className="text-sm text-gray-400">Use your wallet to send exactly ${cardPrice} USDT</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Upload screenshot</div>
                    <div className="text-sm text-gray-400">Upload proof of payment below</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Receive your card</div>
                    <div className="text-sm text-gray-400">Admin will verify and deliver</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 mt-1">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-yellow-300 mb-1">Important Notes</div>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Only send USDT on the TRC-20 network</li>
                    <li>• Send exactly ${cardPrice} USDT</li>
                    <li>• Double-check the address before sending</li>
                    <li>• Upload your payment screenshot for verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'mpesa') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700">
          <div className="border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">M-PESA</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="text-red-400 text-3xl mt-1">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-2 text-lg">Currently Unavailable</h3>
                  <p className="text-gray-300 mb-3">M-PESA payment is temporarily unavailable at the moment.</p>
                  <p className="text-gray-400 text-sm">Please use one of our other payment methods to complete your purchase.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
              <h4 className="font-bold text-white mb-3 flex items-center space-x-2">
                <span>✓</span>
                <span>Alternative Payment Methods Available</span>
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• USDT (Crypto)</li>
                <li>• OPay</li>
                <li>• Zap</li>
                <li>• Vodafone Cash</li>
                <li>• MTN MoMo</li>
                <li>• MTN Mobile Money</li>
                <li>• MTN Uganda</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedMethod(null);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                Choose Another Method
              </button>

              <button
                onClick={() => {
                  setSelectedMethod(null);
                  onClose();
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'opay') {
    const details = PAYMENT_DETAILS.opay;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">OPay Payment Instructions</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-orange-400">${cardPrice}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Business Name</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">{details.businessName}</div>
                  <CopyButton text={details.businessName} variant="dark" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Phone Number</div>
                  <CopyButton text={details.phone} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.phone}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Business ID</div>
                  <CopyButton text={details.businessId} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.businessId}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">How to Pay</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Open OPay app</div>
                    <div className="text-sm text-gray-400">Launch the OPay mobile application</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Select Send Money</div>
                    <div className="text-sm text-gray-400">Choose the send money or transfer option</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Enter phone and amount</div>
                    <div className="text-sm text-gray-400">Phone: {details.phone}, Amount: ${cardPrice}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Upload receipt</div>
                    <div className="text-sm text-gray-400">Save screenshot for verification</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 mt-1">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-yellow-300 mb-1">Important</div>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Use the correct business phone number</li>
                    <li>• Send exactly ${cardPrice}</li>
                    <li>• Save your transaction receipt</li>
                    <li>• Contact support if payment fails</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'zap') {
    const details = PAYMENT_DETAILS.zap;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Zap Payment Instructions</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-yellow-400">${cardPrice}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Store Name</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">{details.businessName}</div>
                  <CopyButton text={details.businessName} variant="dark" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Phone Number</div>
                  <CopyButton text={details.phone} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.phone}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Merchant ID</div>
                  <CopyButton text={details.businessId} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.businessId}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">How to Pay</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Open Zap app or website</div>
                    <div className="text-sm text-gray-400">Launch Zap payment platform</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Enter merchant details</div>
                    <div className="text-sm text-gray-400">Phone: {details.phone}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Enter amount</div>
                    <div className="text-sm text-gray-400">Amount: ${cardPrice}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Confirm and upload proof</div>
                    <div className="text-sm text-gray-400">Save transaction screenshot</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 mt-1">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-yellow-300 mb-1">Important</div>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Verify merchant information before payment</li>
                    <li>• Send exactly ${cardPrice}</li>
                    <li>• Keep your transaction receipt</li>
                    <li>• Upload proof for verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'vodafone') {
    const details = PAYMENT_DETAILS.vodafone;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Vodafone Cash Payment</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-red-400">${cardPrice}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Short Code</div>
                  <CopyButton text={details.shortCode} variant="dark" />
                </div>
                <div className="text-3xl font-bold text-white font-mono">{details.shortCode}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Account Number</div>
                  <CopyButton text={details.accountNumber} variant="dark" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">{details.accountNumber}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">How to Pay</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Dial the short code</div>
                    <div className="text-sm text-gray-400">Dial {details.shortCode} from your phone</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Select payment option</div>
                    <div className="text-sm text-gray-400">Choose send money or bill payment</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Enter account and amount</div>
                    <div className="text-sm text-gray-400">Account: {details.accountNumber}, Amount: ${cardPrice}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Upload confirmation</div>
                    <div className="text-sm text-gray-400">Share your confirmation message</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 mt-1">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-yellow-300 mb-1">Important</div>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Use correct short code and account</li>
                    <li>• Send exactly ${cardPrice}</li>
                    <li>• Save confirmation message</li>
                    <li>• Upload proof for verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'mtn-momo') {
    const details = PAYMENT_DETAILS['mtn-momo'];
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">MTN MoMo Payment</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-yellow-400">${cardPrice}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Merchant Name</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">{details.businessName}</div>
                  <CopyButton text={details.businessName} variant="dark" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Phone Number</div>
                  <CopyButton text={details.phone} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.phone}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Account Number</div>
                  <CopyButton text={details.accountNumber} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.accountNumber}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">How to Pay</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Open MTN MoMo app</div>
                    <div className="text-sm text-gray-400">Launch MTN Mobile Money application</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Select Send Money</div>
                    <div className="text-sm text-gray-400">Choose send money or transfer option</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Enter recipient details</div>
                    <div className="text-sm text-gray-400">Phone: {details.phone}, Amount: ${cardPrice}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Upload payment proof</div>
                    <div className="text-sm text-gray-400">Save transaction confirmation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 mt-1">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-yellow-300 mb-1">Important</div>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Verify recipient phone number</li>
                    <li>• Send exactly ${cardPrice}</li>
                    <li>• Save transaction confirmation</li>
                    <li>• Upload screenshot for verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'mtn-mobile') {
    const details = PAYMENT_DETAILS['mtn-mobile'];
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">MTN Mobile Money Payment</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-yellow-400">${cardPrice}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Business Name</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">{details.businessName}</div>
                  <CopyButton text={details.businessName} variant="dark" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Phone Number</div>
                  <CopyButton text={details.phone} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.phone}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Account Reference</div>
                  <CopyButton text={details.accountNumber} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.accountNumber}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">How to Pay</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Open MTN Mobile Money</div>
                    <div className="text-sm text-gray-400">Launch the MTN Mobile Money service</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Go to Send Money</div>
                    <div className="text-sm text-gray-400">Choose the send money option</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Enter payment details</div>
                    <div className="text-sm text-gray-400">Phone: {details.phone}, Amount: ${cardPrice}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Upload confirmation</div>
                    <div className="text-sm text-gray-400">Save and upload proof of payment</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 mt-1">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-yellow-300 mb-1">Important</div>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Use the correct phone number</li>
                    <li>• Send exactly ${cardPrice}</li>
                    <li>• Keep transaction reference</li>
                    <li>• Upload proof for verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'mtn-uganda') {
    const details = PAYMENT_DETAILS['mtn-uganda'];
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">MTN Uganda Payment</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-orange-400">${cardPrice}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Merchant Name</div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">{details.businessName}</div>
                  <CopyButton text={details.businessName} variant="dark" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Phone Number</div>
                  <CopyButton text={details.phone} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.phone}</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">Account Number</div>
                  <CopyButton text={details.accountNumber} variant="dark" />
                </div>
                <div className="text-xl font-bold text-white font-mono">{details.accountNumber}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">How to Pay</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Open MTN Uganda app</div>
                    <div className="text-sm text-gray-400">Launch MTN Mobile Money Uganda</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Select Send Money</div>
                    <div className="text-sm text-gray-400">Choose transfer or send money option</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Enter recipient and amount</div>
                    <div className="text-sm text-gray-400">Phone: {details.phone}, Amount: ${cardPrice}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Upload payment proof</div>
                    <div className="text-sm text-gray-400">Save and upload transaction receipt</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="text-yellow-400 mt-1">⚠️</div>
                <div>
                  <div className="text-sm font-medium text-yellow-300 mb-1">Important</div>
                  <ul className="text-sm text-yellow-200 space-y-1">
                    <li>• Verify recipient information</li>
                    <li>• Send exactly ${cardPrice}</li>
                    <li>• Save transaction receipt</li>
                    <li>• Upload proof for verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMethod === 'other') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
          <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Other Payment Methods</h2>
            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-3">
            <button
              onClick={() => setSelectedMethod('mpesa')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>M-PESA</span>
            </button>

            <button
              onClick={() => setSelectedMethod('opay')}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>OPay</span>
            </button>

            <button
              onClick={() => setSelectedMethod('zap')}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>Zap</span>
            </button>

            <button
              onClick={() => setSelectedMethod('vodafone')}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>Vodafone Cash</span>
            </button>

            <button
              onClick={() => setSelectedMethod('mtn-momo')}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>MTN MoMo</span>
            </button>

            <button
              onClick={() => setSelectedMethod('mtn-uganda')}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>MTN Uganda</span>
            </button>

            <button
              onClick={() => {
                setSelectedMethod(null);
                onClose();
              }}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700">
        <div className="border-b border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Select Payment Method</h2>
            <p className="text-gray-400 text-sm mt-1">{cardTitle} - ${cardPrice}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={() => setSelectedMethod('usdt')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
          >
            <Bitcoin className="w-6 h-6" />
            <span>Pay with USDT</span>
          </button>

          <button
            onClick={() => setSelectedMethod('mtn-mobile')}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
          >
            <Phone className="w-6 h-6" />
            <span>Pay with MTN Mobile</span>
          </button>

          <button
            onClick={() => setSelectedMethod('other')}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
          >
            <Phone className="w-6 h-6" />
            <span>Other Payment Methods</span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
