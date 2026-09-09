-- Card Ledger advanced non-financial features.
-- Apply after card-ledger-profiles.sql and card-ledger-data.sql.
-- Monetary valuation, marketplace sale history, accepted offers, bids, and
-- appraisals are intentionally excluded until verified marketplace feeds exist.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

alter table public.cards add column if not exists brand text not null default '';
alter table public.cards add column if not exists portfolio_id text not null default 'personal';
alter table public.cards add column if not exists revision bigint not null default 1 check (revision > 0);
alter table public.cards add column if not exists device_id text;
alter table public.cards add column if not exists deleted_at timestamptz;

create table if not exists public.portfolios (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  name text not null,
  portfolio_type text not null check (portfolio_type in ('personal', 'company', 'client', 'consignment', 'vault')),
  revision bigint not null default 1 check (revision > 0),
  device_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.card_copies (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  card_id text not null,
  serial_number text not null default '',
  certification text not null default '',
  grade text not null default '',
  location text not null default '',
  revision bigint not null default 1 check (revision > 0),
  device_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id),
  foreign key (user_id, card_id) references public.cards(user_id, id) on delete cascade
);

create table if not exists public.watchlist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  card_query text not null,
  priority text not null default 'Normal' check (priority in ('High', 'Normal', 'Low')),
  in_app_enabled boolean not null default true,
  browser_enabled boolean not null default false,
  email_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.notifications (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  title text not null,
  body text not null,
  notification_type text not null default 'in_app',
  read_at timestamptz,
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.saved_views (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  name text not null,
  filters jsonb not null default '{}'::jsonb check (jsonb_typeof(filters) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.activity_events (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  summary text not null,
  detail jsonb not null default '{}'::jsonb check (jsonb_typeof(detail) = 'object'),
  device_id text,
  occurred_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.provenance_events (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  card_id text,
  event_date date not null,
  event_type text not null,
  source_or_custodian text not null default '',
  disclosure text not null,
  document_path text,
  device_id text,
  created_at timestamptz not null default now(),
  primary key (user_id, id),
  foreign key (user_id, card_id) references public.cards(user_id, id) on delete set null (card_id)
);

create table if not exists public.private_documents (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  storage_path text not null,
  original_name text not null,
  content_type text not null default 'application/octet-stream',
  encryption_version text not null default 'aes-gcm-pbkdf2-v1',
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.device_sessions (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  device_id text not null,
  display_name text not null,
  auth_session_id uuid,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  revoked_at timestamptz,
  primary key (user_id, id),
  unique (user_id, device_id)
);

create table if not exists public.sync_tombstones (
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,
  entity_id text not null,
  revision bigint not null default 1 check (revision > 0),
  device_id text,
  deleted_at timestamptz not null default now(),
  primary key (user_id, entity_type, entity_id)
);

create table if not exists public.collector_verifications (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  subject_name text not null,
  verification_type text not null,
  evidence_note text not null default '',
  status text not null default 'recorded' check (status in ('recorded', 'expired', 'revoked')),
  created_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.deal_contracts (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  title text not null,
  participants text not null,
  inspection_required boolean not null default true,
  authenticity_required boolean not null default true,
  tracked_shipping_required boolean not null default true,
  terms text not null default '',
  status text not null default 'draft' check (status in ('draft', 'shared', 'agreed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.auction_calendar (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  platform text not null,
  event_title text not null,
  event_date date not null,
  workflow_status text not null,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists cards_owner_portfolio_created_idx on public.cards (user_id, portfolio_id, created_at desc) where deleted_at is null;
create index if not exists cards_owner_player_search_idx on public.cards (user_id, lower(player) text_pattern_ops) where deleted_at is null;
create index if not exists cards_owner_brand_search_idx on public.cards (user_id, lower(brand) text_pattern_ops) where deleted_at is null;
create index if not exists cards_owner_set_search_idx on public.cards (user_id, lower(set_name) text_pattern_ops) where deleted_at is null;
create index if not exists card_copies_owner_card_idx on public.card_copies (user_id, card_id);
create index if not exists watchlist_owner_priority_idx on public.watchlist_items (user_id, priority, created_at desc);
create index if not exists notifications_owner_unread_idx on public.notifications (user_id, created_at desc) where read_at is null;
create index if not exists activity_owner_time_idx on public.activity_events (user_id, occurred_at desc);
create index if not exists provenance_owner_card_date_idx on public.provenance_events (user_id, card_id, event_date desc);
create index if not exists auction_owner_date_idx on public.auction_calendar (user_id, event_date);

create or replace function private.reject_immutable_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception '% is append-only', tg_table_name using errcode = '55000';
end;
$$;

create or replace function private.keep_newest_card_revision()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.revision < old.revision then
    return old;
  end if;
  if new.revision = old.revision and new.updated_at < old.updated_at then
    return old;
  end if;
  return new;
end;
$$;

drop trigger if exists cards_keep_newest_revision on public.cards;
create trigger cards_keep_newest_revision before update on public.cards
for each row execute function private.keep_newest_card_revision();

drop trigger if exists activity_events_immutable on public.activity_events;
create trigger activity_events_immutable before update or delete on public.activity_events
for each row execute function private.reject_immutable_change();

drop trigger if exists provenance_events_immutable on public.provenance_events;
create trigger provenance_events_immutable before update or delete on public.provenance_events
for each row execute function private.reject_immutable_change();

do $$
declare table_name text;
begin
  foreach table_name in array array[
    'portfolios', 'card_copies', 'watchlist_items', 'notifications', 'saved_views',
    'activity_events', 'provenance_events', 'private_documents', 'device_sessions',
    'sync_tombstones', 'collector_verifications', 'deal_contracts', 'auction_calendar'
  ] loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_owner_select', table_name);
    execute format('create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id)', table_name || '_owner_select', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_owner_insert', table_name);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', table_name || '_owner_insert', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_owner_update', table_name);
    execute format('create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', table_name || '_owner_update', table_name);
    execute format('drop policy if exists %I on public.%I', table_name || '_owner_delete', table_name);
    execute format('create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = user_id)', table_name || '_owner_delete', table_name);
    execute format('revoke all on public.%I from anon, authenticated', table_name);
    execute format('grant select, insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end $$;

-- Indexed server-side collection paging. RLS plus the explicit owner predicate
-- keep every page scoped to the signed-in collector.
create or replace function public.search_collection_page(
  portfolio text default 'personal',
  search_text text default '',
  sport_filter text default '',
  page_number integer default 1,
  page_size integer default 24
)
returns table (records jsonb, total_count bigint)
language sql
stable
security invoker
set search_path = ''
as $$
  with filtered as (
    select c.*
    from public.cards c
    where c.user_id = (select auth.uid())
      and c.deleted_at is null
      and c.portfolio_id = portfolio
      and (sport_filter = '' or c.sport = sport_filter)
      and (
        search_text = '' or
        lower(c.player) like '%' || lower(search_text) || '%' or
        lower(c.brand) like '%' || lower(search_text) || '%' or
        lower(c.set_name) like '%' || lower(search_text) || '%' or
        lower(c.parallel) like '%' || lower(search_text) || '%' or
        lower(c.card_number) like '%' || lower(search_text) || '%'
      )
  ), page_rows as (
    select to_jsonb(f) as record
    from filtered f
    order by f.created_at desc, f.id
    limit least(greatest(page_size, 1), 100)
    offset (greatest(page_number, 1) - 1) * least(greatest(page_size, 1), 100)
  )
  select coalesce(jsonb_agg(page_rows.record), '[]'::jsonb), (select count(*) from filtered)
  from page_rows;
$$;

revoke all on function public.search_collection_page(text, text, text, integer, integer) from public, anon;
grant execute on function public.search_collection_page(text, text, text, integer, integer) to authenticated;

-- Private encrypted document bucket. The browser encrypts before upload.
insert into storage.buckets (id, name, public)
values ('private-documents', 'private-documents', false)
on conflict (id) do update set public = false;

drop policy if exists "private_documents_owner_select" on storage.objects;
create policy "private_documents_owner_select" on storage.objects for select to authenticated
using (bucket_id = 'private-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "private_documents_owner_insert" on storage.objects;
create policy "private_documents_owner_insert" on storage.objects for insert to authenticated
with check (bucket_id = 'private-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "private_documents_owner_delete" on storage.objects;
create policy "private_documents_owner_delete" on storage.objects for delete to authenticated
using (bucket_id = 'private-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

revoke execute on function private.reject_immutable_change() from public, anon, authenticated;
revoke execute on function private.keep_newest_card_revision() from public, anon, authenticated;
