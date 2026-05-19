"use client";

import { useEffect, useState } from "react";

export default function AddFundsForm({ accountId }: { accountId: string }) {
  const [assets, setAssets] = useState<any[]>([]);
  const [assetId, setAssetId] = useState("");
  const [amount, setAmount] = useState("");
  const [loadingAssets, setLoadingAssets] = useState(true);

  // Carregar assets da API
  useEffect(() => {
    let active = true;

    async function loadAssets() {
      try {
        const res = await fetch("/api/assets", { cache: "no-store" });
        const json = await res.json();

        if (!active) return;

        setAssets(
          (json.data || []).sort((a: any, b: any) =>
            a.symbol.localeCompare(b.symbol)
          )
        );
      } catch (err) {
        console.error("Failed to load assets:", err);
        setAssets([]);
      } finally {
        setLoadingAssets(false);
      }
    }

    loadAssets();
    return () => {
      active = false;
    };
  }, []);

  async function submit() {
    if (!assetId) {
      alert("Select an asset first");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const res = await fetch("/api/balances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: accountId,
        asset_id: assetId,
        balance: Number(amount),
      }),
    });

    const json = await res.json();

    if (!json.error) {
      window.location.href = `/accounts/${accountId}`;
    } else {
      alert("Error: " + json.error);
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      {/* Dropdown de assets */}
      <label>Asset</label>
      <select
        value={assetId}
        onChange={(e) => setAssetId(e.target.value)}
        disabled={loadingAssets}
        style={{
          display: "block",
          marginTop: 8,
          padding: 8,
          width: 300,
          background: "#1a1a1a",
          color: "#fff",
          borderRadius: 8,
          border: "1px solid #333",
          opacity: loadingAssets ? 0.5 : 1,
        }}
      >
        <option value="">
          {loadingAssets ? "Loading assets..." : "Select asset..."}
        </option>

        {assets.map((a) => (
          <option key={a.id} value={a.id}>
            {a.symbol} — {a.name}
          </option>
        ))}
      </select>

      {/* Amount */}
      <label style={{ marginTop: 20 }}>Amount</label>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        step="0.00000001"
        style={{
          display: "block",
          marginTop: 8,
          padding: 8,
          width: 300,
          background: "#1a1a1a",
          color: "#fff",
          borderRadius: 8,
          border: "1px solid #333",
        }}
      />

      <button
        onClick={submit}
        style={{
          marginTop: 30,
          background: "#f7931a",
          padding: "10px 20px",
          borderRadius: 8,
          fontWeight: 600,
          cursor: "pointer",
          color: "#000",
        }}
      >
        Add Funds
      </button>
    </div>
  );
}
