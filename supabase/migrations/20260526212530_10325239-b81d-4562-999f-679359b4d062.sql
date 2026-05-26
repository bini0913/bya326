-- Expand admission_status with international-school pipeline stages
ALTER TYPE public.admission_status ADD VALUE IF NOT EXISTS 'application_submitted';
ALTER TYPE public.admission_status ADD VALUE IF NOT EXISTS 'documents_received';
ALTER TYPE public.admission_status ADD VALUE IF NOT EXISTS 'interview_scheduled';
ALTER TYPE public.admission_status ADD VALUE IF NOT EXISTS 'interview_completed';
ALTER TYPE public.admission_status ADD VALUE IF NOT EXISTS 'offer_sent';
ALTER TYPE public.admission_status ADD VALUE IF NOT EXISTS 'enrolled';
ALTER TYPE public.admission_status ADD VALUE IF NOT EXISTS 'withdrawn';

-- Add applicant/student detail columns
ALTER TABLE public.admissions
  ADD COLUMN IF NOT EXISTS student_name text,
  ADD COLUMN IF NOT EXISTS student_dob date,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS nationality text,
  ADD COLUMN IF NOT EXISTS current_school text,
  ADD COLUMN IF NOT EXISTS prior_curriculum text,
  ADD COLUMN IF NOT EXISTS languages_spoken text,
  ADD COLUMN IF NOT EXISTS preferred_start_date date,
  ADD COLUMN IF NOT EXISTS assigned_to uuid,
  ADD COLUMN IF NOT EXISTS interview_at timestamptz,
  ADD COLUMN IF NOT EXISTS interview_notes text,
  ADD COLUMN IF NOT EXISTS decision_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- Trigger to keep updated_at fresh
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS admissions_touch_updated_at ON public.admissions;
CREATE TRIGGER admissions_touch_updated_at
BEFORE UPDATE ON public.admissions
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Drop old insert policy and recreate to also bound new optional text fields
DROP POLICY IF EXISTS "admissions public insert" ON public.admissions;
CREATE POLICY "admissions public insert" ON public.admissions
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(parent_name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320
  AND length(phone) BETWEEN 3 AND 50
  AND length(grade) BETWEEN 1 AND 100
  AND (message IS NULL OR length(message) <= 2000)
  AND (student_name IS NULL OR length(student_name) BETWEEN 1 AND 200)
  AND (nationality IS NULL OR length(nationality) <= 100)
  AND (current_school IS NULL OR length(current_school) <= 200)
  AND (prior_curriculum IS NULL OR length(prior_curriculum) <= 100)
  AND (languages_spoken IS NULL OR length(languages_spoken) <= 200)
  AND (gender IS NULL OR length(gender) <= 20)
);
