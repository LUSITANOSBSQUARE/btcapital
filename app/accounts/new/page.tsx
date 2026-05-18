import NewAccountForm from "@/components/forms/NewAccountForm";

export default function NewAccountPage() {
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
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "30px",
          color: "#f7931a",
        }}
      >
        New Account
      </h1>

      <NewAccountForm />
    </div>
  );
}
