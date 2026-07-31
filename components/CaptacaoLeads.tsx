"use client";

import React, { useState } from 'react';

export default function CaptacaoLeads() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setNome('');
    setWhatsapp('');
  };

  const formatarWhatsApp = (valor: string) => {
    // Remove tudo que não for número
    let num = valor.replace(/\D/g, "");
    
    // Limita a 11 números
    if (num.length > 11) {
      num = num.slice(0, 11);
    }

    // Aplica a máscara
    if (num.length === 0) return "";
    if (num.length <= 2) return `(${num}`;
    if (num.length <= 7) return `(${num.slice(0, 2)}) ${num.slice(2)}`;
    return `(${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}`;
  };

  return (
    <section className="w-full bg-[var(--color-primary-accent)] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {status === 'success' ? (
          <div className="flex flex-col items-center text-center space-y-4">
            <svg className="w-16 h-16 text-white bg-green-500 rounded-full p-3 mb-2 shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="text-2xl font-bold text-white">Cadastro realizado com sucesso!</h2>
            <p className="text-orange-50 mt-2 max-w-lg mx-auto">
              Para não perder nenhuma oferta e garantir sua vaga em primeira mão, entre agora no nosso Grupo VIP exclusivo.
            </p>
            <a 
              href="https://chat.whatsapp.com/GOwf6xR106P8pAoDtFy9VH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-3 mt-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Entrar no Grupo VIP
            </a>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quer receber ofertas exclusivas e descontos de primeira mão?
            </h2>
            <p className="text-orange-50 text-lg md:text-xl mb-8">
              Cadastre seu WhatsApp e faça parte da nossa lista VIP de viajantes!
            </p>
            
            <form 
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto"
            >
              <input 
                type="text" 
                placeholder="Seu Nome" 
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full md:w-1/3 px-4 py-3 rounded-xl border-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <input 
                type="tel" 
                placeholder="Seu WhatsApp" 
                required
                maxLength={15}
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatarWhatsApp(e.target.value))}
                className="w-full md:w-1/3 px-4 py-3 rounded-xl border-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button 
                type="submit"
                className="w-full md:w-1/3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Quero entrar na Lista VIP
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
