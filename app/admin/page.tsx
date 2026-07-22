"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-dark-base)]">
        <p className="text-[var(--color-light-bg-white)] text-xl font-medium animate-pulse">
          Verificando acesso...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-8 md:p-24 text-[var(--color-dark-base)]">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-medium-accent-blue)]">
            Painel de Controle Pé Na Estrada Tour
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition-colors shadow-sm hover:shadow-md"
          >
            Sair
          </button>
        </div>
        
        <div className="text-lg text-gray-700">
          <p>Bem-vindo(a) ao painel de administração.</p>
          <p className="mt-4 text-sm text-gray-500">Logado como: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}
