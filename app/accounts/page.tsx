import { supabaseServer } from "@/lib/supabase/server";
import DeleteAccountButton from "./_components/DeleteAccountButton";

export default async function AccountsPage() {
  const supabase = supabaseServer();

  const { data: accounts, error } = await supabase
    .from("accounts")
    .select("id, name, category, provider, account_type, currency_base, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("SUPABASE ERROR:", error);
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
        }}
      >
        + Add Account
      </a>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {accounts
          ?.filter((acc) => acc.id)
          .map((acc) => (
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
                <a
                  href={`/accounts/${acc.id}`}
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    color: "#f7931a",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  {acc.name}
                </a>

                <p style={{ margin: "6px 0", opacity: 0.7 }}>
                  {acc.category} • {acc.provider} • {acc.account_type}
                </p>
              </div>

              <DeleteAccountButton id={acc.id} />
            </div>
          ))}
      </div>
    </div>
  );
}
