/*
  # Create CardVault Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `created_at` (timestamp)
    
    - `cards`
      - `id` (bigint, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `balance` (numeric)
      - `card_type` (text)
      - `card_color` (text)
      - `rating` (numeric)
      - `country` (text)
      - `is_available` (boolean, default true)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (bigint, primary key)
      - `user_id` (uuid, foreign key to users)
      - `card_id` (bigint, foreign key to cards)
      - `amount` (numeric)
      - `payment_method` (text)
      - `payment_status` (text, default 'pending')
      - `screenshot_url` (text, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create cards table
CREATE TABLE IF NOT EXISTS cards (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  balance numeric NOT NULL,
  card_type text NOT NULL,
  card_color text NOT NULL,
  rating numeric NOT NULL DEFAULT 4.5,
  country text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  card_id bigint REFERENCES cards(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  payment_method text NOT NULL,
  payment_status text DEFAULT 'pending',
  screenshot_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Cards policies (public read, admin write)
CREATE POLICY "Anyone can read available cards"
  ON cards
  FOR SELECT
  TO anon, authenticated
  USING (is_available = true);

-- Orders policies
CREATE POLICY "Users can read own orders"
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
  USING (auth.uid() = user_id);