import { supabaseServer } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function POST() {
  const supabase = supabaseServer() as SupabaseClient;

  const { error } = await supabase.from("assets").insert([
    { symbol: "BTC", name: "Bitcoin", type: "crypto" },
    { symbol: "ETH", name: "Ethereum", type: "crypto" },
    { symbol: "USDT", name: "Tether USD", type: "stablecoin" },
    { symbol: "EUR", name: "Euro", type: "fiat" },
    { symbol: "USD", name: "US Dollar", type: "fiat" },
  ]);

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ ok: true });
}
