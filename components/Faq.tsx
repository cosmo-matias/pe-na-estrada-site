import React from 'react';

const faqData = [
  {
    pergunta: "Crianças pagam o valor integral?",
    resposta: "Crianças de colo (até 3 anos) não pagam a passagem no transporte. No entanto, alguns passeios possuem ingressos locais, portanto, é necessário consultar-nos via WhatsApp para verificar se haverá cobrança de ingresso para a criança no roteiro escolhido."
  },
  {
    pergunta: "Como funcionam os locais de embarque?",
    resposta: "Temos pontos fixos em Capim, Mamanguape, Cuité de Mamanguape, Olho D'água do Serrão, Sapé e João Pessoa. O local exato e o horário são alinhados após a reserva."
  },
  {
    pergunta: "Posso cancelar minha reserva?",
    resposta: "Sim, os cancelamentos seguem nossa política de devolução. Entre em contato pelo WhatsApp para verificar os prazos."
  },
  {
    pergunta: "Como faço o pagamento?",
    resposta: "Aceitamos PIX e Cartão de Crédito. A reserva só é confirmada mediante o pagamento do sinal ou valor integral."
  }
];

export default function Faq() {
  return (
    <section className="w-full bg-white py-16 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h3 className="text-3xl font-bold text-center mb-12 text-[var(--color-medium-accent-blue)]">
          Dúvidas Frequentes
        </h3>
        
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <details 
              key={index} 
              className="group bg-slate-50 rounded-2xl shadow-sm border border-slate-100 overflow-hidden open:bg-white open:ring-1 open:ring-[var(--color-primary-accent)]/30 transition-all"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-gray-800 list-none [&::-webkit-details-marker]:hidden">
                <span className="text-lg pr-4">{item.pergunta}</span>
                <span className="transition group-open:rotate-180 flex-shrink-0 text-gray-500">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed text-lg">
                {item.resposta}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
