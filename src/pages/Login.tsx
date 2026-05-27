import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "MERCHANT">("CUSTOMER");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isRegistering) {
        await register({ name, email, password, role });
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível autenticar.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl shadow-soft border border-moss/5 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-terracotta text-white p-2 rounded-xl">
            <Store size={24} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-moss-900">
              {isRegistering ? "Criar conta" : "Entrar"}
            </h1>
            <p className="text-sm text-charcoal-light">
              Acesse sua conta PointNear.
            </p>
          </div>
        </div>

        {isRegistering && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-moss-900 mb-1">
              Nome
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-moss-200 outline-none focus:border-terracotta"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-moss-900 mb-1">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-moss-200 outline-none focus:border-terracotta"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-moss-900 mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-moss-200 outline-none focus:border-terracotta"
          />
        </div>

        {isRegistering && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-moss-900 mb-1">
              Tipo de conta
            </label>
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "CUSTOMER" | "MERCHANT")
              }
              className="w-full px-4 py-3 rounded-xl border border-moss-200 outline-none focus:border-terracotta">
              <option value="CUSTOMER">Consumidor</option>
              <option value="MERCHANT">Comerciante</option>
            </select>
          </div>
        )}

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          disabled={isSubmitting}
          className="w-full bg-moss-800 hover:bg-moss-900 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-70">
          {isSubmitting ? "Aguarde..." : isRegistering ? "Cadastrar" : "Entrar"}
        </button>

        <button
          type="button"
          onClick={() => setIsRegistering((value) => !value)}
          className="w-full mt-4 text-sm text-terracotta font-medium">
          {isRegistering ? "Já tenho conta" : "Criar uma conta"}
        </button>
        <Link to="/" className="block text-center text-sm text-moss-600 mt-4">
          Voltar ao início
        </Link>
      </form>
    </div>
  );
}
