/*
  # Reduce card prices and balances

  1. Updates
    - Reduce all card prices by 60-80%
    - Reduce all card balances by 50-70%
    - Make prices more realistic for darkweb marketplace
*/

-- Update credit/debit card prices (reduce by 70%)
UPDATE cards 
SET price = ROUND(price * 0.3, 0)
WHERE card_type IN ('visa', 'mastercard', 'amex', 'unionpay', 'discover');

-- Update PayPal transfer prices (reduce by 60%)
UPDATE cards 
SET price = ROUND(price * 0.4, 0)
WHERE card_type ILIKE '%paypal%';

-- Update gift card prices (reduce by 65%)
UPDATE cards 
SET price = ROUND(price * 0.35, 0)
WHERE card_type ILIKE '%gift%';

-- Update credit/debit card balances (reduce by 60%)
UPDATE cards 
SET balance = ROUND(balance * 0.4, 0)
WHERE card_type IN ('visa', 'mastercard', 'amex', 'unionpay', 'discover');

-- Update PayPal transfer balances (reduce by 50%)
UPDATE cards 
SET balance = ROUND(balance * 0.5, 0)
WHERE card_type ILIKE '%paypal%';

-- Update gift card balances (reduce by 55%)
UPDATE cards 
SET balance = ROUND(balance * 0.45, 0)
WHERE card_type ILIKE '%gift%';

-- Ensure minimum prices
UPDATE cards SET price = 15 WHERE price < 15;
UPDATE cards SET balance = 500 WHERE balance < 500;