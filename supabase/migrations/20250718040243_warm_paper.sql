/*
  # Seed all 85 cards (Credit Cards, PayPal Transfers, AMEX Gift Cards)

  1. Card Types
    - 55 Credit Cards (Visa, Mastercard, AMEX, UnionPay, Discover)
    - 20 PayPal Transfers 
    - 10 AMEX Gift Cards
  2. Countries
    - US, UK, Germany, Italy, Canada, Australia
  3. Features
    - All debit cards are 2D
    - High balances and competitive prices
    - Mobile money payment support
*/

-- Clear existing cards
DELETE FROM cards;

-- Insert Credit Cards (55 total)
INSERT INTO cards (title, description, price, balance, card_type, card_color, rating, country, is_available) VALUES
-- US Visa Cards (10)
('US Visa Debit Card #001', 'Darkweb visa debit card (2D) from US with $8,500 balance. High approval rate and instant delivery.', 45, 8500, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.8, 'us', true),
('US Visa Debit Card #002', 'Darkweb visa debit card (2D) from US with $12,000 balance. High approval rate and instant delivery.', 65, 12000, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.7, 'us', true),
('US Visa Debit Card #003', 'Darkweb visa debit card (2D) from US with $15,500 balance. High approval rate and instant delivery.', 85, 15500, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.9, 'us', true),
('US Visa Debit Card #004', 'Darkweb visa debit card (2D) from US with $9,200 balance. High approval rate and instant delivery.', 52, 9200, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.6, 'us', true),
('US Visa Debit Card #005', 'Darkweb visa debit card (2D) from US with $18,000 balance. High approval rate and instant delivery.', 95, 18000, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.8, 'us', true),
('US Visa Debit Card #006', 'Darkweb visa debit card (2D) from US with $7,800 balance. High approval rate and instant delivery.', 42, 7800, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.5, 'us', true),
('US Visa Debit Card #007', 'Darkweb visa debit card (2D) from US with $13,500 balance. High approval rate and instant delivery.', 72, 13500, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.7, 'us', true),
('US Visa Debit Card #008', 'Darkweb visa debit card (2D) from US with $11,200 balance. High approval rate and instant delivery.', 58, 11200, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.6, 'us', true),
('US Visa Debit Card #009', 'Darkweb visa debit card (2D) from US with $16,800 balance. High approval rate and instant delivery.', 88, 16800, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.9, 'us', true),
('US Visa Debit Card #010', 'Darkweb visa debit card (2D) from US with $14,300 balance. High approval rate and instant delivery.', 76, 14300, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.8, 'us', true),

-- UK Visa Cards (5)
('UK Visa Debit Card #001', 'Darkweb visa debit card (2D) from UK with $9,500 balance. High approval rate and instant delivery.', 48, 9500, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.7, 'uk', true),
('UK Visa Debit Card #002', 'Darkweb visa debit card (2D) from UK with $12,800 balance. High approval rate and instant delivery.', 68, 12800, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.8, 'uk', true),
('UK Visa Debit Card #003', 'Darkweb visa debit card (2D) from UK with $15,200 balance. High approval rate and instant delivery.', 82, 15200, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.9, 'uk', true),
('UK Visa Debit Card #004', 'Darkweb visa debit card (2D) from UK with $8,900 balance. High approval rate and instant delivery.', 45, 8900, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.6, 'uk', true),
('UK Visa Debit Card #005', 'Darkweb visa debit card (2D) from UK with $17,500 balance. High approval rate and instant delivery.', 92, 17500, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.8, 'uk', true),

