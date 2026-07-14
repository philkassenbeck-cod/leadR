-- ============================================================================
-- LeadR — Limite d'usage anti-« aspirateur »
-- Plafond de messages/jour PAR utilisateur, appliqué côté serveur dans /api/chat.
-- À exécuter dans Supabase → SQL editor (d'un bloc). Idempotent.
--
-- Tant que ce script n'est pas lancé, l'app fonctionne quand même :
-- /api/chat exige déjà une connexion (auth) ; la limite s'active dès que la
-- fonction ci-dessous existe.
-- ============================================================================

-- Compteur : 1 ligne par (utilisateur, jour)
create table if not exists public.chat_usage (
  user_id uuid    not null references auth.users(id) on delete cascade,
  day     date    not null default (now() at time zone 'utc')::date,
  count   integer not null default 0,
  primary key (user_id, day)
);

-- RLS activée : la table n'est manipulée QUE par la fonction ci-dessous
-- (security definer). Aucune policy directe → inaccessible en lecture/écriture
-- pour les utilisateurs.
alter table public.chat_usage enable row level security;

-- Incrémente le compteur du jour et dit si l'utilisateur est ENCORE dans la limite.
create or replace function public.record_chat_usage(p_limit integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid   uuid := auth.uid();
  v_count integer;
begin
  if v_uid is null then
    return false; -- pas d'utilisateur authentifié → refusé
  end if;

  insert into public.chat_usage (user_id, day, count)
  values (v_uid, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day)
  do update set count = public.chat_usage.count + 1
  returning count into v_count;

  return v_count <= p_limit; -- true = OK, false = limite dépassée
end;
$$;

grant execute on function public.record_chat_usage(integer) to authenticated;

-- Vérif (facultatif) :
--   select public.record_chat_usage(80);  -- doit renvoyer true la 1re fois
