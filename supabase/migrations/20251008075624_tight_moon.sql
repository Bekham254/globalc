/*
  # Adjust card prices and balances

  1. Price Updates
    - Set prices between $30-115 for all cards
    - Different ranges for different card types
  
  2. Balance Updates  
    - Set balances between $440-2230 for all cards
    - Ensure balances are higher than prices
*/

-- Update credit/debit cards (Visa, Mastercard, etc.)
UPDATE cards 
SET 
  price = 30 + (RANDOM() * 85)::int,  -- $30-115
  balance = 440 + (RANDOM() * 1790)::int  -- $440-2230
WHERE card_type IN ('visa', 'mastercard', 'unionpay', 'discover');

-- Update AMEX cards
UPDATE cards 
SET 
  price = 35 + (RANDOM() * 80)::int,  -- $35-115
  balance = 500 + (RANDOM() * 1730)::int  -- $500-2230
WHERE card_type = 'amex';

-- Update PayPal transfers
UPDATE cards 
SET 
  price = 30 + (RANDOM() * 85)::int,  -- $30-115
  balance = 440 + (RANDOM() * 1790)::int  -- $440-2230
WHERE card_type LIKE '%paypal%';

-- Update Gift cards
UPDATE cards 
SET 
  price = 32 + (RANDOM() * 83)::int,  -- $32-115
  balance = 450 + (RANDOM() * 1780)::int  -- $450-2230
WHERE card_type LIKE '%gift%';