import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

interface CopyButtonProps {
  text: string;
  variant?: 'light' | 'dark';
}

export default function CopyButton({ text, variant = 'light' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'dark') {
    return (
      <button
        onClick={handleCopy}
        className={`p-3 rounded transition-colors flex-shrink-0 ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded transition-colors flex-shrink-0 ${
        copied
          ? 'bg-green-100 text-green-600'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
      }`}
    >
      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}
