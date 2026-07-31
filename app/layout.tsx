import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pé Na Estrada Tour | Agência de Turismo",
  description: "Sua melhor experiência de viagem começa aqui. Reserve seus passeios, verifique lotação e garanta sua poltrona com conforto e segurança.",
  keywords: "turismo, passeios, viagens, excursão, agência de turismo, Paraíba, Pé Na Estrada Tour",
  openGraph: {
    title: "Pé Na Estrada Tour",
    description: "Garanta sua vaga nos melhores roteiros. Viagens seguras, confortáveis e inesquecíveis!",
    url: "https://pe-na-estrada-tour-site.web.app/",
    siteName: "Pé Na Estrada Tour",
    locale: "pt_BR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
