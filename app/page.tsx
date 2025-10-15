"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star,
  ChevronDown,
  Sparkles,
  Award,
  TrendingUp,
  Users,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[80vh] pt-20">
        {/* Background com gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-secondary/10">
          <div className="particles" />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge Superior */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
                <span className="text-primary font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Avaliação de Serviços
                </span>
              </div>
            </motion.div>

            {/* Título Principal */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="block bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                Avalie Nossos
              </span>
              <span className="block text-gray-900 mt-2">
                Serviços de Limpeza
              </span>
            </h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-light"
            >
              Sua opinião é muito importante para nós! Compartilhe sua experiência e ajude-nos a melhorar continuamente.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <Link href="/avaliar">
                <Button variant="primary" className="text-lg px-8 py-4">
                  <Star className="w-5 h-5" />
                  Avaliar Agora
                </Button>
              </Link>
              <Link href="/avaliacoes">
                <Button variant="outline" className="text-lg px-8 py-4">
                  <MessageSquare className="w-5 h-5" />
                  Ver Avaliações
                </Button>
              </Link>
            </motion.div>

            {/* Estatísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500" fill="#eab308" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.9/5.0 Avaliação</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-gray-600 font-medium">100+ Clientes Satisfeitos</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Seta animada */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-8 h-8 text-primary/60" />
          </motion.div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="relative py-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header da Seção */}
          <div className="mb-12 text-center">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Por que avaliar?</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent">
                Sua Opinião Importa
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cada avaliação nos ajuda a melhorar e oferecer um serviço ainda melhor
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
          </div>

          {/* Grid de Benefícios */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card hover gradient className="h-full">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary to-red-700 flex items-center justify-center mb-4">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Melhoria Contínua
                  </h3>
                  <p className="text-gray-600">
                    Suas avaliações nos ajudam a identificar pontos de melhoria e aprimorar nossos serviços constantemente.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover gradient className="h-full">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-secondary to-blue-700 flex items-center justify-center mb-4">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Reconhecimento
                  </h3>
                  <p className="text-gray-600">
                    Reconheça o trabalho bem feito da nossa equipe e motive-os a continuar entregando excelência.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card hover gradient className="h-full">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center mb-4">
                    <MessageSquare className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Comunicação Direta
                  </h3>
                  <p className="text-gray-600">
                    Estabeleça um canal direto de comunicação conosco e compartilhe sugestões valiosas.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Pronto para Avaliar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Sua avaliação leva menos de 2 minutos e faz toda a diferença para nós!
            </p>
            <Link href="/avaliar">
              <button className="rounded-full px-8 py-4 font-bold text-lg text-primary bg-white hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:scale-105 inline-flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Começar Avaliação
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

