import { supabase } from "@/lib/supabase";

export default async function AccountsPage() {
  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div style={{ color: "red", padding: "40px" }}>
        Failed to load accounts.
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
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#f7931a",
        }}
      >
        Accounts
      </h1>

      {/* 🔥 BOTÃO ADD ACCOUNT PREMIUM */}
      <a
        href="/accounts/new"
        style={{
          display: "inline-block",
          marginBottom: "40px",
          background: "#f7931a",
          color: "#000",
          padding: "12px 20px",
          borderRadius: "10px",
          fontWeight: "600",
          fontSize: "16px",
          textDecoration: "none",
          transition: "0.2s",
        }}
      >
        + Add Account
      </a>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {accounts?.map((acc) => (
          <div
            key={acc.id}
            style={{
              background: "#1a1a1a",
              padding: "22px",
              borderRadius: "12px",
              border: "1px solid #262626",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "22px" }}>{acc.name}</h2>
              <p style={{ margin: "6px 0", opacity: 0.7 }}>
                {acc.category} • {acc.provider} • {acc.account_type}
              </p>
            </div>

            <div
              style={{
                background: "#f7931a",
                color: "#000",
                padding: "8px 14px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {acc.currency_base}
            </div>
          </div>
        ))}

        {accounts?.length === 0 && (
          <p style={{ opacity: 0.6 }}>No accounts yet.</p>
        )}
      </div>
    </div>
  );
}
