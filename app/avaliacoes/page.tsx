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
  avaliacaoGeral: string;
  recomendaria?: string;
  elogio?: string;
  melhoriaDescricao?: string;
  dataAvaliacao: string;
}

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar avaliações reais da API (Redis)
    const carregarAvaliacoes = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/avaliacoes");
        
        if (response.ok) {
          const result = await response.json();
          // A API retorna { success, data, total }
          const avaliacoesData = result.data || result || [];
          // Garantir que é sempre um array
          setAvaliacoes(Array.isArray(avaliacoesData) ? avaliacoesData : []);
        } else {
          console.error("Erro ao carregar avaliações");
          setAvaliacoes([]);
        }
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        setAvaliacoes([]);
      } finally {
        setLoading(false);
      }
    };

    carregarAvaliacoes();
  }, []);

  const notasMap: { [key: string]: number } = {
    Excelente: 5,
    Boa: 4,
    Regular: 3,
    Ruim: 2,
    Péssima: 1,
  };

  const mediaGeral =
    avaliacoes.length > 0
      ? (
          avaliacoes.reduce((acc, av) => acc + (notasMap[av.avaliacaoGeral] || 0), 0) / avaliacoes.length
        ).toFixed(1)
      : "0.0";

  const renderStars = (avaliacaoGeral: string, size: "sm" | "md" = "md") => {
    const nota = notasMap[avaliacaoGeral] || 0;
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
                {renderStars(
                  Object.keys(notasMap).find(
                    (key) => notasMap[key] === Math.round(parseFloat(mediaGeral))
                  ) || "Regular"
                )}
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
                      (avaliacoes.filter(
                        (av) => av.recomendaria === "Sim"
                      ).length /
                        avaliacoes.length) *
                        100
                    )
                  : 0}
                %
              </h3>
              <p className="text-gray-600 font-medium">Recomendam Nosso Serviço</p>
            </Card>
          </motion.div>

          {/* Lista de Avaliações */}
          <div className="space-y-6">
            {loading ? (
              <Card className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Carregando avaliações...
                </h3>
                <p className="text-gray-600">
                  Aguarde um momento
                </p>
              </Card>
            ) : avaliacoes.length === 0 ? (
              <Card className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Nenhuma avaliação encontrada
                </h3>
                <p className="text-gray-600">
                  Seja o primeiro a avaliar nosso serviço!
                </p>
              </Card>
            ) : (
              avaliacoes.map((avaliacao, index) => (
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
                          {renderStars(avaliacao.avaliacaoGeral)}
                          <Badge variant="gradient">
                            {avaliacao.avaliacaoGeral}
                          </Badge>
                        </div>
                      </div>

                      {/* Elogio */}
                      {avaliacao.elogio && (
                        <div className="mb-4 p-4 bg-green-50 rounded-xl border border-green-200">
                          <p className="text-gray-700 italic">
                            "{avaliacao.elogio}"
                          </p>
                        </div>
                      )}

                      {/* Melhoria */}
                      {avaliacao.melhoriaDescricao && (
                        <div className="mb-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                          <p className="text-sm text-gray-600 font-semibold mb-1">Sugestão de melhoria:</p>
                          <p className="text-gray-700 italic">
                            "{avaliacao.melhoriaDescricao}"
                          </p>
                        </div>
                      )}

                      {/* Recomendação */}
                      {avaliacao.recomendaria && (
                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {avaliacao.recomendaria === "Sim" 
                                ? "✅ Recomenda os serviços da FG Services" 
                                : avaliacao.recomendaria === "Não"
                                ? "❌ Não recomenda os serviços"
                                : "⚠️ Talvez recomende os serviços"
                              }
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
