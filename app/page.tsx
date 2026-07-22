import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full bg-[var(--color-dark-base)] text-[var(--color-light-bg-white)] flex flex-col items-center justify-center py-20 px-6 min-h-[70vh]">
        <div className="relative flex flex-col items-center justify-center mb-12">
          {/* Simulação do Logotipo */}
          <div className="text-center relative">
            <span className="absolute -top-6 -left-6 text-3xl">🧢</span>
            <span className="absolute top-0 -right-8 text-3xl">✌️</span>
            
            <p className="text-sm tracking-[0.3em] uppercase mb-2 font-sans font-semibold text-[var(--color-light-accent-blue)]">
              Tour
            </p>
            <h1 className="font-[family-name:var(--font-caveat)] text-8xl md:text-9xl leading-none text-white drop-shadow-lg">
              Pé
            </h1>
            <h2 className="font-[family-name:var(--font-caveat)] text-6xl md:text-7xl leading-tight text-white drop-shadow-md">
              na Estrada
            </h2>
            
            <span className="absolute bottom-4 -left-10 text-3xl">👋</span>
            <span className="absolute -bottom-8 right-0 text-3xl">🦵</span>
            <span className="absolute -bottom-10 right-8 text-3xl">🦵</span>
          </div>
        </div>

        <button className="bg-[var(--color-primary-accent)] hover:bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
          Ver Nossos Passeios
        </button>
      </section>

      {/* Seção de Passeios */}
      <section className="w-full bg-white text-[var(--color-dark-base)] py-20 px-6 flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-12">Passeios Disponíveis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Card 1 */}
          <div className="bg-[var(--color-pale-peach)] rounded-3xl overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow cursor-pointer min-h-[400px]">
            <div className="h-64 bg-black/5 w-full flex items-center justify-center">
              <span className="text-black/30">Foto do Passeio</span>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between bg-[var(--color-light-bg-white)]">
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[var(--color-medium-accent-blue)]">Passeio Placeholder</h4>
                <p className="text-[var(--color-dark-base)]/80">Breve descrição do passeio será inserida aqui.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[var(--color-pale-peach)] rounded-3xl overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow cursor-pointer min-h-[400px]">
            <div className="h-64 bg-black/5 w-full flex items-center justify-center">
              <span className="text-black/30">Foto do Passeio</span>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between bg-[var(--color-light-bg-white)]">
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[var(--color-medium-accent-blue)]">Passeio Placeholder</h4>
                <p className="text-[var(--color-dark-base)]/80">Breve descrição do passeio será inserida aqui.</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[var(--color-pale-peach)] rounded-3xl overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow cursor-pointer min-h-[400px]">
            <div className="h-64 bg-black/5 w-full flex items-center justify-center">
              <span className="text-black/30">Foto do Passeio</span>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-between bg-[var(--color-light-bg-white)]">
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[var(--color-medium-accent-blue)]">Passeio Placeholder</h4>
                <p className="text-[var(--color-dark-base)]/80">Breve descrição do passeio será inserida aqui.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé Minimalista */}
      <footer className="w-full bg-[var(--color-dark-base)] py-8 flex flex-col items-center justify-center border-t border-[var(--color-medium-accent-blue)]/30">
        <div className="flex gap-6 mb-4">
          <Link href="#" className="text-[var(--color-light-bg-white)] hover:text-[var(--color-primary-accent)] transition-colors">
            Instagram
          </Link>
          <Link href="#" className="text-[var(--color-light-bg-white)] hover:text-[var(--color-primary-accent)] transition-colors">
            WhatsApp
          </Link>
        </div>
        <p className="text-sm text-[var(--color-light-bg-white)]/60">
          © {new Date().getFullYear()} Pé Na Estrada Tour. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
