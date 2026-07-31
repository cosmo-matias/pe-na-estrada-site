import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

interface FormularioDepoimentoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormularioDepoimento({ isOpen, onClose, onSuccess }: FormularioDepoimentoProps) {
  const [nome, setNome] = useState('');
  const [estrelas, setEstrelas] = useState(5);
  const [texto, setTexto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await addDoc(collection(db, 'depoimentos'), {
        nome,
        estrelas,
        texto,
        aprovado: true,
        dataCriacao: new Date().toISOString()
      });
      setMessage({ text: 'Depoimento enviado com sucesso!', type: 'success' });
      setNome('');
      setEstrelas(5);
      setTexto('');
      setTimeout(() => {
        onSuccess();
        onClose();
        setMessage(null);
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Erro ao enviar depoimento.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center transition-colors font-bold text-gray-700"
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold mb-6 text-[var(--color-medium-accent-blue)]">Deixe seu Depoimento</h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium mb-1 text-sm text-gray-700">Seu Nome</label>
            <input 
              type="text"
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary-accent)] outline-none"
              placeholder="Ex: Mariana Silva"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm text-gray-700">Nota (1 a 5)</label>
            <select 
              value={estrelas}
              onChange={e => setEstrelas(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary-accent)] outline-none"
            >
              <option value={5}>5 - Excelente</option>
              <option value={4}>4 - Muito Bom</option>
              <option value={3}>3 - Bom</option>
              <option value={2}>2 - Regular</option>
              <option value={1}>1 - Ruim</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm text-gray-700">Como foi a viagem?</label>
            <textarea 
              required
              value={texto}
              onChange={e => setTexto(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary-accent)] outline-none min-h-[100px]"
              placeholder="Conte-nos um pouco sobre a sua experiência..."
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-colors mt-2"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Depoimento'}
          </button>
          
          {message && (
            <p className={`text-center font-medium mt-2 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
