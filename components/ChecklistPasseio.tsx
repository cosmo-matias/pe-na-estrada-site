import React from 'react';

interface ChecklistPasseioProps {
  inclusos: string[];
  naoInclusos: string[];
}

export default function ChecklistPasseio({ inclusos = [], naoInclusos = [] }: ChecklistPasseioProps) {
  if (inclusos.length === 0 && naoInclusos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
      {/* O que está incluso */}
      <div>
        <h5 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
          <span className="text-green-500 mr-2 text-xl">✓</span> Incluso no Pacote
        </h5>
        <ul className="space-y-2">
          {inclusos.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 font-bold mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* O que NÃO está incluso */}
      <div>
        <h5 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
          <span className="text-red-500 mr-2 text-xl">✕</span> Não Incluso
        </h5>
        <ul className="space-y-2">
          {naoInclusos.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-500 font-bold mr-2 mt-0.5">✕</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
