import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FG Services - Avaliação de Serviços de Limpeza",
  description: "Avalie os serviços de limpeza da FG Services e ajude-nos a melhorar continuamente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

