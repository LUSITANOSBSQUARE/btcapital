import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* HEADER PREMIUM */}
      <header
        style={{
          width: "100%",
          padding: "20px 40px",
          borderBottom: "1px solid #1f1f1f",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0d0d0d",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <a
          href="/"
          style={{
            color: "#f7931a",
            fontWeight: "700",
            fontSize: "20px",
            textDecoration: "none",
          }}
        >
          ₿ BTCapital
        </a>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a
            href="/accounts"
            style={{
              color: "#fff",
              textDecoration: "none",
              opacity: 0.8,
              fontSize: "15px",
            }}
          >
            Accounts
          </a>

          <a
            href="/accounts/new"
            style={{
              color: "#fff",
              textDecoration: "none",
              opacity: 0.8,
              fontSize: "15px",
            }}
          >
            Add Account
          </a>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
