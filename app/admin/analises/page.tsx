"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";

export default function AnalisesPage() {
  const [dados, setDados] = useState({
    porCategoria: {} as any,
    evolucaoMensal: [] as any[],
    distribuicaoNotas: {} as any,
  });

  useEffect(() => {
    const stored = localStorage.getItem("avaliacoes");
    if (stored) {
      const avaliacoes = JSON.parse(stored);

      // Distribuição de notas
      const dist = avaliacoes.reduce((acc: any, av: any) => {
        acc[av.avaliacaoGeral] = (acc[av.avaliacaoGeral] || 0) + 1;
        return acc;
      }, {});

      setDados({
        porCategoria: dist,
        evolucaoMensal: [],
        distribuicaoNotas: dist,
      });
    }
  }, []);

  const notas = ["Excelente", "Bom", "Regular", "Ruim", "Péssimo"];
  const cores = {
    Excelente: "bg-green-500",
    Bom: "bg-blue-500",
    Regular: "bg-yellow-500",
    Ruim: "bg-orange-500",
    Péssimo: "bg-red-500",
  };

  const total = Object.values(dados.distribuicaoNotas).reduce(
    (a, b) => (a as number) + (b as number),
    0
  ) as number;

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 lg:ml-72 p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Análises e Gráficos
            </h1>
            <p className="text-gray-600">Visualização de dados e tendências</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribuição de Avaliações */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-red-700 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Distribuição de Avaliações
                </h2>
              </div>

              <div className="space-y-4">
                {notas.map((nota) => {
                  const quantidade = dados.distribuicaoNotas[nota] || 0;
                  const percentual =
                    total > 0 ? ((quantidade / total) * 100).toFixed(1) : 0;

                  return (
                    <div key={nota}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {nota}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {quantidade} ({percentual}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentual}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-full ${cores[nota as keyof typeof cores]}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Resumo Geral */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-secondary to-blue-700 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Resumo Geral</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {total}
                  </h3>
                  <p className="text-sm text-gray-600">Total de Avaliações</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">
                      {((dados.distribuicaoNotas.Excelente || 0) +
                        (dados.distribuicaoNotas.Bom || 0))}
                    </p>
                    <p className="text-xs text-green-700">Positivas</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-xl">
                    <p className="text-2xl font-bold text-red-600">
                      {((dados.distribuicaoNotas.Ruim || 0) +
                        (dados.distribuicaoNotas.Péssimo || 0))}
                    </p>
                    <p className="text-xs text-red-700">Negativas</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <p className="font-semibold text-gray-900">Satisfação Geral</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {total > 0
                      ? (
                          (((dados.distribuicaoNotas.Excelente || 0) +
                            (dados.distribuicaoNotas.Bom || 0)) /
                            total) *
                          100
                        ).toFixed(1)
                      : 0}
                    % dos clientes estão satisfeitos
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Info */}
          <Card className="p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold text-gray-900">
                Análises Avançadas
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Visualize tendências, compare períodos e identifique padrões nas
              avaliações recebidas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900 mb-1">
                  Por Categoria
                </p>
                <p className="text-sm text-gray-600">
                  Análise detalhada por tipo de serviço
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900 mb-1">
                  Evolução Temporal
                </p>
                <p className="text-sm text-gray-600">
                  Acompanhe mudanças ao longo do tempo
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="font-semibold text-gray-900 mb-1">
                  Comparativos
                </p>
                <p className="text-sm text-gray-600">
                  Compare diferentes períodos e locais
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}

