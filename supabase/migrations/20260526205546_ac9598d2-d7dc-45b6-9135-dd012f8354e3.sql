
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_staff(UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP POLICY "admissions public insert" ON public.admissions;
CREATE POLICY "admissions public insert" ON public.admissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(parent_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(phone) BETWEEN 3 AND 50
    AND length(grade) BETWEEN 1 AND 100
    AND (message IS NULL OR length(message) <= 2000)
  );
