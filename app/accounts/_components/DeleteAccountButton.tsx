"use client";

import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton({ id }: { id: string }) {
  const router = useRouter();

  async function deleteAccount() {
    if (!confirm("Are you sure you want to delete this account?")) return;

    const { error } = await supabaseBrowser
      .from("accounts")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to delete account");
      return;
    }

    router.refresh(); // Atualiza a lista sem reload
  }

  return (
    <button
      onClick={deleteAccount}
      style={{
        background: "#ff4d4d",
        color: "#000",
        padding: "8px 14px",
        borderRadius: "8px",
        fontWeight: "600",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  );
}
