/*
  # Create cards table

  1. New Tables
    - `cards`
      - `id` (bigint, primary key, auto-increment) - Unique card identifier
      - `title` (text) - Card title/name
      - `description` (text) - Card description
      - `price` (numeric) - Price in USD
      - `balance` (numeric) - Card balance/limit
      - `card_type` (text) - Card type (visa, mastercard, amex, etc.)
      - `card_color` (text) - Visual color for card display
      - `rating` (numeric) - Card rating (1-5)
      - `country` (text) - Card origin country
      - `is_available` (boolean) - Availability status
      - `created_at` (timestamptz) - Card creation timestamp

  2. Security
    - Enable RLS on `cards` table
    - Add policy for public read access to available cards
*/

CREATE TABLE IF NOT EXISTS cards (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  balance numeric NOT NULL DEFAULT 0,
  card_type text NOT NULL,
  card_color text NOT NULL DEFAULT 'blue',
  rating numeric NOT NULL DEFAULT 5,
  country text NOT NULL,
  is_available boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cards are viewable by everyone"
  ON cards
  FOR SELECT
  TO public
  USING (is_available = true);
