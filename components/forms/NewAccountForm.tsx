"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewAccountForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "",
    provider: "",
    account_type: "",
    currency_base: "",
  });

  const [loading, setLoading] = useState(false);

  async function createAccount(e: any) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("accounts").insert([form]);

    setLoading(false);

    if (!error) {
      router.push("/accounts");
    } else {
      console.error(error);
      alert("Failed to create account");
    }
  }

  return (
    <form
      onSubmit={createAccount}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "400px",
      }}
    >
      {["name", "category", "provider", "account_type", "currency_base"].map(
        (field) => (
          <input
            key={field}
            placeholder={field}
            value={(form as any)[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "#fff",
              fontSize: "16px",
            }}
          />
        )
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          background: "#f7931a",
          color: "#000",
          padding: "14px",
          borderRadius: "10px",
          fontWeight: "700",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          opacity: loading ? 0.5 : 1,
        }}
      >
        {loading ? "Saving..." : "Create Account"}
      </button>
    </form>
  );
}