-- Mastercard Cards (15)
('US Mastercard #001', 'Darkweb mastercard debit card (2D) from US with $10,500 balance. High approval rate and instant delivery.', 55, 10500, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.7, 'us', true),
('US Mastercard #002', 'Darkweb mastercard debit card (2D) from US with $13,200 balance. High approval rate and instant delivery.', 70, 13200, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.8, 'us', true),
('US Mastercard #003', 'Darkweb mastercard debit card (2D) from US with $16,800 balance. High approval rate and instant delivery.', 88, 16800, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.9, 'us', true),
('UK Mastercard #001', 'Darkweb mastercard debit card (2D) from UK with $11,800 balance. High approval rate and instant delivery.', 62, 11800, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.7, 'uk', true),
('UK Mastercard #002', 'Darkweb mastercard debit card (2D) from UK with $14,500 balance. High approval rate and instant delivery.', 78, 14500, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.8, 'uk', true),
('Germany Mastercard #001', 'Darkweb mastercard debit card (2D) from GERMANY with $9,800 balance. High approval rate and instant delivery.', 52, 9800, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.6, 'germany', true),
('Germany Mastercard #002', 'Darkweb mastercard debit card (2D) from GERMANY with $12,500 balance. High approval rate and instant delivery.', 66, 12500, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.7, 'germany', true),
('Italy Mastercard #001', 'Darkweb mastercard debit card (2D) from ITALY with $8,900 balance. High approval rate and instant delivery.', 48, 8900, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.5, 'italy', true),
('Italy Mastercard #002', 'Darkweb mastercard debit card (2D) from ITALY with $15,200 balance. High approval rate and instant delivery.', 82, 15200, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.8, 'italy', true),
('Canada Mastercard #001', 'Darkweb mastercard debit card (2D) from CANADA with $11,200 balance. High approval rate and instant delivery.', 58, 11200, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.7, 'canada', true),
('Canada Mastercard #002', 'Darkweb mastercard debit card (2D) from CANADA with $13,800 balance. High approval rate and instant delivery.', 74, 13800, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.8, 'canada', true),
('Australia Mastercard #001', 'Darkweb mastercard debit card (2D) from AUSTRALIA with $10,800 balance. High approval rate and instant delivery.', 56, 10800, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.6, 'australia', true),
('Australia Mastercard #002', 'Darkweb mastercard debit card (2D) from AUSTRALIA with $14,200 balance. High approval rate and instant delivery.', 76, 14200, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.8, 'australia', true),
('Australia Mastercard #003', 'Darkweb mastercard debit card (2D) from AUSTRALIA with $16,500 balance. High approval rate and instant delivery.', 86, 16500, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.9, 'australia', true),
('Australia Mastercard #004', 'Darkweb mastercard debit card (2D) from AUSTRALIA with $9,200 balance. High approval rate and instant delivery.', 50, 9200, 'mastercard', 'bg-gradient-to-br from-red-600 to-orange-600', 4.5, 'australia', true),

-- AMEX Cards (10)
('US AMEX #001', 'Darkweb amex debit card (2D) from US with $18,500 balance. High approval rate and instant delivery.', 95, 18500, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.9, 'us', true),
('US AMEX #002', 'Darkweb amex debit card (2D) from US with $22,000 balance. High approval rate and instant delivery.', 115, 22000, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.8, 'us', true),
('US AMEX #003', 'Darkweb amex debit card (2D) from US with $25,500 balance. High approval rate and instant delivery.', 135, 25500, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.9, 'us', true),
('UK AMEX #001', 'Darkweb amex debit card (2D) from UK with $19,800 balance. High approval rate and instant delivery.', 102, 19800, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.8, 'uk', true),
('UK AMEX #002', 'Darkweb amex debit card (2D) from UK with $21,200 balance. High approval rate and instant delivery.', 108, 21200, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.7, 'uk', true),
('Germany AMEX #001', 'Darkweb amex debit card (2D) from GERMANY with $17,500 balance. High approval rate and instant delivery.', 92, 17500, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.8, 'germany', true),
('Canada AMEX #001', 'Darkweb amex debit card (2D) from CANADA with $20,500 balance. High approval rate and instant delivery.', 105, 20500, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.9, 'canada', true),
('Canada AMEX #002', 'Darkweb amex debit card (2D) from CANADA with $23,800 balance. High approval rate and instant delivery.', 125, 23800, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.8, 'canada', true),
('Australia AMEX #001', 'Darkweb amex debit card (2D) from AUSTRALIA with $18,200 balance. High approval rate and instant delivery.', 96, 18200, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.7, 'australia', true),
('Australia AMEX #002', 'Darkweb amex debit card (2D) from AUSTRALIA with $24,500 balance. High approval rate and instant delivery.', 128, 24500, 'amex', 'bg-gradient-to-br from-green-600 to-teal-600', 4.9, 'australia', true),

