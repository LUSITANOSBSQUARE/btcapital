import { supabaseServer } from "@/lib/supabase/server";

export async function GET() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("assets").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  return Response.json({ data });
}
