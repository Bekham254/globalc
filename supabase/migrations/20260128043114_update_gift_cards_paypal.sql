/*
  # Update gift cards and PayPal transfers

  This migration:
  1. Removes country field from gift cards and PayPal transfers
  2. Keeps only specific gift cards: Amazon, Apple, eBay, Google Play, iTunes
  3. Makes gift card prices match their value
*/

DELETE FROM cards WHERE card_type IN ('gift card', 'paypal');

INSERT INTO cards (title, description, price, balance, card_type, card_color, rating, country, is_available) VALUES
('PayPal Transfer $400', 'PayPal balance transfer', 35, 400, 'paypal', 'blue', 4.9, 'us', true),
('PayPal Transfer $550', 'PayPal balance transfer', 48, 550, 'paypal', 'blue', 4.9, 'us', true),
('PayPal Transfer $480', 'PayPal balance transfer', 42, 480, 'paypal', 'blue', 4.8, 'us', true),
('PayPal Transfer $520', 'PayPal balance transfer', 45, 520, 'paypal', 'blue', 4.8, 'us', true),
('Amazon $25', 'Amazon gift card', 25, 25, 'gift card', 'orange', 4.9, 'us', true),
('Amazon $50', 'Amazon gift card', 50, 50, 'gift card', 'orange', 4.9, 'us', true),
('Amazon $100', 'Amazon gift card', 85, 100, 'gift card', 'orange', 4.9, 'us', true),
('Apple $25', 'Apple gift card', 25, 25, 'gift card', 'gray', 4.8, 'us', true),
('Apple $50', 'Apple gift card', 50, 50, 'gift card', 'gray', 4.8, 'us', true),
('Apple $100', 'Apple gift card', 85, 100, 'gift card', 'gray', 4.8, 'us', true),
('eBay $25', 'eBay gift card', 25, 25, 'gift card', 'red', 4.7, 'us', true),
('eBay $50', 'eBay gift card', 50, 50, 'gift card', 'red', 4.7, 'us', true),
('eBay $100', 'eBay gift card', 85, 100, 'gift card', 'red', 4.7, 'us', true),
('Google Play $25', 'Google Play gift card', 25, 25, 'gift card', 'multicolor', 4.7, 'us', true),
('Google Play $50', 'Google Play gift card', 50, 50, 'gift card', 'multicolor', 4.7, 'us', true),
('Google Play $100', 'Google Play gift card', 85, 100, 'gift card', 'multicolor', 4.7, 'us', true),
('iTunes $25', 'iTunes gift card', 25, 25, 'gift card', 'purple', 4.8, 'us', true),
('iTunes $50', 'iTunes gift card', 50, 50, 'gift card', 'purple', 4.8, 'us', true),
('iTunes $100', 'iTunes gift card', 85, 100, 'gift card', 'purple', 4.8, 'us', true);
