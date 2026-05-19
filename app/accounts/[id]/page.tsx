import { supabaseServer } from "@/lib/supabase/server";

export default async function AccountDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = supabaseServer();

  // Buscar a conta
  const { data: account, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        Supabase error: {error.message}
      </div>
    );
  }

  if (!account) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        Account not found<br />
        ID recebido: {id}
      </div>
    );
  }

  // Buscar balances desta conta
  const { data: balances } = await supabase
    .from("balances")
    .select("asset_id, balance")
    .eq("account_id", id);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "#fff",
        padding: "60px 40px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Back */}
      <a
        href="/accounts"
        style={{
          display: "inline-block",
          marginBottom: "30px",
          background: "#1a1a1a",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "1px solid #333",
          textDecoration: "none",
          fontSize: "14px",
          opacity: 0.8,
        }}
      >
        ← Back
      </a>

      {/* Nome da conta */}
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f7931a" }}>
        {account.name}
      </h1>

      {/* Botões de ações */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "30px" }}>
        <a
          href={`/accounts/${id}/add-funds`}
          style={{
            background: "#f7931a",
            color: "#000",
            padding: "10px 16px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          + Add Funds
        </a>

        <a
          href={`/accounts/${id}/transfer`}
          style={{
            background: "#1a1a1a",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #333",
            textDecoration: "none",
          }}
        >
          ⇄ Transfer
        </a>

        <a
          href={`/accounts/${id}/withdraw`}
          style={{
            background: "#b30000",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #660000",
            textDecoration: "none",
          }}
        >
          – Withdraw
        </a>
      </div>

      {/* Card com detalhes da conta */}
      <div
        style={{
          background: "#1a1a1a",
          padding: 30,
          borderRadius: 12,
          border: "1px solid #262626",
          maxWidth: 500,
          marginBottom: 40,
        }}
      >
        <p><strong>Category:</strong> {account.category}</p>
        <p><strong>Provider:</strong> {account.provider}</p>
        <p><strong>Type:</strong> {account.account_type}</p>
        <p><strong>Currency:</strong> {account.currency_base}</p>
        <p><strong>Created:</strong> {new Date(account.created_at).toLocaleString()}</p>
      </div>

      {/* Balances */}
      <div
        style={{
          background: "#1a1a1a",
          padding: 30,
          borderRadius: 12,
          border: "1px solid #262626",
          maxWidth: 500,
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20, color: "#f7931a" }}>
          Balances
        </h2>

        {(!balances || balances.length === 0) && (
          <p style={{ opacity: 0.7 }}>No funds yet.</p>
        )}

        {balances?.map((b) => (
          <p key={b.asset_id} style={{ margin: "6px 0" }}>
            <strong>{b.asset_id}:</strong> {b.balance}
          </p>
        ))}
      </div>
    </div>
  );
}
