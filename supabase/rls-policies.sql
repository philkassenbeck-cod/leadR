-- ============================================================================
-- LeadR — Sécuriser le placard de fichiers (bucket storage `profiles`)
--
-- CONTEXTE (vérifié le 13/07/2026 dans le dashboard) :
--   • Tables profiles / conversations / messages : RLS owner-only DÉJÀ EN PLACE.
--     → RIEN à faire côté tables.
--   • Bucket `profiles` : PUBLIC + 0 policy → tout fichier est lisible via son lien.
--     → C'est le SEUL point à corriger, ci-dessous.
--
-- À exécuter dans Supabase → SQL editor, d'un seul bloc.
-- ⚠️ Déployer le code signed-URL (app/profile/page.tsx) AVANT ou en même temps :
--    une fois le bucket privé, les anciens liens publics renvoient 403 ; le code
--    fabrique alors un lien signé temporaire à la demande.
--
-- Chemin des fichiers : {userId}/{type}-{timestamp}.ext
--   → le 1er dossier du chemin doit être l'identifiant de l'utilisateur.
-- ============================================================================

-- 1) Le placard passe en PRIVÉ (plus de lecture par simple lien).
update storage.buckets set public = false where id = 'profiles';

-- 2) Chacun ne peut voir / déposer / modifier / supprimer QUE ses propres fichiers.
drop policy if exists "profiles_bucket_select_own" on storage.objects;
create policy "profiles_bucket_select_own" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "profiles_bucket_insert_own" on storage.objects;
create policy "profiles_bucket_insert_own" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "profiles_bucket_update_own" on storage.objects;
create policy "profiles_bucket_update_own" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "profiles_bucket_delete_own" on storage.objects;
create policy "profiles_bucket_delete_own" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'profiles'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

-- 3) Vérifs (facultatif, à lancer séparément) :
--   select id, public from storage.buckets where id = 'profiles';   -- public doit être false
--   select policyname, cmd from pg_policies
--     where tablename = 'objects' and policyname like 'profiles_bucket_%';
