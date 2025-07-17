-- Update RLS policy to allow users to insert their own profiles or admins to insert profiles

DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id OR public.has_role('admin'));
