"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function RelatoriosPage() {
  const gerarRelatorio = (tipo: string) => {
    alert(`Gerando relatório: ${tipo}`);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 lg:ml-72 p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Relatórios
            </h1>
            <p className="text-gray-600">
              Exporte relatórios detalhados das avaliações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                titulo: "Relatório Mensal",
                descricao: "Resumo completo do mês atual",
                icon: Calendar,
                cor: "from-primary to-red-700",
              },
              {
                titulo: "Relatório de Satisfação",
                descricao: "Análise de satisfação dos clientes",
                icon: TrendingUp,
                cor: "from-green-500 to-green-600",
              },
              {
                titulo: "Relatório Detalhado",
                descricao: "Todas as avaliações com detalhes",
                icon: FileText,
                cor: "from-secondary to-blue-700",
              },
            ].map((relatorio, index) => {
              const Icon = relatorio.icon;
              return (
                <motion.div
                  key={relatorio.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="p-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${relatorio.cor} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {relatorio.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {relatorio.descricao}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => gerarRelatorio(relatorio.titulo)}
                      className="w-full"
                    >
                      <Download className="w-4 h-4" />
                      Gerar PDF
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

