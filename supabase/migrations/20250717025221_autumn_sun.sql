/*
  # Seed Cards Data

  1. Insert sample cards data
    - Credit cards from different countries
    - PayPal transfers
    - AMEX gift cards
*/

-- Insert sample cards
INSERT INTO cards (title, description, price, balance, card_type, card_color, rating, country) VALUES
-- Visa Cards
('Visa US Card', 'Darkweb visa debit card (2D) from US with $5,000 balance. High approval rate and instant delivery.', 150, 5000, 'visa', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.5, 'us'),
('Visa UK Card', 'Darkweb visa debit card (2D) from UK with $3,500 balance. High approval rate and instant delivery.', 120, 3500, 'visa', 'bg-gradient-to-br from-purple-600 to-purple-800', 4.3, 'uk'),
('Visa Germany Card', 'Darkweb visa debit card (2D) from GERMANY with $7,200 balance. High approval rate and instant delivery.', 200, 7200, 'visa', 'bg-gradient-to-br from-green-600 to-green-800', 4.7, 'germany'),
('Visa Canada Card', 'Darkweb visa debit card (2D) from CANADA with $4,800 balance. High approval rate and instant delivery.', 140, 4800, 'visa', 'bg-gradient-to-br from-red-600 to-red-800', 4.4, 'canada'),

-- Mastercard Cards
('Mastercard US Card', 'Darkweb mastercard debit card (2D) from US with $6,500 balance. High approval rate and instant delivery.', 180, 6500, 'mastercard', 'bg-gradient-to-br from-indigo-600 to-indigo-800', 4.6, 'us'),
('Mastercard UK Card', 'Darkweb mastercard debit card (2D) from UK with $4,200 balance. High approval rate and instant delivery.', 130, 4200, 'mastercard', 'bg-gradient-to-br from-pink-600 to-pink-800', 4.2, 'uk'),
('Mastercard Germany Card', 'Darkweb mastercard debit card (2D) from GERMANY with $8,100 balance. High approval rate and instant delivery.', 220, 8100, 'mastercard', 'bg-gradient-to-br from-yellow-600 to-yellow-800', 4.8, 'germany'),

-- AMEX Cards
('Amex US Card', 'Darkweb amex debit card (2D) from US with $12,000 balance. High approval rate and instant delivery.', 350, 12000, 'amex', 'bg-gradient-to-br from-teal-600 to-teal-800', 4.9, 'us'),
('Amex UK Card', 'Darkweb amex debit card (2D) from UK with $9,500 balance. High approval rate and instant delivery.', 280, 9500, 'amex', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.7, 'uk'),

-- PayPal Transfers
('PayPal Transfer $1500', 'Verified PayPal account with $1,500 transfer limit. Instant access after payment confirmation.', 80, 1500, 'paypal', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.5, 'us'),
('PayPal Transfer $2000', 'Verified PayPal account with $2,000 transfer limit. Instant access after payment confirmation.', 100, 2000, 'paypal', 'bg-gradient-to-br from-indigo-600 to-indigo-800', 4.6, 'us'),
('PayPal Transfer $2500', 'Verified PayPal account with $2,500 transfer limit. Instant access after payment confirmation.', 120, 2500, 'paypal', 'bg-gradient-to-br from-purple-600 to-purple-800', 4.7, 'us'),

-- AMEX Gift Cards
('AMEX Gift Card $1000', 'American Express gift card with $1,000 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 50, 1000, 'amex-gift', 'bg-gradient-to-br from-blue-600 to-blue-800', 4.9, 'us'),
('AMEX Gift Card $1500', 'American Express gift card with $1,500 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 70, 1500, 'amex-gift', 'bg-gradient-to-br from-purple-600 to-purple-800', 4.8, 'us'),
('AMEX Gift Card $2000', 'American Express gift card with $2,000 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 90, 2000, 'amex-gift', 'bg-gradient-to-br from-green-600 to-green-800', 4.9, 'us'),
('AMEX Gift Card $2500', 'American Express gift card with $2,500 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 110, 2500, 'amex-gift', 'bg-gradient-to-br from-red-600 to-red-800', 4.8, 'us'),
('AMEX Gift Card $3000', 'American Express gift card with $3,000 balance. The safest product in carding! Cards can be used virtually anywhere American Express is accepted worldwide. Gift card funds do not expire, no fees after purchase.', 130, 3000, 'amex-gift', 'bg-gradient-to-br from-orange-600 to-orange-800', 4.9, 'us');