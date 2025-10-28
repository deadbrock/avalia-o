"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Calendar, TrendingUp, Target } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { 
  gerarPDFPlanoAcao,
  gerarPDFRelatorioMensal,
  gerarPDFRelatorioSatisfacao,
  gerarPDFRelatorioDetalhado
} from "@/lib/pdfGenerator";

interface PlanoAcao {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: 'alta' | 'media' | 'baixa';
  status: 'pendente' | 'em-progresso' | 'concluido';
  responsavel: string;
  prazo: string;
  dataCriacao: string;
}

interface Avaliacao {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  local: string;
  data: string;
  
  // Atendimento e comunicação
  cordialidade: string;
  comunicacao: string;
  agilidade: string;
  
  // Qualidade do serviço
  limpezaOrganizacao: string;
  banheirosVestiarios: string;
  pisos: string;
  materiaisEquipamentos: string;
  protocolosSeguranca: string;
  
  // Pontualidade e frequência
  cumprimentoHorarios: string;
  reforcoLimpeza: string;
  substituicao: string;
  
  // Postura profissional
  responsabilidade: string;
  apresentacaoPessoal: string;
  comportamento: string;
  
  // Gestão e supervisão
  acompanhamentoSupervisor: string;
  correcaoNaoConformidades: string;
  gerenciamentoContrato: string;
  
  // Satisfação geral
  avaliacaoGeral: string;
  recomendaria: string;
  melhoriaArea?: string;
  melhoriaDescricao?: string;
  elogio?: string;
  
  dataAvaliacao: string;
}

export default function RelatoriosPage() {
  const [planos, setPlanos] = useState<PlanoAcao[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    // Carregar planos de ação do localStorage (ainda não tem API para planos)
    const storedPlanos = localStorage.getItem("planosAcao");
    if (storedPlanos) {
      setPlanos(JSON.parse(storedPlanos));
    }

    // Carregar avaliações da API
    const carregarAvaliacoes = async () => {
      try {
        const response = await fetch('/api/avaliacoes');
        if (response.ok) {
          const result = await response.json();
          const data = result.data || [];
          setAvaliacoes(data);
        } else {
          console.error('Erro ao carregar avaliações');
          setAvaliacoes([]);
        }
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
        setAvaliacoes([]);
      }
    };
    
    carregarAvaliacoes();
  }, []);

  const gerarRelatorio = (tipo: string) => {
    setLoading(tipo);
    
    setTimeout(() => {
      try {
        if (tipo === "Plano de Ação") {
          if (planos.length === 0) {
            alert("Nenhum plano de ação cadastrado para gerar relatório.");
            setLoading(null);
            return;
          }
          gerarPDFPlanoAcao(planos);
        } else if (tipo === "Relatório Mensal") {
          if (avaliacoes.length === 0) {
            alert("Nenhuma avaliação disponível para gerar relatório.");
            setLoading(null);
            return;
          }
          gerarPDFRelatorioMensal(avaliacoes);
        } else if (tipo === "Relatório de Satisfação") {
          if (avaliacoes.length === 0) {
            alert("Nenhuma avaliação disponível para gerar relatório.");
            setLoading(null);
            return;
          }
          gerarPDFRelatorioSatisfacao(avaliacoes);
        } else if (tipo === "Relatório Detalhado") {
          if (avaliacoes.length === 0) {
            alert("Nenhuma avaliação disponível para gerar relatório.");
            setLoading(null);
            return;
          }
          gerarPDFRelatorioDetalhado(avaliacoes);
        }
      } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        alert('Erro ao gerar relatório. Tente novamente.');
      }
      
      setLoading(null);
    }, 500);
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
                titulo: "Plano de Ação",
                descricao: "Relatório completo para o time operacional",
                icon: Target,
                cor: "from-primary to-red-700",
                badge: "PDF",
              },
              {
                titulo: "Relatório Mensal",
                descricao: "Resumo completo do mês atual",
                icon: Calendar,
                cor: "from-secondary to-blue-700",
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
                cor: "from-purple-500 to-purple-600",
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
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${relatorio.cor} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {relatorio.badge && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                          {relatorio.badge}
                        </span>
                      )}
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
                      disabled={loading === relatorio.titulo}
                    >
                      <Download className="w-4 h-4" />
                      {loading === relatorio.titulo ? 'Gerando...' : 'Gerar PDF'}
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