-- UnionPay Cards (8)
('US UnionPay #001', 'Darkweb unionpay debit card (2D) from US with $12,500 balance. High approval rate and instant delivery.', 65, 12500, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.7, 'us', true),
('US UnionPay #002', 'Darkweb unionpay debit card (2D) from US with $15,800 balance. High approval rate and instant delivery.', 82, 15800, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.8, 'us', true),
('UK UnionPay #001', 'Darkweb unionpay debit card (2D) from UK with $13,200 balance. High approval rate and instant delivery.', 68, 13200, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.6, 'uk', true),
('Germany UnionPay #001', 'Darkweb unionpay debit card (2D) from GERMANY with $11,800 balance. High approval rate and instant delivery.', 62, 11800, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.7, 'germany', true),
('Italy UnionPay #001', 'Darkweb unionpay debit card (2D) from ITALY with $14,500 balance. High approval rate and instant delivery.', 75, 14500, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.8, 'italy', true),
('Canada UnionPay #001', 'Darkweb unionpay debit card (2D) from CANADA with $16,200 balance. High approval rate and instant delivery.', 85, 16200, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.9, 'canada', true),
('Australia UnionPay #001', 'Darkweb unionpay debit card (2D) from AUSTRALIA with $13,800 balance. High approval rate and instant delivery.', 72, 13800, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.7, 'australia', true),
('Australia UnionPay #002', 'Darkweb unionpay debit card (2D) from AUSTRALIA with $17,500 balance. High approval rate and instant delivery.', 92, 17500, 'unionpay', 'bg-gradient-to-br from-purple-600 to-indigo-600', 4.8, 'australia', true),

-- Discover Cards (7)
('US Discover #001', 'Darkweb discover debit card (2D) from US with $10,200 balance. High approval rate and instant delivery.', 54, 10200, 'discover', 'bg-gradient-to-br from-orange-600 to-red-600', 4.6, 'us', true),
('US Discover #002', 'Darkweb discover debit card (2D) from US with $13,500 balance. High approval rate and instant delivery.', 72, 13500, 'discover', 'bg-gradient-to-br from-orange-600 to-red-600', 4.7, 'us', true),
('US Discover #003', 'Darkweb discover debit card (2D) from US with $16,800 balance. High approval rate and instant delivery.', 88, 16800, 'discover', 'bg-gradient-to-br from-orange-600 to-red-600', 4.8, 'us', true),
('UK Discover #001', 'Darkweb discover debit card (2D) from UK with $11,500 balance. High approval rate and instant delivery.', 60, 11500, 'discover', 'bg-gradient-to-br from-orange-600 to-red-600', 4.7, 'uk', true),
('Canada Discover #001', 'Darkweb discover debit card (2D) from CANADA with $14,200 balance. High approval rate and instant delivery.', 76, 14200, 'discover', 'bg-gradient-to-br from-orange-600 to-red-600', 4.8, 'canada', true),
('Australia Discover #001', 'Darkweb discover debit card (2D) from AUSTRALIA with $12,800 balance. High approval rate and instant delivery.', 68, 12800, 'discover', 'bg-gradient-to-br from-orange-600 to-red-600', 4.6, 'australia', true),
('Australia Discover #002', 'Darkweb discover debit card (2D) from AUSTRALIA with $15,500 balance. High approval rate and instant delivery.', 82, 15500, 'discover', 'bg-gradient-to-br from-orange-600 to-red-600', 4.9, 'australia', true),

