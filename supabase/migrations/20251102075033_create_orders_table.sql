/*
  # Create orders table

  1. New Tables
    - `orders`
      - `id` (bigint, primary key, auto-increment) - Unique order identifier
      - `user_id` (uuid, foreign key) - Reference to user
      - `card_id` (bigint, foreign key) - Reference to card
      - `amount` (numeric) - Order amount in USD
      - `payment_method` (text) - Payment method used
      - `payment_status` (text) - Payment status (pending, completed, etc.)
      - `screenshot_url` (text, nullable) - URL to payment screenshot
      - `created_at` (timestamptz) - Order creation timestamp

  2. Security
    - Enable RLS on `orders` table
    - Add policy for users to view their own orders
    - Add policy for users to create their own orders
    - Add policy for users to update their own orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id bigint NOT NULL REFERENCES cards(id) ON DELETE RESTRICT,
  amount numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'usdt',
  payment_status text NOT NULL DEFAULT 'pending',
  screenshot_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
