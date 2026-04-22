/*
  # Add user passwords table

  1. New Tables
    - `user_passwords`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `password` (text, plain text password storage)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `user_passwords` table
    - Add policy for admins to view all passwords
    - Add policy for users to view their own password
*/

CREATE TABLE IF NOT EXISTS user_passwords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  password text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_passwords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all passwords"
  ON user_passwords FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Users can view own password"
  ON user_passwords FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own password"
  ON user_passwords FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can update any password"
  ON user_passwords FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );
