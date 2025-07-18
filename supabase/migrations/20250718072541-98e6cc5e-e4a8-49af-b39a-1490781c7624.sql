-- Disable email confirmation for faster signup during development
UPDATE auth.config 
SET 
  enable_confirmations = false,
  enable_signup = true
WHERE id = 'auth';