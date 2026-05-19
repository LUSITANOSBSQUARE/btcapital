import AddFundsForm from "./AddFundsForm";

export default function AddFundsPage({ params }: { params: { id: string } }) {
  const { id } = params;

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
      <a
        href={`/accounts/${id}`}
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

      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f7931a" }}>
        Add Funds
      </h1>

      <AddFundsForm accountId={id} />
    </div>
  );
}
