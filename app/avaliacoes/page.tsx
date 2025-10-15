"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  MapPin,
  MessageSquare,
  TrendingUp,
  Users,
  Award,
  Filter,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

interface Avaliacao {
  id: number;
  nome: string;
  email: string;
  local: string;
  data: string;
  nota: number;
  comentario: string;
  aspectos: {
    qualidade: number;
    pontualidade: number;
    profissionalismo: number;
    atendimento: number;
  };
  dataAvaliacao: string;
}

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [filtroNota, setFiltroNota] = useState<number>(0);

  useEffect(() => {
    // Carregar avaliações do localStorage
    const stored = localStorage.getItem("avaliacoes");
    if (stored) {
      setAvaliacoes(JSON.parse(stored));
    } else {
      // Dados de exemplo
      const exemplos: Avaliacao[] = [
        {
          id: 1,
          nome: "Maria Silva",
          email: "maria@email.com",
          local: "Apartamento - São Paulo",
          data: "2025-10-10",
          nota: 5,
          comentario:
            "Serviço excepcional! A equipe foi muito atenciosa e deixou tudo impecável. Super recomendo!",
          aspectos: {
            qualidade: 5,
            pontualidade: 5,
            profissionalismo: 5,
            atendimento: 5,
          },
          dataAvaliacao: "2025-10-11T10:30:00",
        },
        {
          id: 2,
          nome: "João Santos",
          email: "joao@email.com",
          local: "Casa - Campinas",
          data: "2025-10-08",
          nota: 4,
          comentario:
            "Muito bom! Apenas um pequeno atraso no início, mas o trabalho foi excelente.",
          aspectos: {
            qualidade: 5,
            pontualidade: 3,
            profissionalismo: 4,
            atendimento: 4,
          },
          dataAvaliacao: "2025-10-09T14:20:00",
        },
        {
          id: 3,
          nome: "Ana Paula",
          email: "ana@email.com",
          local: "Escritório - São Paulo",
          data: "2025-10-05",
          nota: 5,
          comentario:
            "Trabalho impecável! A atenção aos detalhes foi surpreendente. Voltarei a contratar com certeza.",
          aspectos: {
            qualidade: 5,
            pontualidade: 5,
            profissionalismo: 5,
            atendimento: 5,
          },
          dataAvaliacao: "2025-10-06T09:15:00",
        },
      ];
      setAvaliacoes(exemplos);
      localStorage.setItem("avaliacoes", JSON.stringify(exemplos));
    }
  }, []);

  const avaliacoesFiltradas =
    filtroNota === 0
      ? avaliacoes
      : avaliacoes.filter((av) => av.nota === filtroNota);

  const mediaGeral =
    avaliacoes.length > 0
      ? (
          avaliacoes.reduce((acc, av) => acc + av.nota, 0) / avaliacoes.length
        ).toFixed(1)
      : "0.0";

  const distribuicaoNotas = {
    5: avaliacoes.filter((av) => av.nota === 5).length,
    4: avaliacoes.filter((av) => av.nota === 4).length,
    3: avaliacoes.filter((av) => av.nota === 3).length,
    2: avaliacoes.filter((av) => av.nota === 2).length,
    1: avaliacoes.filter((av) => av.nota === 1).length,
  };

  const renderStars = (nota: number, size: "sm" | "md" = "md") => {
    const starSize = size === "md" ? "w-5 h-5" : "w-4 h-4";
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= nota ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header da Página */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mb-4">
              <span className="text-primary font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Feedback dos Clientes
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent">
                Avaliações dos Nossos Serviços
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Veja o que nossos clientes estão dizendo sobre nosso trabalho
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {/* Média Geral */}
            <Card hover className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" fill="white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {mediaGeral}
              </h3>
              <p className="text-gray-600 font-medium">Avaliação Média</p>
              <div className="mt-3 flex justify-center">
                {renderStars(Math.round(parseFloat(mediaGeral)))}
              </div>
            </Card>

            {/* Total de Avaliações */}
            <Card hover className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-red-700 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {avaliacoes.length}
              </h3>
              <p className="text-gray-600 font-medium">Avaliações Recebidas</p>
            </Card>

            {/* Recomendação */}
            <Card hover className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {avaliacoes.length > 0
                  ? Math.round(
                      (avaliacoes.filter((av) => av.nota >= 4).length /
                        avaliacoes.length) *
                        100
                    )
                  : 0}
                %
              </h3>
              <p className="text-gray-600 font-medium">Recomendam Nosso Serviço</p>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filtros */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Filtros
                </h2>

                <div className="space-y-4">
                  <button
                    onClick={() => setFiltroNota(0)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      filtroNota === 0
                        ? "bg-gradient-to-r from-primary to-red-700 text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Todas</span>
                      <Badge
                        variant={filtroNota === 0 ? "gradient" : "primary"}
                        className="bg-white/20 text-white"
                      >
                        {avaliacoes.length}
                      </Badge>
                    </div>
                  </button>

                  {[5, 4, 3, 2, 1].map((nota) => (
                    <button
                      key={nota}
                      onClick={() => setFiltroNota(nota)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        filtroNota === nota
                          ? "bg-gradient-to-r from-primary to-red-700 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {renderStars(nota, "sm")}
                        </div>
                        <Badge
                          variant={filtroNota === nota ? "gradient" : "primary"}
                          className={
                            filtroNota === nota
                              ? "bg-white/20 text-white"
                              : ""
                          }
                        >
                          {distribuicaoNotas[nota as keyof typeof distribuicaoNotas]}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Lista de Avaliações */}
            <div className="lg:col-span-3 space-y-6">
              {avaliacoesFiltradas.length === 0 ? (
                <Card className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Nenhuma avaliação encontrada
                  </h3>
                  <p className="text-gray-600">
                    {filtroNota > 0
                      ? `Não há avaliações com ${filtroNota} estrelas ainda.`
                      : "Seja o primeiro a avaliar nosso serviço!"}
                  </p>
                </Card>
              ) : (
                avaliacoesFiltradas.map((avaliacao, index) => (
                  <motion.div
                    key={avaliacao.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card hover gradient>
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {avaliacao.nome}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {avaliacao.local}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatarData(avaliacao.dataAvaliacao)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start sm:items-end gap-2">
                            {renderStars(avaliacao.nota)}
                            <Badge variant="gradient">
                              {avaliacao.nota === 5 && "Excelente"}
                              {avaliacao.nota === 4 && "Muito Bom"}
                              {avaliacao.nota === 3 && "Bom"}
                              {avaliacao.nota === 2 && "Regular"}
                              {avaliacao.nota === 1 && "Ruim"}
                            </Badge>
                          </div>
                        </div>

                        {/* Comentário */}
                        {avaliacao.comentario && (
                          <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                            <p className="text-gray-700 italic">
                              "{avaliacao.comentario}"
                            </p>
                          </div>
                        )}

                        {/* Aspectos */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Qualidade
                            </p>
                            {renderStars(avaliacao.aspectos.qualidade, "sm")}
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Pontualidade
                            </p>
                            {renderStars(avaliacao.aspectos.pontualidade, "sm")}
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Profissionalismo
                            </p>
                            {renderStars(avaliacao.aspectos.profissionalismo, "sm")}
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Atendimento
                            </p>
                            {renderStars(avaliacao.aspectos.atendimento, "sm")}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