-- PayPal Transfers (20)
('PayPal Transfer $1000', 'Instant PayPal account transfer with $1000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 45, 1000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'us', true),
('PayPal Transfer $1500', 'Instant PayPal account transfer with $1500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 65, 1500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.7, 'us', true),
('PayPal Transfer $2000', 'Instant PayPal account transfer with $2000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 85, 2000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.9, 'us', true),
('PayPal Transfer $2500', 'Instant PayPal account transfer with $2500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 105, 2500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'us', true),
('PayPal Transfer $3000', 'Instant PayPal account transfer with $3000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 125, 3000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.9, 'us', true),
('PayPal Transfer $3500', 'Instant PayPal account transfer with $3500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 145, 3500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.7, 'uk', true),
('PayPal Transfer $4000', 'Instant PayPal account transfer with $4000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 165, 4000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'uk', true),
('PayPal Transfer $4500', 'Instant PayPal account transfer with $4500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 185, 4500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.9, 'uk', true),
('PayPal Transfer $5000', 'Instant PayPal account transfer with $5000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 205, 5000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'germany', true),
('PayPal Transfer $5500', 'Instant PayPal account transfer with $5500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 225, 5500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.7, 'germany', true),
('PayPal Transfer $6000', 'Instant PayPal account transfer with $6000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 245, 6000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.9, 'italy', true),
('PayPal Transfer $6500', 'Instant PayPal account transfer with $6500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 265, 6500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'italy', true),
('PayPal Transfer $7000', 'Instant PayPal account transfer with $7000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 285, 7000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.7, 'canada', true),
('PayPal Transfer $7500', 'Instant PayPal account transfer with $7500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 305, 7500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'canada', true),
('PayPal Transfer $8000', 'Instant PayPal account transfer with $8000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 325, 8000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.9, 'canada', true),
('PayPal Transfer $8500', 'Instant PayPal account transfer with $8500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 345, 8500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'australia', true),
('PayPal Transfer $9000', 'Instant PayPal account transfer with $9000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 365, 9000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.7, 'australia', true),
('PayPal Transfer $9500', 'Instant PayPal account transfer with $9500 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 385, 9500, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.9, 'australia', true),
('PayPal Transfer $10000', 'Instant PayPal account transfer with $10000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 405, 10000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.8, 'us', true),
('PayPal Transfer $12000', 'Instant PayPal account transfer with $12000 balance. Secure and anonymous transfer to your PayPal account. Funds available immediately after payment confirmation.', 485, 12000, 'paypal', 'bg-gradient-to-br from-blue-600 to-indigo-600', 4.9, 'us', true),

-- AMEX Gift Cards (10)
('AMEX Gift Card $1000', 'American Express gift card with $1000 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 42, 1000, 'amex-gift', 'bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400', 4.9, 'us', true),
('AMEX Gift Card $1500', 'American Express gift card with $1500 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 62, 1500, 'amex-gift', 'bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300', 4.8, 'us', true),
('AMEX Gift Card $2000', 'American Express gift card with $2000 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 82, 2000, 'amex-gift', 'bg-gradient-to-br from-green-400 via-blue-400 to-purple-400', 4.9, 'us', true),
('AMEX Gift Card $2500', 'American Express gift card with $2500 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 102, 2500, 'amex-gift', 'bg-gradient-to-br from-red-400 via-yellow-400 to-green-400', 4.8, 'uk', true),
('AMEX Gift Card $3000', 'American Express gift card with $3000 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 122, 3000, 'amex-gift', 'bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400', 4.9, 'uk', true),
('AMEX Gift Card $1200', 'American Express gift card with $1200 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 50, 1200, 'amex-gift', 'bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400', 4.7, 'germany', true),
('AMEX Gift Card $1800', 'American Express gift card with $1800 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 75, 1800, 'amex-gift', 'bg-gradient-to-br from-orange-400 via-red-400 to-purple-400', 4.8, 'italy', true),
('AMEX Gift Card $2200', 'American Express gift card with $2200 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 90, 2200, 'amex-gift', 'bg-gradient-to-br from-teal-400 via-blue-400 to-indigo-400', 4.9, 'canada', true),
('AMEX Gift Card $2800', 'American Express gift card with $2800 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 115, 2800, 'amex-gift', 'bg-gradient-to-br from-lime-400 via-green-400 to-emerald-400', 4.8, 'australia', true),
('AMEX Gift Card $3500', 'American Express gift card with $3500 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 142, 3500, 'amex-gift', 'bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400', 4.9, 'australia', true);