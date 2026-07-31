import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import FormularioDepoimento from './FormularioDepoimento';

interface Depoimento {
  id: string;
  nome: string;
  texto: string;
  estrelas: number;
}

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Depoimentos() {
  const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDepoimentos = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'depoimentos'),
        where('aprovado', '==', true),
        orderBy('dataCriacao', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetched: Depoimento[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Depoimento);
      });
      setDepoimentos(fetched);
    } catch (error) {
      console.error("Erro ao buscar depoimentos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepoimentos();
  }, []);

  return (
    <section className="w-full bg-slate-50 py-16 px-6 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <h3 className="text-3xl font-bold text-center text-[var(--color-medium-accent-blue)]">
            O que dizem nossos viajantes
          </h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
          >
            Deixar meu Depoimento
          </button>
        </div>
        
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Carregando depoimentos...</p>
        ) : depoimentos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {depoimentos.map((depoimento) => (
              <div 
                key={depoimento.id} 
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col h-full hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(depoimento.estrelas)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                
                <p className="italic text-gray-600 mb-6 flex-1 text-lg leading-relaxed">
                  "{depoimento.texto}"
                </p>
                
                <div className="mt-auto">
                  <p className="font-bold text-gray-800 text-lg">
                    {depoimento.nome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-white rounded-2xl shadow-md p-12">
            <p className="text-gray-600 text-lg">
              Nenhum depoimento ainda. Seja o primeiro a contar como foi viajar conosco!
            </p>
          </div>
        )}
      </div>

      <FormularioDepoimento 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchDepoimentos} 
      />
    </section>
  );
}
