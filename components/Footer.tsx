import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-6 w-full mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Coluna 1 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-bold text-white">Pé Na Estrada Tour</h4>
          <p className="text-slate-400">Sua melhor experiência de viagem começa aqui.</p>
          <p className="text-sm text-slate-500 mt-2">CNPJ: XX.XXX.XXX/0001-XX</p>
        </div>

        {/* Coluna 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold text-white">Fale Conosco</h4>
          <div className="flex flex-col gap-2">
            <a href="https://wa.me/5583993620038" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-accent)] transition-colors">
              WhatsApp: +55 83 99362-0038
            </a>
            <a href="mailto:contato@penaestradatour.com.br" className="hover:text-[var(--color-primary-accent)] transition-colors">
              E-mail de Contato
            </a>
            <a href="https://instagram.com/penaestradatour7" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-accent)] transition-colors">
              Instagram: @penaestradatour7
            </a>
          </div>
        </div>

        {/* Coluna 3 */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold text-white">Informações</h4>
          <div className="flex flex-col gap-2">
            <Link href="#" className="hover:text-[var(--color-primary-accent)] transition-colors">Dúvidas Frequentes</Link>
            <Link href="#" className="hover:text-[var(--color-primary-accent)] transition-colors">Regras de Embarque</Link>
            <Link href="#" className="hover:text-[var(--color-primary-accent)] transition-colors">Política de Cancelamento</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Pé Na Estrada Tour. Todos os direitos reservados.
      </div>
    </footer>
  );
}
