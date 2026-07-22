"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      setError("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-dark-base)] px-4">
      <div className="w-full max-w-md bg-[var(--color-light-bg-white)] rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-[var(--color-dark-base)] mb-8">
          Acesso Restrito
        </h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-[var(--color-dark-base)] font-medium mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-accent-blue)] text-gray-800"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
          
          <div>
            <label className="block text-[var(--color-dark-base)] font-medium mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-accent-blue)] text-gray-800"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl text-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 mt-4"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          
          {error && (
            <p className="text-red-500 text-sm text-center mt-2 font-medium">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
