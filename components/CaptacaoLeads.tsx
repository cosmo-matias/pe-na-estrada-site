"use client";

import React, { useState } from 'react';

export default function CaptacaoLeads() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado! Em breve você receberá novidades.');
    setNome('');
    setWhatsapp('');
  };

  return (
    <section className="w-full bg-[var(--color-primary-accent)] py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
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
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 rounded-xl border-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button 
            type="submit"
            className="w-full md:w-1/3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg"
          >
            Quero entrar na Lista VIP
          </button>
        </form>
      </div>
    </section>
  );
}
