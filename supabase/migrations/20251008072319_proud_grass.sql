/*
  # Update card distribution - More Visa/Mastercard, Less AMEX

  1. Changes
    - Remove excess AMEX cards
    - Add more Visa and Mastercard cards
    - Maintain total of 85 cards
    - Keep darkweb terminology and 2D descriptions

  2. New Distribution
    - 35 Visa cards (increased from 20)
    - 25 Mastercard cards (increased from 15) 
    - 5 AMEX cards (reduced from 10)
    - 20 PayPal transfers (unchanged)
*/

-- First, delete excess AMEX cards
DELETE FROM cards WHERE card_type = 'AMEX' AND id > (
  SELECT id FROM cards WHERE card_type = 'AMEX' ORDER BY id LIMIT 1 OFFSET 4
);

-- Add more Visa cards
INSERT INTO cards (title, description, price, balance, card_type, card_color, rating, country, is_available) VALUES
('US Visa Darkweb 2D #16', 'Premium US Visa debit card from darkweb sources. 2D technology with high spending limits. Perfect for online transactions.', 89, 4200, 'Visa', 'blue', 4.7, 'us', true),
('US Visa Darkweb 2D #17', 'Exclusive US Visa card with 2D security. High balance darkweb card with instant activation.', 95, 3800, 'Visa', 'blue', 4.6, 'us', true),
('US Visa Darkweb 2D #18', 'Premium darkweb US Visa with 2D chip. High limit card perfect for large transactions.', 110, 5200, 'Visa', 'blue', 4.8, 'us', true),
('US Visa Darkweb 2D #19', 'Elite US Visa from darkweb marketplace. 2D technology with maximum security and high balance.', 125, 6100, 'Visa', 'blue', 4.9, 'us', true),
('US Visa Darkweb 2D #20', 'Top-tier US Visa darkweb card. 2D chip technology with premium spending limits.', 98, 4500, 'Visa', 'blue', 4.7, 'us', true),

('UK Visa Darkweb 2D #6', 'Premium UK Visa from darkweb sources. 2D technology with high European spending limits.', 92, 3900, 'Visa', 'blue', 4.6, 'uk', true),
('UK Visa Darkweb 2D #7', 'Exclusive UK Visa darkweb card. 2D security with instant European transactions.', 88, 3600, 'Visa', 'blue', 4.5, 'uk', true),
('UK Visa Darkweb 2D #8', 'Elite UK Visa from darkweb marketplace. 2D chip with premium balance.', 105, 4800, 'Visa', 'blue', 4.8, 'uk', true),
('UK Visa Darkweb 2D #9', 'Top UK Visa darkweb card. 2D technology with maximum European limits.', 115, 5400, 'Visa', 'blue', 4.9, 'uk', true),
('UK Visa Darkweb 2D #10', 'Premium UK Visa with 2D security. High balance darkweb card for European use.', 96, 4200, 'Visa', 'blue', 4.7, 'uk', true),

('Germany Visa Darkweb 2D #6', 'Premium German Visa from darkweb. 2D technology with high EU spending limits.', 90, 3700, 'Visa', 'blue', 4.6, 'germany', true),
('Germany Visa Darkweb 2D #7', 'Elite German Visa darkweb card. 2D chip with instant EU transactions.', 102, 4600, 'Visa', 'blue', 4.8, 'germany', true),
('Germany Visa Darkweb 2D #8', 'Top German Visa from darkweb sources. 2D security with premium balance.', 108, 5100, 'Visa', 'blue', 4.8, 'germany', true),
('Germany Visa Darkweb 2D #9', 'Premium German Visa darkweb card. 2D technology with maximum EU limits.', 94, 4000, 'Visa', 'blue', 4.7, 'germany', true),
('Germany Visa Darkweb 2D #10', 'Exclusive German Visa with 2D chip. High balance darkweb card for EU use.', 99, 4400, 'Visa', 'blue', 4.7, 'germany', true);

-- Add more Mastercard cards  
INSERT INTO cards (title, description, price, balance, card_type, card_color, rating, country, is_available) VALUES
('US Mastercard Darkweb 2D #11', 'Premium US Mastercard from darkweb. 2D technology with high spending limits.', 87, 4100, 'Mastercard', 'red', 4.6, 'us', true),
('US Mastercard Darkweb 2D #12', 'Elite US Mastercard darkweb card. 2D chip with instant activation.', 93, 3900, 'Mastercard', 'red', 4.7, 'us', true),
('US Mastercard Darkweb 2D #13', 'Top US Mastercard from darkweb sources. 2D security with premium balance.', 101, 4700, 'Mastercard', 'red', 4.8, 'us', true),
('US Mastercard Darkweb 2D #14', 'Premium US Mastercard darkweb card. 2D technology with maximum limits.', 112, 5300, 'Mastercard', 'red', 4.9, 'us', true),
('US Mastercard Darkweb 2D #15', 'Exclusive US Mastercard with 2D chip. High balance darkweb card.', 96, 4300, 'Mastercard', 'red', 4.7, 'us', true),

('UK Mastercard Darkweb 2D #6', 'Premium UK Mastercard from darkweb. 2D technology with high EU limits.', 89, 3800, 'Mastercard', 'red', 4.6, 'uk', true),
('UK Mastercard Darkweb 2D #7', 'Elite UK Mastercard darkweb card. 2D chip with instant EU transactions.', 95, 4200, 'Mastercard', 'red', 4.7, 'uk', true),
('UK Mastercard Darkweb 2D #8', 'Top UK Mastercard from darkweb sources. 2D security with premium balance.', 103, 4900, 'Mastercard', 'red', 4.8, 'uk', true),
('UK Mastercard Darkweb 2D #9', 'Premium UK Mastercard darkweb card. 2D technology with maximum EU limits.', 107, 5200, 'Mastercard', 'red', 4.8, 'uk', true),
('UK Mastercard Darkweb 2D #10', 'Exclusive UK Mastercard with 2D chip. High balance darkweb card for EU use.', 91, 4000, 'Mastercard', 'red', 4.6, 'uk', true);