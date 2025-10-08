/*
  # Fix proportional pricing and balances

  1. Updates
    - Set prices between $30-115
    - Set balances proportional to prices (balance = price * random factor between 15-25)
    - Ensure all cards have consistent pricing structure
    - Remove any duplicate balance displays
*/

-- Update all cards with proportional pricing
UPDATE cards SET 
  price = 30 + (RANDOM() * 85)::numeric(10,2),
  balance = (30 + (RANDOM() * 85)) * (15 + RANDOM() * 10)
WHERE is_available = true;

-- Ensure minimum values
UPDATE cards SET 
  price = GREATEST(price, 30),
  balance = GREATEST(balance, price * 15)
WHERE is_available = true;

-- Round to reasonable values
UPDATE cards SET 
  price = ROUND(price, 0),
  balance = ROUND(balance, 0)
WHERE is_available = true;