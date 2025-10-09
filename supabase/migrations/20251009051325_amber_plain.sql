/*
  # Create screenshot submissions table

  1. New Tables
    - `screenshot_submissions`
      - `id` (bigint, primary key)
      - `customer_email` (text)
      - `order_details` (text)
      - `file_name` (text)
      - `file_size` (bigint)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `screenshot_submissions` table
    - Add policy for admins to read all submissions
*/

CREATE TABLE IF NOT EXISTS screenshot_submissions (
  id bigserial PRIMARY KEY,
  customer_email text NOT NULL,
  order_details text,
  file_name text NOT NULL,
  file_size bigint NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE screenshot_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all submissions"
  ON screenshot_submissions
  FOR SELECT
  TO authenticated
  USING (true);