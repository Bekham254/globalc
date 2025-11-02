/*
  # Create screenshot submissions table

  1. New Tables
    - `screenshot_submissions`
      - `id` (bigint, primary key, auto-increment) - Unique submission identifier
      - `customer_email` (text) - Customer email address
      - `order_details` (text) - Order details description
      - `file_name` (text) - Screenshot file name
      - `file_size` (bigint) - File size in bytes
      - `status` (text) - Submission status (pending_review, approved, rejected)
      - `created_at` (timestamptz) - Submission timestamp

  2. Security
    - Enable RLS on `screenshot_submissions` table
    - Add policy for public insert access (for anonymous submissions)
    - Add policy for authenticated users to view their own submissions
*/

CREATE TABLE IF NOT EXISTS screenshot_submissions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_email text NOT NULL DEFAULT 'anonymous@cardvault.com',
  order_details text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending_review',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE screenshot_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit screenshots"
  ON screenshot_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own submissions"
  ON screenshot_submissions
  FOR SELECT
  TO authenticated
  USING (customer_email = (SELECT email FROM auth.users WHERE id = auth.uid()));
