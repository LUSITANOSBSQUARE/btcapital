"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewAccountForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "exchange",
    account_type: "spot",
  });

  const [loading, setLoading] = useState(false);

  async function createAccount(e: any) {
    e.preventDefault();
    setLoading(true);

    const finalForm = {
      name: form.name.trim(),
      category: form.category,
      account_type: form.account_type,

      // defaults internos
      provider: null,
      currency_base: null,
    };

    const { data, error } = await supabaseBrowser
      .from("accounts")
      .insert([finalForm])
      .select()
      .single();

    setLoading(false);

    if (error) {
      console.error("SUPABASE ERROR:", JSON.stringify(error, null, 2));
      alert("Failed to create account");
      return;
    }

    router.push(`/accounts/${data.id}`);
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
      {/* NAME */}
      <input
        placeholder="Account Name (ex: Binance Spot)"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #333",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: "16px",
        }}
      />

      {/* CATEGORY */}
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        style={{
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #333",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        <option value="exchange">Exchange</option>
        <option value="bank">Bank</option>
        <option value="wallet">Wallet</option>
        <option value="cold_storage">Cold Storage</option>
        <option value="broker">Broker</option>
      </select>

      {/* ACCOUNT TYPE */}
      <select
        value={form.account_type}
        onChange={(e) => setForm({ ...form, account_type: e.target.value })}
        style={{
          padding: "14px",
          borderRadius: "10px",
          border: "1px solid #333",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: "16px",
        }}
      >
        <option value="spot">Spot</option>
        <option value="savings">Savings</option>
        <option value="trading">Trading</option>
        <option value="cold_storage">Cold Storage</option>
        <option value="lightning">Lightning</option>
        <option value="checking">Checking</option>
        <option value="investment">Investment</option>
      </select>

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
