-- Verified marketplace sales imported from provider APIs or user-owned exports.
-- Apply after card-ledger-market-population.sql.
-- Buyer names, email addresses, shipping addresses, and payment details are never stored.

create table if not exists public.marketplace_sales_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('ebay', 'cardhobby', 'cardladder', 'market_movers')),
  record_scope text not null default 'personal_sale'
    check (record_scope in ('personal_sale', 'market_comp')),
  source_record_type text not null default 'file_import'
    check (source_record_type in ('seller_order_api', 'marketplace_insights_api', 'file_import', 'partner_api', 'licensed_api')),
  verification_status text not null default 'imported'
    check (verification_status in ('provider_verified', 'imported', 'user_confirmed')),
  external_order_id text not null default '',
  external_line_item_id text not null default '',
  external_item_id text not null default '',
  title text not null,
  year text not null default '',
  brand text not null default '',
  set_name text not null default '',
  player text not null default '',
  card_type text not null default '',
  parallel text not null default '',
  card_number text not null default '',
  grade text not null default '',
  certification text not null default '',
  sale_type text not null default 'unknown'
    check (sale_type in ('auction', 'fixed_price', 'accepted_offer', 'unknown')),
  transaction_status text not null default 'completed'
    check (transaction_status in ('completed', 'refunded', 'cancelled')),
  sold_at timestamptz not null,
  sale_price numeric(14, 2) not null check (sale_price >= 0),
  shipping_price numeric(14, 2) not null default 0 check (shipping_price >= 0),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  quantity integer not null default 1 check (quantity > 0),
  source_url text not null default '',
  source_fingerprint text not null,
  import_metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(import_metadata) = 'object'),
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider, source_fingerprint)
);

-- Keep previously deployed installations compatible with licensed trend providers.
alter table public.marketplace_sales_records
  drop constraint if exists marketplace_sales_records_provider_check;
alter table public.marketplace_sales_records
  add constraint marketplace_sales_records_provider_check
  check (provider in ('ebay', 'cardhobby', 'cardladder', 'market_movers'));
alter table public.marketplace_sales_records
  drop constraint if exists marketplace_sales_records_source_record_type_check;
alter table public.marketplace_sales_records
  add constraint marketplace_sales_records_source_record_type_check
  check (source_record_type in ('seller_order_api', 'marketplace_insights_api', 'file_import', 'partner_api', 'licensed_api'));

-- These two tables are accessed only by the service-role Edge Function.
-- Ciphertext is encrypted with MARKETPLACE_TOKEN_ENCRYPTION_KEY before insertion.
create table if not exists public.marketplace_oauth_states (
  state_hash text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('ebay')),
  return_url text not null default '',
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.marketplace_oauth_tokens (
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('ebay')),
  access_token_ciphertext text not null,
  refresh_token_ciphertext text not null,
  access_expires_at timestamptz not null,
  refresh_expires_at timestamptz,
  scopes text[] not null default '{}'::text[],
  external_account_label text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, provider)
);

create index if not exists marketplace_sales_user_date_idx
  on public.marketplace_sales_records (user_id, sold_at desc);
create index if not exists marketplace_sales_user_provider_idx
  on public.marketplace_sales_records (user_id, provider, sold_at desc);
create index if not exists marketplace_sales_title_trgm_idx
  on public.marketplace_sales_records using gin (lower(title) extensions.gin_trgm_ops);
create index if not exists marketplace_oauth_states_expiry_idx
  on public.marketplace_oauth_states (expires_at) where consumed_at is null;

alter table public.marketplace_sales_records enable row level security;
alter table public.marketplace_oauth_states enable row level security;
alter table public.marketplace_oauth_tokens enable row level security;

drop policy if exists marketplace_sales_owner_select on public.marketplace_sales_records;
create policy marketplace_sales_owner_select on public.marketplace_sales_records
for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists marketplace_sales_owner_insert on public.marketplace_sales_records;
create policy marketplace_sales_owner_insert on public.marketplace_sales_records
for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists marketplace_sales_owner_update on public.marketplace_sales_records;
create policy marketplace_sales_owner_update on public.marketplace_sales_records
for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
drop policy if exists marketplace_sales_owner_delete on public.marketplace_sales_records;
create policy marketplace_sales_owner_delete on public.marketplace_sales_records
for delete to authenticated using ((select auth.uid()) = user_id);

-- No user-facing policies are created for OAuth state or token tables.
revoke all on public.marketplace_sales_records from anon, authenticated;
grant select, insert, update, delete on public.marketplace_sales_records to authenticated;

revoke all on public.marketplace_oauth_states from public, anon, authenticated;
revoke all on public.marketplace_oauth_tokens from public, anon, authenticated;
grant select, insert, update, delete on public.marketplace_oauth_states to service_role;
grant select, insert, update, delete on public.marketplace_oauth_tokens to service_role;
