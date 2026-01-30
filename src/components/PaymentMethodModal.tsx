import React, { useState } from 'react';
import { X, Copy, CheckCircle, Bitcoin, Phone, Lock } from 'lucide-react';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardTitle: string;
  cardPrice: number;
}

const USDT_TRC20_ADDRESS = "TBc4q4B9y8zYCAm7k67mpTjjQbdaLztwiF";

export default function PaymentMethodModal({
  isOpen,
  onClose,
  cardTitle,
  cardPrice
}: PaymentMethodModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'usdt' | 'mpesa' | null>(null);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(USDT_TRC20_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

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
                  <button
                    onClick={handleCopyAddress}
                    className={`p-3 rounded transition-colors flex-shrink-0 ${
                      copied
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copied && (
                  <div className="text-green-400 text-sm mt-2 font-medium">
                    ✓ Address copied to clipboard!
                  </div>
                )}
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
            <h2 className="text-2xl font-bold text-white">M-PESA Payment Details</h2>
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
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{cardTitle}</h3>
                  <p className="text-gray-400">Amount to send: <span className="text-2xl font-bold text-green-400">${cardPrice}</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Paybill Number</div>
                <div className="text-3xl font-bold text-white font-mono">542542</div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Account Number</div>
                <div className="text-2xl font-bold text-white font-mono">04808493216150</div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">How to Pay</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-medium text-white">Open M-PESA on your phone</div>
                    <div className="text-sm text-gray-400">Dial *334# or use the M-PESA app</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-medium text-white">Select "Lipa Na M-PESA Online"</div>
                    <div className="text-sm text-gray-400">Choose the payment option</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-medium text-white">Enter the details</div>
                    <div className="text-sm text-gray-400">Paybill: 542542, Account: 04808493216150</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-medium text-white">Enter amount and complete</div>
                    <div className="text-sm text-gray-400">Amount: ${cardPrice}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                  <div>
                    <div className="font-medium text-white">Save your receipt</div>
                    <div className="text-sm text-gray-400">You'll need it for verification</div>
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
                    <li>• Use the correct Paybill and Account numbers</li>
                    <li>• Send exactly ${cardPrice}</li>
                    <li>• Save your M-PESA receipt</li>
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
            onClick={() => setSelectedMethod('mpesa')}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center space-x-3"
          >
            <Phone className="w-6 h-6" />
            <span>Pay with M-PESA</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              disabled
              className="bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 opacity-60 cursor-not-allowed relative group"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">Opay</span>
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">Coming Soon</span>
            </button>

            <button
              disabled
              className="bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 opacity-60 cursor-not-allowed relative group"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">Zap</span>
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">Coming Soon</span>
            </button>

            <button
              disabled
              className="bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 opacity-60 cursor-not-allowed relative group"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">Vodafone Cash</span>
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">Coming Soon</span>
            </button>

            <button
              disabled
              className="bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 opacity-60 cursor-not-allowed relative group"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">MTN MoMo</span>
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">Coming Soon</span>
            </button>

            <button
              disabled
              className="bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 opacity-60 cursor-not-allowed relative group"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">MTN Mobile Money</span>
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">Coming Soon</span>
            </button>

            <button
              disabled
              className="bg-gray-700 text-gray-400 font-bold py-3 rounded-lg transition flex items-center justify-center space-x-2 opacity-60 cursor-not-allowed relative group"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm">MTN Uganda</span>
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-semibold">Coming Soon</span>
            </button>
          </div>

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
