-- Cloud ledger storage for Card Ledger.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.cards (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  year text not null default '',
  brand text not null default '',
  set_name text not null default '',
  player text not null default '',
  card_type text not null default '',
  parallel text not null default '',
  card_number text not null default '',
  sport text not null default '',
  condition text not null default 'Raw',
  grade text not null default '',
  quantity integer not null default 1 check (quantity > 0),
  paid numeric(14, 2) not null default 0 check (paid >= 0),
  estimated_value numeric(14, 2) not null default 0 check (estimated_value >= 0),
  location text not null default '',
  notes text not null default '',
  image_url text,
  market_sales jsonb not null default '[]'::jsonb check (jsonb_typeof(market_sales) = 'array'),
  raw_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.trade_deals (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  trade_date date,
  counterparty text not null default '',
  outgoing_summary text not null default '',
  incoming_summary text not null default '',
  outgoing_value numeric(14, 2) not null default 0,
  incoming_value numeric(14, 2) not null default 0,
  trade_net_value numeric(14, 2) not null default 0,
  cash_paid numeric(14, 2) not null default 0 check (cash_paid >= 0),
  cash_received numeric(14, 2) not null default 0 check (cash_received >= 0),
  outgoing_cards jsonb not null default '[]'::jsonb check (jsonb_typeof(outgoing_cards) = 'array'),
  incoming_cards jsonb not null default '[]'::jsonb check (jsonb_typeof(incoming_cards) = 'array'),
  notes text not null default '',
  comments jsonb not null default '[]'::jsonb check (jsonb_typeof(comments) = 'array'),
  likes integer not null default 0 check (likes >= 0),
  wants integer not null default 0 check (wants >= 0),
  raw_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.collection_goals (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  title text not null default '',
  goal_type text not null default 'year',
  player text not null default '',
  set_name text not null default '',
  parallel text not null default '',
  season text not null default '',
  start_year integer,
  end_year integer,
  start_number integer,
  end_number integer,
  notes text not null default '',
  slots jsonb not null default '{}'::jsonb check (jsonb_typeof(slots) = 'object'),
  raw_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.community_posts (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  post_type text not null default 'showcase',
  body text not null default '',
  card_id text,
  image_url text,
  likes integer not null default 0 check (likes >= 0),
  wants integer not null default 0 check (wants >= 0),
  comments jsonb not null default '[]'::jsonb check (jsonb_typeof(comments) = 'array'),
  raw_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.deal_rooms (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  title text not null default '',
  participants jsonb not null default '[]'::jsonb check (jsonb_typeof(participants) = 'array'),
  offered_cards jsonb not null default '[]'::jsonb check (jsonb_typeof(offered_cards) = 'array'),
  requested_cards jsonb not null default '[]'::jsonb check (jsonb_typeof(requested_cards) = 'array'),
  cash_adjustment numeric(14, 2) not null default 0,
  messages jsonb not null default '[]'::jsonb check (jsonb_typeof(messages) = 'array'),
  status text not null default 'open' check (status in ('open', 'agreed', 'completed', 'cancelled')),
  raw_payload jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_payload) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create table if not exists public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  collection_privacy text not null default 'private' check (collection_privacy in ('private', 'friends', 'public')),
  language text not null default 'en',
  currency text not null default 'RMB',
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cards_user_created_idx on public.cards (user_id, created_at desc);
create index if not exists cards_user_player_idx on public.cards (user_id, player);
create index if not exists cards_user_brand_idx on public.cards (user_id, brand);
create index if not exists cards_user_set_idx on public.cards (user_id, set_name);
create index if not exists trade_deals_user_date_idx on public.trade_deals (user_id, trade_date desc);
create index if not exists collection_goals_user_created_idx on public.collection_goals (user_id, created_at desc);
create index if not exists community_posts_created_idx on public.community_posts (created_at desc);
create index if not exists deal_rooms_user_updated_idx on public.deal_rooms (user_id, updated_at desc);

do $$
declare
  table_name text;
begin
  foreach table_name in array array['cards', 'trade_deals', 'collection_goals', 'community_posts', 'deal_rooms', 'user_preferences']
  loop
    execute format('alter table public.%I enable row level security', table_name);
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format(
      'create trigger set_%I_updated_at before update on public.%I for each row execute function private.set_updated_at()',
      table_name,
      table_name
    );

    execute format('drop policy if exists %I on public.%I', table_name || '_select_owner_or_admin', table_name);
    execute format(
      'create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id or coalesce((select auth.jwt()) -> ''app_metadata'' ->> ''role'', '''') = ''admin'')',
      table_name || '_select_owner_or_admin',
      table_name
    );

    execute format('drop policy if exists %I on public.%I', table_name || '_insert_owner_or_admin', table_name);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id or coalesce((select auth.jwt()) -> ''app_metadata'' ->> ''role'', '''') = ''admin'')',
      table_name || '_insert_owner_or_admin',
      table_name
    );

    execute format('drop policy if exists %I on public.%I', table_name || '_update_owner_or_admin', table_name);
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id or coalesce((select auth.jwt()) -> ''app_metadata'' ->> ''role'', '''') = ''admin'') with check ((select auth.uid()) = user_id or coalesce((select auth.jwt()) -> ''app_metadata'' ->> ''role'', '''') = ''admin'')',
      table_name || '_update_owner_or_admin',
      table_name
    );

    execute format('drop policy if exists %I on public.%I', table_name || '_delete_owner_or_admin', table_name);
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select auth.uid()) = user_id or coalesce((select auth.jwt()) -> ''app_metadata'' ->> ''role'', '''') = ''admin'')',
      table_name || '_delete_owner_or_admin',
      table_name
    );

    execute format('revoke all on public.%I from anon, authenticated', table_name);
    execute format('grant select, insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end
$$;
