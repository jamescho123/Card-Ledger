-- Online DIY card library and creator listings for Card Ledger.
-- Run after card-ledger-profiles.sql so private.set_updated_at() exists.

create table if not exists public.diy_cards (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  series text not null default '',
  player_subject text not null default '',
  parallel text not null default '',
  card_number text not null default '',
  print_run integer check (print_run is null or print_run > 0),
  finish text not null default '',
  title text not null default '',
  description text not null default '',
  front_image_data text,
  back_image_data text,
  raw_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.diy_listings (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  card_id text not null,
  listing_type text not null default 'showcase' check (listing_type in ('showcase', 'trade', 'sale')),
  asking_price numeric(14, 2) not null default 0 check (asking_price >= 0),
  wanted text not null default '',
  note text not null default '',
  location text not null default '',
  archived boolean not null default false,
  raw_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id),
  foreign key (user_id, card_id) references public.diy_cards(user_id, id) on delete cascade
);

create table if not exists public.diy_listing_requests (
  id uuid primary key,
  listing_user_id uuid not null references auth.users(id) on delete cascade,
  listing_id text not null,
  requester_id uuid not null references auth.users(id) on delete cascade,
  request_type text not null check (request_type in ('message', 'trade', 'purchase')),
  message text not null default '',
  created_at timestamptz not null default now(),
  foreign key (listing_user_id, listing_id) references public.diy_listings(user_id, id) on delete cascade
);

create index if not exists diy_cards_owner_created_idx on public.diy_cards (user_id, created_at desc);
create index if not exists diy_cards_identity_idx on public.diy_cards (series, player_subject, parallel);
create index if not exists diy_listings_active_created_idx
  on public.diy_listings (created_at desc)
  where archived = false;
create index if not exists diy_listings_card_idx on public.diy_listings (user_id, card_id);
create index if not exists diy_listing_requests_listing_idx
  on public.diy_listing_requests (listing_user_id, listing_id);
create index if not exists diy_listing_requests_owner_idx on public.diy_listing_requests (listing_user_id, created_at desc);
create index if not exists diy_listing_requests_requester_idx on public.diy_listing_requests (requester_id, created_at desc);

alter table public.diy_cards enable row level security;
alter table public.diy_listings enable row level security;
alter table public.diy_listing_requests enable row level security;

drop trigger if exists set_diy_cards_updated_at on public.diy_cards;
create trigger set_diy_cards_updated_at
before update on public.diy_cards
for each row execute function private.set_updated_at();

drop trigger if exists set_diy_listings_updated_at on public.diy_listings;
create trigger set_diy_listings_updated_at
before update on public.diy_listings
for each row execute function private.set_updated_at();

drop policy if exists diy_cards_select_owner_or_listed on public.diy_cards;
create policy diy_cards_select_owner_or_listed
on public.diy_cards for select
to anon, authenticated
using (
  (select auth.uid()) = user_id
  or exists (
    select 1
    from public.diy_listings
    where diy_listings.user_id = diy_cards.user_id
      and diy_listings.card_id = diy_cards.id
      and diy_listings.archived = false
  )
);

drop policy if exists diy_cards_insert_owner on public.diy_cards;
create policy diy_cards_insert_owner
on public.diy_cards for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists diy_cards_update_owner on public.diy_cards;
create policy diy_cards_update_owner
on public.diy_cards for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists diy_cards_delete_owner on public.diy_cards;
create policy diy_cards_delete_owner
on public.diy_cards for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists diy_listings_select_active_or_owner on public.diy_listings;
create policy diy_listings_select_active_or_owner
on public.diy_listings for select
to anon, authenticated
using (archived = false or (select auth.uid()) = user_id);

drop policy if exists diy_listings_insert_owner on public.diy_listings;
create policy diy_listings_insert_owner
on public.diy_listings for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists diy_listings_update_owner on public.diy_listings;
create policy diy_listings_update_owner
on public.diy_listings for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists diy_listings_delete_owner on public.diy_listings;
create policy diy_listings_delete_owner
on public.diy_listings for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists diy_requests_select_participants on public.diy_listing_requests;
create policy diy_requests_select_participants
on public.diy_listing_requests for select
to authenticated
using ((select auth.uid()) in (listing_user_id, requester_id));

drop policy if exists diy_requests_insert_requester on public.diy_listing_requests;
create policy diy_requests_insert_requester
on public.diy_listing_requests for insert
to authenticated
with check ((select auth.uid()) = requester_id);

revoke all on public.diy_cards, public.diy_listings, public.diy_listing_requests from anon, authenticated;
grant select on public.diy_cards, public.diy_listings to anon;
grant select, insert, update, delete on public.diy_cards, public.diy_listings to authenticated;
grant select, insert on public.diy_listing_requests to authenticated;
