-- Premium plan catalog and server-controlled subscription status.
-- Payment providers must update user_subscriptions from a trusted server.

create table if not exists public.subscription_plans (
  code text primary key,
  name text not null,
  billing_period text not null check (billing_period in ('month', 'year')),
  price_rmb numeric(8, 2) not null check (price_rmb >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.subscription_plans (code, name, billing_period, price_rmb)
values
  ('premium_monthly', 'Premium Monthly', 'month', 29.90),
  ('premium_yearly', 'Premium Yearly', 'year', 299.90)
on conflict (code) do update
set
  name = excluded.name,
  billing_period = excluded.billing_period,
  price_rmb = excluded.price_rmb,
  active = true,
  updated_at = now();

create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan_code text not null references public.subscription_plans(code),
  provider text not null default 'app_store',
  provider_subscription_id text,
  status text not null default 'pending' check (status in ('pending', 'active', 'past_due', 'cancelled', 'expired')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_subscriptions_user_status_idx
  on public.user_subscriptions (user_id, status, current_period_end desc);

alter table public.subscription_plans enable row level security;
alter table public.user_subscriptions enable row level security;

drop policy if exists "subscription_plans_read_active" on public.subscription_plans;
create policy "subscription_plans_read_active"
on public.subscription_plans for select to anon, authenticated
using (active);

drop policy if exists "user_subscriptions_read_own" on public.user_subscriptions;
create policy "user_subscriptions_read_own"
on public.user_subscriptions for select to authenticated
using ((select auth.uid()) = user_id);

revoke all on public.subscription_plans from anon, authenticated;
grant select on public.subscription_plans to anon, authenticated;
revoke all on public.user_subscriptions from anon, authenticated;
grant select on public.user_subscriptions to authenticated;
