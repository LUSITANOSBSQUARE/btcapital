import { supabase } from "@/lib/supabase";

export default async function AccountDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: account, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !account) {
    return (
      <div style={{ padding: "40px", color: "red" }}>
        Failed to load account.
      </div>
    );
  }

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
      {/* 🔙 BOTÃO BACK */}
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

      <h1
        style={{
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#f7931a",
        }}
      >
        {account.name}
      </h1>

      <div
        style={{
          background: "#1a1a1a",
          padding: "30px",
          borderRadius: "12px",
          border: "1px solid #262626",
          maxWidth: "500px",
        }}
      >
        <p style={{ margin: "10px 0", opacity: 0.8 }}>
          <strong>Category:</strong> {account.category}
        </p>

        <p style={{ margin: "10px 0", opacity: 0.8 }}>
          <strong>Provider:</strong> {account.provider}
        </p>

        <p style={{ margin: "10px 0", opacity: 0.8 }}>
          <strong>Type:</strong> {account.account_type}
        </p>

        <p style={{ margin: "10px 0", opacity: 0.8 }}>
          <strong>Currency:</strong> {account.currency_base}
        </p>

        <p style={{ margin: "10px 0", opacity: 0.8 }}>
          <strong>Created:</strong>{" "}
          {new Date(account.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
