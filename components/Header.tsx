"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-gray-200 ${
        scrolled ? "bg-white shadow-md h-16" : "bg-white/95 backdrop-blur-sm h-20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
            <Image
              src="/logo-fg.png"
              alt="FG Services Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FG Services
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-300"
          >
            Início
          </Link>
          <Link
            href="/avaliar"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-300"
          >
            Avaliar Serviço
          </Link>
          <Link
            href="/avaliacoes"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-300"
          >
            Ver Avaliações
          </Link>
          <Link
            href="/qrcode"
            className="text-gray-700 hover:text-primary font-medium transition-colors duration-300"
          >
            QR Code
          </Link>
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden md:block">
          <Link
            href="/avaliar"
            className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-red-700 hover:from-red-700 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Avaliar Agora
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

        {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 py-2"
            >
              Início
            </Link>
            <Link
              href="/avaliar"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 py-2"
            >
              Avaliar Serviço
            </Link>
            <Link
              href="/avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 py-2"
            >
              Ver Avaliações
            </Link>
            <Link
              href="/qrcode"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 py-2"
            >
              QR Code
            </Link>
            <Link
              href="/avaliar"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-red-700 text-center"
            >
              Avaliar Agora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

