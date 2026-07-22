"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebaseConfig";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Form states
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [data, setData] = useState("");
  const [vagas, setVagas] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagem) {
      setMessage({ text: "Por favor, selecione uma imagem.", type: "error" });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      // 1. Upload the image
      const imageRef = ref(storage, `passeios/${Date.now()}_${imagem.name}`);
      const snapshot = await uploadBytes(imageRef, imagem);
      
      // 2. Get the public URL
      const imagemUrl = await getDownloadURL(snapshot.ref);

      // 3. Save to Firestore
      await addDoc(collection(db, "passeios"), {
        titulo,
        descricao,
        preco: Number(preco),
        data,
        vagas: Number(vagas),
        imagemUrl,
        ativo: true,
        createdAt: new Date().toISOString()
      });

      // 4. Show success and reset form
      setMessage({ text: "Passeio cadastrado com sucesso!", type: "success" });
      setTitulo("");
      setDescricao("");
      setPreco("");
      setData("");
      setVagas("");
      setImagem(null);
      // Reset input file type
      const fileInput = document.getElementById("imagem") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error) {
      console.error("Erro ao cadastrar passeio:", error);
      setMessage({ text: "Ocorreu um erro ao cadastrar o passeio.", type: "error" });
    } finally {
      setIsSaving(false);
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
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-8 md:p-12 text-[var(--color-dark-base)]">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-medium-accent-blue)]">
            Painel de Controle
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition-colors shadow-sm hover:shadow-md"
          >
            Sair
          </button>
        </div>
        
        <div className="text-lg text-gray-700 mt-6 border-b pb-6">
          <p>Bem-vindo(a) ao painel de administração.</p>
          <p className="mt-2 text-sm text-gray-500">Logado como: {user?.email}</p>
        </div>

        {/* Formulário de Cadastro de Passeios */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-dark-base)]">Cadastrar Novo Passeio</h2>
          
          <form onSubmit={handleSubmit} className="bg-[var(--color-light-bg-white)] p-6 rounded-2xl shadow-sm flex flex-col gap-5">
            <div>
              <label className="block font-medium mb-1" htmlFor="titulo">Título</label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-accent-blue)] bg-white"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-accent-blue)] bg-white min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block font-medium mb-1" htmlFor="preco">Preço (R$)</label>
                <input
                  id="preco"
                  type="number"
                  step="0.01"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-accent-blue)] bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1" htmlFor="data">Data</label>
                <input
                  id="data"
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-accent-blue)] bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1" htmlFor="vagas">Vagas</label>
                <input
                  id="vagas"
                  type="number"
                  value={vagas}
                  onChange={(e) => setVagas(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-medium-accent-blue)] bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1" htmlFor="imagem">Imagem</label>
              <input
                id="imagem"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="mt-4 bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {isSaving ? "Salvando..." : "Salvar Passeio"}
            </button>

            {message && (
              <div className={`p-4 rounded-xl mt-2 font-medium text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
