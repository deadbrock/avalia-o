"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md">
                <Image
                  src="/logo-fg.png"
                  alt="FG Services Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FG Services
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              A FG Services oferece serviços de limpeza profissional. Avalie nosso trabalho e ajude-nos a melhorar continuamente.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/avaliar" className="text-gray-600 hover:text-primary transition-colors">
                  Avaliar Serviço
                </Link>
              </li>
              <li>
                <Link href="/avaliacoes" className="text-gray-600 hover:text-primary transition-colors">
                  Ver Avaliações
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                (81) 99123-6035
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                adm@fgservices.com.br
              </li>
              <li className="flex items-start gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                Igarassu, PE
              </li>
            </ul>
          </div>

          {/* Horário de Atendimento */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Atendimento</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Segunda a Sexta</p>
              <p className="font-semibold text-primary">08:00 - 17:00</p>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left" suppressHydrationWarning>
              © {new Date().getFullYear()} FG Services. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="#" className="hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

