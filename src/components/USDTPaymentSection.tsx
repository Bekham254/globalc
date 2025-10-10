import React, { useState } from 'react';
import { Copy, CheckCircle, Bitcoin, CreditCard } from 'lucide-react';

const USDT_TRC20_ADDRESS = "TBc4q4B9y8zYCAm7k67mpTjjQbdaLztwiF";

interface USDTPaymentSectionProps {
  selectedCard?: {
    id: number;
    title: string;
    price: number;
  } | null;
}

export default function USDTPaymentSection({ selectedCard }: USDTPaymentSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(USDT_TRC20_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 mb-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Bitcoin className="w-12 h-12 text-green-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">USDT Payment Instructions</h2>
        </div>
        <p className="text-gray-600 text-lg">
          Send USDT (TRC-20) to complete your purchase
        </p>
      </div>

      {selectedCard && (
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{selectedCard.title}</h3>
                <p className="text-gray-600">Selected Card</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">${selectedCard.price}</div>
              <div className="text-sm text-gray-500">USDT Amount</div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Address</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">USDT TRC-20 Address:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">TRC-20</span>
              </div>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-white p-3 rounded border text-sm font-mono break-all">
                  {USDT_TRC20_ADDRESS}
                </code>
                <button
                  onClick={handleCopyAddress}
                  className={`p-3 rounded transition-colors ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              {copied && (
                <div className="text-green-600 text-sm mt-2 font-medium">
                  ✓ Address copied to clipboard!
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <div className="font-medium text-gray-800">Copy the USDT address</div>
                  <div className="text-sm text-gray-600">Click the copy button above</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <div className="font-medium text-gray-800">Send USDT (TRC-20)</div>
                  <div className="text-sm text-gray-600">Use your wallet to send the exact amount</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <div className="font-medium text-gray-800">Upload screenshot</div>
                  <div className="text-sm text-gray-600">Use the upload section below</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <div className="font-medium text-gray-800">Receive your card</div>
                  <div className="text-sm text-gray-600">Admin will verify and deliver</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-600 mt-1">⚠️</div>
          <div>
            <div className="text-sm font-medium text-yellow-800 mb-1">Important Notes</div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Only send USDT on the TRC-20 network</li>
              <li>• Send the exact amount shown above</li>
              <li>• Double-check the address before sending</li>
              <li>• Upload your payment screenshot for verification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}