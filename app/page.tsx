"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Definindo a interface para o Passeio
interface Passeio {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  data: string;
  vagas: number;
  imagemUrl: string;
  ativo: boolean;
}

export default function Home() {
  const [passeios, setPasseios] = useState<Passeio[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para o slideshow
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/slides/cabaceiras01.jpg',
    '/slides/veneza01.jpg',
    '/slides/veneza02.jpg',
    '/slides/vilasitio.jpg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const fetchPasseios = async () => {
      try {
        const q = query(collection(db, "passeios"), where("ativo", "==", true));
        const querySnapshot = await getDocs(q);
        const fetchedPasseios: Passeio[] = [];
        
        querySnapshot.forEach((doc) => {
          fetchedPasseios.push({ id: doc.id, ...doc.data() } as Passeio);
        });
        
        setPasseios(fetchedPasseios);
      } catch (error) {
        console.error("Erro ao buscar passeios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPasseios();
  }, []);

  // Formatador de preço
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  // Formatador de data (ajustando a data para exibir corretamente)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00'); // Garante que a data local seja preservada
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="relative w-full bg-[var(--color-dark-base)] text-[var(--color-light-bg-white)] flex flex-col items-center justify-center py-20 px-6 min-h-[70vh] overflow-hidden">
        
        {/* Slideshow de Fundo */}
        {slides.map((imgSrc, index) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay escuro para garantir leitura */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        {/* Conteúdo (Logo e Botão) */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-12 w-full max-w-md mx-auto">
          <Image 
            src="/logo.png" 
            alt="Pé Na Estrada Tour Logo" 
            width={500} 
            height={500} 
            className="w-full h-auto drop-shadow-2xl" 
            priority
          />
        </div>

        <a href="#passeios" className="relative z-10 bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
          Ver Nossos Passeios
        </a>
      </section>

      {/* Seção de Passeios */}
      <section id="passeios" className="w-full bg-white text-[var(--color-dark-base)] py-20 px-6 flex flex-col items-center min-h-[50vh]">
        <h3 className="text-4xl font-bold mb-12 text-center text-[var(--color-medium-accent-blue)]">Passeios Disponíveis</h3>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
             <p className="text-xl font-medium animate-pulse text-[var(--color-dark-base)]">Carregando passeios...</p>
          </div>
        ) : passeios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
             <p className="text-xl font-medium text-[var(--color-dark-base)]">Novos passeios em breve! Fique de olho.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {passeios.map((passeio) => (
              <div key={passeio.id} className="bg-[var(--color-pale-peach)] rounded-3xl overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow min-h-[450px]">
                {/* Imagem (usando tag img para evitar problemas de configuração de domínio remoto no next/image) */}
                <div className="h-64 w-full relative bg-gray-100">
                  <img 
                    src={passeio.imagemUrl} 
                    alt={`Foto de ${passeio.titulo}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Conteúdo */}
                <div className="p-8 flex-1 flex flex-col bg-[var(--color-light-bg-white)]">
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold mb-3 text-[var(--color-medium-accent-blue)] line-clamp-2">
                      {passeio.titulo}
                    </h4>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-lg text-[var(--color-dark-base)]">{formatPrice(passeio.preco)}</span>
                      <span className="text-sm font-medium text-[var(--color-dark-base)] bg-[var(--color-pale-peach)]/50 px-3 py-1 rounded-full">
                        {formatDate(passeio.data)}
                      </span>
                    </div>
                    <p className="text-[var(--color-dark-base)]/80 line-clamp-3 mb-6">
                      {passeio.descricao}
                    </p>
                  </div>
                  {/* Botão de Ação CTA */}
                  <a
                    href={`https://wa.me/5588993620038?text=Olá! Gostaria de reservar o passeio para ${encodeURIComponent(passeio.titulo)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm hover:shadow-md"
                  >
                    Reservar via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Rodapé Minimalista */}
      <footer className="w-full bg-[var(--color-dark-base)] py-8 flex flex-col items-center justify-center border-t border-[var(--color-medium-accent-blue)]/30">
        <div className="flex gap-6 mb-4">
          <Link href="https://instagram.com/penaestradatour7" target="_blank" rel="noopener noreferrer" className="text-[var(--color-light-bg-white)] hover:text-[var(--color-primary-accent)] transition-colors">
            Instagram
          </Link>
          <Link href="https://wa.me/5588993620038" target="_blank" rel="noopener noreferrer" className="text-[var(--color-light-bg-white)] hover:text-[var(--color-primary-accent)] transition-colors">
            WhatsApp
          </Link>
        </div>
        <p className="text-sm text-[var(--color-light-bg-white)]/60 text-center">
          © {new Date().getFullYear()} Pé Na Estrada Tour. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
