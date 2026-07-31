import React from 'react';

interface BarraBuscaProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export default function BarraBusca({ 
  searchText, 
  onSearchTextChange, 
  selectedMonth, 
  onMonthChange 
}: BarraBuscaProps) {
  const meses = [
    { valor: "01", rotulo: "Janeiro" },
    { valor: "02", rotulo: "Fevereiro" },
    { valor: "03", rotulo: "Março" },
    { valor: "04", rotulo: "Abril" },
    { valor: "05", rotulo: "Maio" },
    { valor: "06", rotulo: "Junho" },
    { valor: "07", rotulo: "Julho" },
    { valor: "08", rotulo: "Agosto" },
    { valor: "09", rotulo: "Setembro" },
    { valor: "10", rotulo: "Outubro" },
    { valor: "11", rotulo: "Novembro" },
    { valor: "12", rotulo: "Dezembro" },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text"
          placeholder="Buscar destino..."
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)] placeholder-gray-400"
        />
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-accent)]"
        >
          <option value="">Qualquer data</option>
          {meses.map(mes => (
            <option key={mes.valor} value={mes.valor}>{mes.rotulo}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
