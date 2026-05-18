export default function HomePage() {
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
      <header style={{ marginBottom: "60px" }}>
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: 0,
            color: "#f7931a",
          }}
        >
          ₿ BTCapital
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.7, marginTop: "10px" }}>
          O teu centro de controlo financeiro Bitcoin.
        </p>
      </header>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "400px",
        }}
      >
        <a
          href="/accounts"
          style={{
            padding: "18px 22px",
            background: "#1a1a1a",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            fontSize: "20px",
            border: "1px solid #262626",
          }}
        >
          Accounts →
        </a>

        <a
          href="/assets"
          style={{
            padding: "18px 22px",
            background: "#1a1a1a",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            fontSize: "20px",
            border: "1px solid #262626",
          }}
        >
          Assets →
        </a>

        <a
          href="/transactions"
          style={{
            padding: "18px 22px",
            background: "#1a1a1a",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            fontSize: "20px",
            border: "1px solid #262626",
          }}
        >
          Transactions →
        </a>

        <a
          href="/portfolio"
          style={{
            padding: "18px 22px",
            background: "#1a1a1a",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            fontSize: "20px",
            border: "1px solid #262626",
          }}
        >
          Portfolio →
        </a>

        <a
          href="/notes"
          style={{
            padding: "18px 22px",
            background: "#1a1a1a",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            fontSize: "20px",
            border: "1px solid #262626",
          }}
        >
          Notes →
        </a>
      </nav>
    </div>
  );
}
