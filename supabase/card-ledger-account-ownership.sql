-- Account ownership and accurate social counts for Card Ledger.
-- Apply after card-ledger-profiles.sql and card-ledger-data.sql.

insert into public.profiles (id, email, name, role)
select
  users.id,
  lower(users.email),
  coalesce(nullif(users.raw_user_meta_data ->> 'name', ''), lower(users.email), 'Collector'),
  case when lower(users.email) = 'jamescho@jumbosoft.com' then 'admin' else 'collector' end
from auth.users as users
on conflict (id) do update
set
  email = excluded.email,
  role = case when excluded.email = 'jamescho@jumbosoft.com' then 'admin' else public.profiles.role end,
  updated_at = now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'cards_profile_fkey'
      and conrelid = 'public.cards'::regclass
  ) then
    alter table public.cards
      add constraint cards_profile_fkey
      foreign key (user_id) references public.profiles(id) on delete cascade;
  end if;
end
$$;

create table if not exists public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id <> following_id)
);

create index if not exists follows_following_created_idx
  on public.follows (following_id, created_at desc);

alter table public.follows enable row level security;

drop policy if exists "follows_select_participant" on public.follows;
create policy "follows_select_participant"
on public.follows
for select
to authenticated
using (
  (select auth.uid()) = follower_id
  or (select auth.uid()) = following_id
);

drop policy if exists "follows_insert_self" on public.follows;
create policy "follows_insert_self"
on public.follows
for insert
to authenticated
with check ((select auth.uid()) = follower_id);

drop policy if exists "follows_delete_self" on public.follows;
create policy "follows_delete_self"
on public.follows
for delete
to authenticated
using ((select auth.uid()) = follower_id);

revoke all on public.follows from anon, authenticated;
grant select, insert, delete on public.follows to authenticated;
