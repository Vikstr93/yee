-- Core schema for Swepoke ecommerce + auctions.
create extension if not exists "uuid-ossp";

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  price numeric(12, 2) not null check (price >= 0),
  images text[] not null default '{}',
  category text not null,
  condition text not null,
  set_name text not null,
  language text not null check (language in ('JP', 'EN')),
  stock integer not null default 0 check (stock >= 0),
  is_graded boolean not null default false,
  psa_grade integer,
  is_auction boolean not null default false,
  status text not null default 'active' check (status in ('active', 'hidden', 'sold')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.auctions (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  start_price numeric(12, 2) not null check (start_price >= 0),
  current_bid numeric(12, 2) not null,
  highest_bidder_id uuid references auth.users(id),
  ends_at timestamptz not null,
  status text not null default 'active' check (status in ('active', 'ended', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.bids (
  id uuid primary key default uuid_generate_v4(),
  auction_id uuid not null references public.auctions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12, 2) not null check (amount > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id),
  items jsonb not null,
  total numeric(12, 2) not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending', 'paid', 'packed', 'shipped', 'delivered', 'cancelled')),
  payment_method text not null check (payment_method in ('card', 'klarna', 'swish')),
  shipping_address jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_content (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  value_sv text not null,
  value_en text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_images (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  url text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_methods (
  id uuid primary key default uuid_generate_v4(),
  method text not null unique check (method in ('card', 'klarna', 'swish')),
  enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.payment_methods (method, enabled)
values ('card', true), ('klarna', true), ('swish', true)
on conflict (method) do nothing;

create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_set_name on public.products(set_name);
create index if not exists idx_auctions_status_ends_at on public.auctions(status, ends_at);
create index if not exists idx_bids_auction_id_created_at on public.bids(auction_id, created_at desc);
create index if not exists idx_orders_user_id_created_at on public.orders(user_id, created_at desc);
