// Importa a função supabaseServer, que cria um cliente Supabase no lado do servidor
import { supabaseServer } from "@/lib/supabase/server";

// Componente Server Component que recebe os parâmetros da rota dinâmica
export default async function AccountDetailsPage(props: { params: { id: string } }) {

  // Extrai os parâmetros da rota (ex: /accounts/123 → params.id = "123")
  const { params } = props;
  const id = params.id;

  // Cria um cliente Supabase configurado para Server Components
  const supabase = supabaseServer();

  // Faz uma query à tabela "accounts" para buscar a conta com o ID recebido
  const { data: account, error } = await supabase
    .from("accounts")
    .select("*") // seleciona todas as colunas
    .eq("id", id) // filtra pelo ID da conta
    .single(); // garante que só vem 1 resultado

  // Se houver erro na query, mostra mensagem de erro
  if (error) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        Supabase error: {error.message}
      </div>
    );
  }

  // Se a conta não existir, mostra mensagem de "não encontrada"
  if (!account) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        Account not found<br />
        ID recebido: {id}
      </div>
    );
  }

  // Se tudo estiver OK, renderiza a página da conta
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

      {/* Botão de voltar para a lista de contas */}
      <a
        href="/accounts"
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

      {/* Nome da conta */}
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "#f7931a" }}>
        {account.name}
      </h1>

      {/* Caixa com os detalhes da conta */}
      <div
        style={{
          background: "#1a1a1a",
          padding: 30,
          borderRadius: 12,
          border: "1px solid #262626",
          maxWidth: 500,
          marginBottom: 40,
        }}
      >
        <p><strong>Category:</strong> {account.category}</p>
        <p><strong>Provider:</strong> {account.provider}</p>
        <p><strong>Type:</strong> {account.account_type}</p>
        <p><strong>Currency:</strong> {account.currency_base}</p>
        <p><strong>Created:</strong> {new Date(account.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}
