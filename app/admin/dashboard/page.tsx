"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BarChart3,
} from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

interface Avaliacao {
  id: number;
  nome: string;
  local: string;
  data: string;
  avaliacaoGeral: string;
  recomendaria: string;
  dataAvaliacao: string;
}

export default function DashboardPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    mesAtual: 0,
    mediaGeral: 0,
    recomendacao: 0,
    excelentes: 0,
    problematicas: 0,
  });

  useEffect(() => {
    // Carregar avaliações
    const stored = localStorage.getItem("avaliacoes");
    if (stored) {
      const data = JSON.parse(stored);
      setAvaliacoes(data);
      
      // Calcular estatísticas
      const now = new Date();
      const mesAtual = data.filter((av: Avaliacao) => {
        const dataAv = new Date(av.dataAvaliacao);
        return (
          dataAv.getMonth() === now.getMonth() &&
          dataAv.getFullYear() === now.getFullYear()
        );
      }).length;

      const excelentes = data.filter(
        (av: Avaliacao) => av.avaliacaoGeral === "Excelente"
      ).length;

      const problematicas = data.filter(
        (av: Avaliacao) =>
          av.avaliacaoGeral === "Ruim" || av.avaliacaoGeral === "Péssimo"
      ).length;

      const recomendaSim = data.filter(
        (av: Avaliacao) => av.recomendaria === "Sim"
      ).length;

      const notasMap: { [key: string]: number } = {
        Excelente: 5,
        Bom: 4,
        Regular: 3,
        Ruim: 2,
        Péssimo: 1,
      };

      const somaNotas = data.reduce(
        (acc: number, av: Avaliacao) => acc + (notasMap[av.avaliacaoGeral] || 0),
        0
      );
      const mediaGeral = data.length > 0 ? somaNotas / data.length : 0;

      setStats({
        total: data.length,
        mesAtual,
        mediaGeral: Number(mediaGeral.toFixed(1)),
        recomendacao: data.length > 0 ? Math.round((recomendaSim / data.length) * 100) : 0,
        excelentes,
        problematicas,
      });
    }
  }, []);

  const avaliacoesRecentes = avaliacoes.slice(0, 5);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        
        <main className="flex-1 lg:ml-72 p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Visão geral das avaliações de serviço</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total de Avaliações */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-red-700 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="info">Total</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.total}
                </h3>
                <p className="text-sm text-gray-600">Avaliações Recebidas</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">
                    +{stats.mesAtual} este mês
                  </span>
                </div>
              </Card>
            </motion.div>

            {/* Média Geral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" fill="white" />
                  </div>
                  <Badge variant="success">Média</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.mediaGeral}
                </h3>
                <p className="text-sm text-gray-600">de 5.0</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  {stats.mediaGeral >= 4 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={stats.mediaGeral >= 4 ? "text-green-600" : "text-red-600"}>
                    {stats.mediaGeral >= 4 ? "Acima da meta" : "Abaixo da meta"}
                  </span>
                </div>
              </Card>
            </motion.div>

            {/* Recomendação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success">NPS</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.recomendacao}%
                </h3>
                <p className="text-sm text-gray-600">Recomendariam</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">
                    {stats.excelentes} avaliações excelentes
                  </span>
                </div>
              </Card>
            </motion.div>

            {/* Alertas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card hover className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stats.problematicas > 0
                      ? "bg-gradient-to-r from-red-500 to-red-600"
                      : "bg-gradient-to-r from-gray-400 to-gray-500"
                  }`}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  {stats.problematicas > 0 && (
                    <Badge className="bg-red-100 text-red-700">Atenção</Badge>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {stats.problematicas}
                </h3>
                <p className="text-sm text-gray-600">Avaliações Problemáticas</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  {stats.problematicas > 0 ? (
                    <span className="text-red-600 font-medium">
                      Requer atenção imediata
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">
                      Sem problemas
                    </span>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Grid de Conteúdo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Avaliações Recentes */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Avaliações Recentes
                  </h2>
                  <Badge variant="info">{avaliacoesRecentes.length} novas</Badge>
                </div>

                <div className="space-y-4">
                  {avaliacoesRecentes.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      Nenhuma avaliação ainda
                    </p>
                  ) : (
                    avaliacoesRecentes.map((av, index) => (
                      <motion.div
                        key={av.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{av.nome}</h3>
                            <p className="text-sm text-gray-600">{av.local}</p>
                          </div>
                          <Badge
                            variant={
                              av.avaliacaoGeral === "Excelente" || av.avaliacaoGeral === "Bom"
                                ? "success"
                                : av.avaliacaoGeral === "Regular"
                                ? "info"
                                : "primary"
                            }
                          >
                            {av.avaliacaoGeral}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(av.dataAvaliacao).toLocaleDateString("pt-BR")}
                          </span>
                          {av.recomendaria === "Sim" && (
                            <span className="text-green-600 font-medium">
                              ✓ Recomenda
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Ações Rápidas
                </h2>
                <div className="space-y-3">
                  <a
                    href="/admin/avaliacoes"
                    className="block p-4 bg-gradient-to-r from-primary/10 to-red-700/10 hover:from-primary/20 hover:to-red-700/20 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-gray-900">Ver Todas</p>
                        <p className="text-xs text-gray-600">Avaliações detalhadas</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="/admin/analises"
                    className="block p-4 bg-gradient-to-r from-secondary/10 to-blue-700/10 hover:from-secondary/20 hover:to-blue-700/20 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="font-semibold text-gray-900">Análises</p>
                        <p className="text-xs text-gray-600">Relatórios e gráficos</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="/admin/planos-acao"
                    className="block p-4 bg-gradient-to-r from-green-500/10 to-green-700/10 hover:from-green-500/20 hover:to-green-700/20 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Planos de Ação</p>
                        <p className="text-xs text-gray-600">Melhorias e correções</p>
                      </div>
                    </div>
                  </a>
                </div>
              </Card>

              {/* Status Summary */}
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Resumo de Status
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Excelente</span>
                    <span className="font-bold text-green-600">{stats.excelentes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bom/Regular</span>
                    <span className="font-bold text-blue-600">
                      {stats.total - stats.excelentes - stats.problematicas}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Problemático</span>
                    <span className="font-bold text-red-600">{stats.problematicas}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

