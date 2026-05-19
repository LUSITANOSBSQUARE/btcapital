export interface Account {
  id: string;
  name: string;
  category: string | null;
  provider: string | null;
  account_type: string | null;
  currency_base: string;
  status: string | null;
  metadata: any;
  created_at: string;
  updated_at: string | null;
}
