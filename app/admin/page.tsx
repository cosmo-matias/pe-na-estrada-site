"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";

interface Passeio {
  id: string;
  titulo: string;
  data: string;
  imagemUrl: string;
  ativo: boolean;
  preco?: number;
  vagas?: number;
  descricao?: string;
}

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
  
  const [passeioEmEdicao, setPasseioEmEdicao] = useState<Passeio | null>(null);

  // List states
  const [passeiosList, setPasseiosList] = useState<Passeio[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);

  // Slideshow states
  const [slidesList, setSlidesList] = useState<any[]>([]);
  const [slideImagem, setSlideImagem] = useState<File | null>(null);
  const [isSavingSlide, setIsSavingSlide] = useState(false);
  const [slideMessage, setSlideMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchPasseios = async () => {
    setIsLoadingList(true);
    try {
      const querySnapshot = await getDocs(collection(db, "passeios"));
      const list: Passeio[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as Passeio);
      });
      setPasseiosList(list);
    } catch (error) {
      console.error("Erro ao buscar passeios:", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  const fetchSlides = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "slides"));
      const list: any[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setSlidesList(list);
    } catch (error) {
      console.error("Erro ao buscar slides:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchPasseios();
        fetchSlides();
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

  const handleEdit = (passeio: Passeio) => {
    setPasseioEmEdicao(passeio);
    setTitulo(passeio.titulo);
    setDescricao(passeio.descricao || "");
    setPreco(passeio.preco?.toString() || "");
    setData(passeio.data);
    setVagas(passeio.vagas?.toString() || "");
    setImagem(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setPasseioEmEdicao(null);
    setTitulo("");
    setDescricao("");
    setPreco("");
    setData("");
    setVagas("");
    setImagem(null);
    const fileInput = document.getElementById("imagem") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passeioEmEdicao && !imagem) {
      setMessage({ text: "Por favor, selecione uma imagem.", type: "error" });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      let imagemUrl = passeioEmEdicao?.imagemUrl || "";

      // 1. Upload the image to ImgBB if a new one was selected
      if (imagem) {
        const formData = new FormData();
        formData.append("image", imagem);

        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
          method: "POST",
          body: formData,
        });
        
        const imgbbData = await imgbbResponse.json();

        if (!imgbbResponse.ok || !imgbbData.success) {
          throw new Error(imgbbData.error?.message || "Falha ao enviar imagem para o ImgBB");
        }
        
        imagemUrl = imgbbData.data.url;
      }

      // 2. Save to Firestore
      if (passeioEmEdicao) {
        const passeioRef = doc(db, "passeios", passeioEmEdicao.id);
        await updateDoc(passeioRef, {
          titulo,
          descricao,
          preco: Number(preco),
          data,
          vagas: Number(vagas),
          imagemUrl
        });
        setMessage({ text: "Passeio atualizado com sucesso!", type: "success" });
      } else {
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
        setMessage({ text: "Passeio cadastrado com sucesso!", type: "success" });
      }

      // 3. Reset form
      handleCancelEdit();
      fetchPasseios();

    } catch (error) {
      console.error("Erro ao salvar passeio:", error);
      setMessage({ text: "Ocorreu um erro ao salvar o passeio.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (passeio: Passeio) => {
    try {
      const passeioRef = doc(db, "passeios", passeio.id);
      await updateDoc(passeioRef, { ativo: !passeio.ativo });
      // Update local state
      setPasseiosList(prev => prev.map(p => p.id === passeio.id ? { ...p, ativo: !p.ativo } : p));
    } catch (error) {
      console.error("Erro ao alternar status:", error);
      alert("Erro ao alterar o status do passeio.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este passeio?")) {
      try {
        await deleteDoc(doc(db, "passeios", id));
        // Update local state
        setPasseiosList(prev => prev.filter(p => p.id !== id));
      } catch (error) {
        console.error("Erro ao excluir passeio:", error);
        alert("Erro ao excluir o passeio.");
      }
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
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4 md:p-12 text-[var(--color-dark-base)]">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-6 md:p-12 mb-8">
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
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-dark-base)]">
            {passeioEmEdicao ? "Editar Passeio" : "Cadastrar Novo Passeio"}
          </h2>
          
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
              <label className="block font-medium mb-1" htmlFor="imagem">
                {passeioEmEdicao ? "Nova Imagem (deixe em branco para manter a atual)" : "Imagem"}
              </label>
              <input
                id="imagem"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white"
                required={!passeioEmEdicao}
              />
            </div>

            <div className="mt-4 flex gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSaving ? "Salvando..." : (passeioEmEdicao ? "Atualizar Passeio" : "Salvar Passeio")}
              </button>
              {passeioEmEdicao && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  Cancelar Edição
                </button>
              )}
            </div>

            {message && (
              <div className={`p-4 rounded-xl mt-2 font-medium text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}
          </form>
        </div>

        {/* Linha separadora */}
        <hr className="my-12 border-gray-200" />

        {/* Lista de Passeios */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-dark-base)]">Passeios Cadastrados</h2>
          
          {isLoadingList ? (
            <p className="text-gray-500">Carregando passeios...</p>
          ) : passeiosList.length === 0 ? (
            <p className="text-gray-500">Nenhum passeio cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-500">
                    <th className="pb-3 font-semibold">Imagem</th>
                    <th className="pb-3 font-semibold">Título</th>
                    <th className="pb-3 font-semibold">Data</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {passeiosList.map(passeio => (
                    <tr key={passeio.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="w-16 h-12 bg-gray-200 rounded-md overflow-hidden relative shadow-sm">
                          <img src={passeio.imagemUrl} alt="miniatura" className="object-cover w-full h-full" />
                        </div>
                      </td>
                      <td className="py-4 font-medium text-[var(--color-dark-base)]">{passeio.titulo}</td>
                      <td className="py-4 text-sm text-gray-600">{new Date(passeio.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${passeio.ativo ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-200 text-gray-600 border border-gray-300'}`}>
                          {passeio.ativo ? "Ativo" : "Inativo"}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-2 flex justify-end">
                        <button
                          onClick={() => handleEdit(passeio)}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 font-medium text-sm rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleToggleStatus(passeio)}
                          className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${passeio.ativo ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-[var(--color-medium-accent-blue)] text-white hover:bg-blue-700'}`}
                        >
                          {passeio.ativo ? "Desativar" : "Ativar"}
                        </button>
                        <button
                          onClick={() => handleDelete(passeio.id)}
                          className="px-3 py-1.5 bg-red-100 text-red-600 font-medium text-sm rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Linha separadora */}
        <hr className="my-12 border-gray-200" />

        {/* Seção Gerenciar Slideshow */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[var(--color-dark-base)]">Gerenciar Slideshow da Capa</h2>
          
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              if (!slideImagem) return;
              setIsSavingSlide(true);
              setSlideMessage(null);
              
              try {
                const formData = new FormData();
                formData.append("image", slideImagem);
                const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                  method: "POST",
                  body: formData,
                });
                const imgbbData = await imgbbResponse.json();
                
                if (!imgbbResponse.ok || !imgbbData.success) {
                  throw new Error("Falha ao enviar imagem");
                }
                
                await addDoc(collection(db, "slides"), {
                  imagemUrl: imgbbData.data.url,
                  dataAdicao: new Date().toISOString()
                });
                
                setSlideMessage({ text: "Slide adicionado com sucesso!", type: "success" });
                setSlideImagem(null);
                const fileInput = document.getElementById("slideImagem") as HTMLInputElement;
                if (fileInput) fileInput.value = "";
                fetchSlides();
              } catch (error) {
                console.error(error);
                setSlideMessage({ text: "Erro ao adicionar slide.", type: "error" });
              } finally {
                setIsSavingSlide(false);
              }
            }}
            className="bg-gray-100 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 w-full">
              <label className="block font-medium mb-1 text-sm" htmlFor="slideImagem">Nova Imagem para Slideshow</label>
              <input
                id="slideImagem"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSlideImagem(e.target.files[0]);
                  }
                }}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSavingSlide || !slideImagem}
              className="mt-6 w-full md:w-auto bg-[var(--color-medium-accent-blue)] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
            >
              {isSavingSlide ? "Enviando..." : "Adicionar Slide"}
            </button>
          </form>

          {slideMessage && (
            <div className={`p-4 rounded-xl mb-6 font-medium text-center ${slideMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {slideMessage.text}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {slidesList.length === 0 ? (
              <p className="text-gray-500">Nenhum slide cadastrado. As imagens padrão estão sendo exibidas.</p>
            ) : (
              slidesList.map((slide) => (
                <div key={slide.id} className="relative w-48 h-32 rounded-xl overflow-hidden shadow-md group">
                  <img src={slide.imagemUrl} alt="Slide" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button 
                      onClick={async () => {
                        if (window.confirm("Excluir este slide?")) {
                          try {
                            await deleteDoc(doc(db, "slides", slide.id));
                            fetchSlides();
                          } catch (error) {
                            console.error(error);
                            alert("Erro ao excluir");
                          }
                        }
                      }}
                      className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
