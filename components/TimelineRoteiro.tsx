import React from 'react';

interface RoteiroItem {
  horario: string;
  evento: string;
}

interface TimelineRoteiroProps {
  roteiro: RoteiroItem[];
}

export default function TimelineRoteiro({ roteiro }: TimelineRoteiroProps) {
  if (!roteiro || roteiro.length === 0) return null;

  return (
    <div className="border-l-2 border-orange-500 ml-3 md:ml-4">
      {roteiro.map((item, index) => (
        <div key={index} className="relative mb-6 last:mb-0 pl-6">
          <span className="absolute -left-[21px] md:-left-[25px] top-1 w-4 h-4 rounded-full bg-white border-4 border-orange-500"></span>
          <p className="text-sm font-bold text-orange-600">{item.horario}</p>
          <p className="text-base text-gray-700">{item.evento}</p>
        </div>
      ))}
    </div>
  );
}
