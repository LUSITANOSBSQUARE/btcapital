import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("balances")
    .insert({
      account_id: body.account_id,
      asset_id: body.asset_id,
      balance: body.balance,
    })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ data });
}
