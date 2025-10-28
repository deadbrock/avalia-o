"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  Users, 
  Eye, 
  Wand2,
  AlertTriangle,
  CheckCircle,
  X
} from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

interface Avaliacao {
  id: number;
  nome: string;
  email: string;
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

export default function AnalisesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<Avaliacao | null>(null);
  const [gerandoPlanos, setGerandoPlanos] = useState(false);
  const [planosGerados, setPlanosGerados] = useState<any[]>([]);

  useEffect(() => {
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

  const notasMap: { [key: string]: number } = {
    Excelente: 5,
    Boa: 4,
    Regular: 3,
    Ruim: 2,
    Péssima: 1,
  };

  // Análise de distribuição
  const distribuicaoNotas = avaliacoes.reduce((acc, av) => {
    acc[av.avaliacaoGeral] = (acc[av.avaliacaoGeral] || 0) + 1;
    return acc;
  }, {} as any);

  const total = avaliacoes.length;
  const positivas = avaliacoes.filter(av => 
    av.avaliacaoGeral === 'Excelente' || av.avaliacaoGeral === 'Boa'
  ).length;
  const negativas = avaliacoes.filter(av => 
    av.avaliacaoGeral === 'Ruim' || av.avaliacaoGeral === 'Péssima'
  ).length;

  // Gerar planos de ação automaticamente
  const gerarPlanosAutomaticos = () => {
    setGerandoPlanos(true);
    setPlanosGerados([]);

    setTimeout(() => {
      const planos: any[] = [];
      const problemas: { [key: string]: number } = {};

      // Analisar todas as avaliações
      avaliacoes.forEach(av => {
        const categorias = [
          { campo: 'cordialidade', nome: 'Cordialidade e respeito', categoria: 'Atendimento' },
          { campo: 'comunicacao', nome: 'Comunicação clara', categoria: 'Atendimento' },
          { campo: 'agilidade', nome: 'Agilidade no atendimento', categoria: 'Atendimento' },
          { campo: 'limpezaOrganizacao', nome: 'Limpeza e organização', categoria: 'Qualidade' },
          { campo: 'banheirosVestiarios', nome: 'Banheiros e vestiários', categoria: 'Qualidade' },
          { campo: 'pisos', nome: 'Pisos e carpetes', categoria: 'Qualidade' },
          { campo: 'materiaisEquipamentos', nome: 'Materiais e equipamentos', categoria: 'Qualidade' },
          { campo: 'protocolosSeguranca', nome: 'Protocolos de segurança', categoria: 'Segurança' },
          { campo: 'cumprimentoHorarios', nome: 'Cumprimento de horários', categoria: 'Pontualidade' },
          { campo: 'reforcoLimpeza', nome: 'Reforço de limpeza', categoria: 'Pontualidade' },
          { campo: 'substituicao', nome: 'Substituição de funcionários', categoria: 'Pontualidade' },
          { campo: 'responsabilidade', nome: 'Responsabilidade', categoria: 'Postura' },
          { campo: 'apresentacaoPessoal', nome: 'Apresentação pessoal', categoria: 'Postura' },
          { campo: 'comportamento', nome: 'Comportamento adequado', categoria: 'Postura' },
          { campo: 'acompanhamentoSupervisor', nome: 'Acompanhamento do supervisor', categoria: 'Gestão' },
          { campo: 'correcaoNaoConformidades', nome: 'Correção de não conformidades', categoria: 'Gestão' },
          { campo: 'gerenciamentoContrato', nome: 'Gerenciamento do contrato', categoria: 'Gestão' },
        ];

        categorias.forEach(cat => {
          const valor = (av as any)[cat.campo];
          if (valor === 'Ruim' || valor === 'Péssima') {
            const chave = `${cat.categoria}|${cat.nome}`;
            problemas[chave] = (problemas[chave] || 0) + 1;
          }
        });
      });

      // Criar planos para problemas recorrentes
      Object.entries(problemas)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5) // Top 5 problemas
        .forEach(([chave, quantidade]) => {
          const [categoria, problema] = chave.split('|');
          
          planos.push({
            titulo: `Melhorar ${problema}`,
            descricao: `Identificado problema recorrente em "${problema}". ${quantidade} avaliação(ões) reportaram insatisfação neste aspecto. Necessário plano de ação imediato.`,
            categoria: categoria,
            prioridade: quantidade >= 3 ? 'alta' : quantidade >= 2 ? 'media' : 'baixa',
            responsavel: 'Supervisor de Qualidade',
            prazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'pendente',
            dataCriacao: new Date().toISOString(),
          });
        });

      // Adicionar planos baseados em sugestões
      const sugestoes = avaliacoes.filter(av => av.melhoriaDescricao).slice(0, 3);
      sugestoes.forEach((av, index) => {
        planos.push({
          titulo: `Sugestão de Cliente - ${av.melhoriaArea || 'Geral'}`,
          descricao: `Sugestão de ${av.nome}: "${av.melhoriaDescricao}"`,
          categoria: av.melhoriaArea || 'Geral',
          prioridade: 'media',
          responsavel: 'Gerente de Operações',
          prazo: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pendente',
          dataCriacao: new Date().toISOString(),
        });
      });

      if (planos.length === 0) {
        planos.push({
          titulo: 'Manter Qualidade do Serviço',
          descricao: 'Não foram identificados problemas críticos. Manter o padrão atual de qualidade e continuar monitorando as avaliações.',
          categoria: 'Qualidade',
          prioridade: 'baixa',
          responsavel: 'Supervisor de Qualidade',
          prazo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'pendente',
          dataCriacao: new Date().toISOString(),
        });
      }

      setPlanosGerados(planos);
      setGerandoPlanos(false);
    }, 1500);
  };

  const salvarPlanos = () => {
    const existentes = JSON.parse(localStorage.getItem("planosAcao") || "[]");
    const novosPlanos = planosGerados.map((plano, index) => ({
      id: Date.now() + index,
      ...plano,
    }));
    
    localStorage.setItem("planosAcao", JSON.stringify([...novosPlanos, ...existentes]));
    alert(`${novosPlanos.length} plano(s) de ação criado(s) com sucesso!`);
    setPlanosGerados([]);
  };

  const categoriasAnalise = [
    {
      nome: 'Atendimento e Comunicação',
      campos: ['cordialidade', 'comunicacao', 'agilidade']
    },
    {
      nome: 'Qualidade do Serviço',
      campos: ['limpezaOrganizacao', 'banheirosVestiarios', 'pisos', 'materiaisEquipamentos', 'protocolosSeguranca']
    },
    {
      nome: 'Pontualidade',
      campos: ['cumprimentoHorarios', 'reforcoLimpeza', 'substituicao']
    },
    {
      nome: 'Postura Profissional',
      campos: ['responsabilidade', 'apresentacaoPessoal', 'comportamento']
    },
    {
      nome: 'Gestão',
      campos: ['acompanhamentoSupervisor', 'correcaoNaoConformidades', 'gerenciamentoContrato']
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 lg:ml-72 p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Análises e Insights
            </h1>
            <p className="text-gray-600">Análise detalhada das avaliações e geração de planos de ação</p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{total}</p>
                </div>
                <Users className="w-10 h-10 text-primary opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Positivas</p>
                  <p className="text-3xl font-bold text-green-600">{positivas}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Negativas</p>
                  <p className="text-3xl font-bold text-red-600">{negativas}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-red-500 opacity-20" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Satisfação</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {total > 0 ? ((positivas / total) * 100).toFixed(0) : 0}%
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Geração Automática de Planos */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Geração Automática de Planos de Ação
                  </h2>
                  <p className="text-sm text-gray-600">
                    IA analisa as avaliações e sugere planos de ação baseados em problemas identificados
                  </p>
                </div>
              </div>
              <Button
                onClick={gerarPlanosAutomaticos}
                disabled={gerandoPlanos || avaliacoes.length === 0}
                className="bg-gradient-to-r from-purple-500 to-purple-700"
              >
                {gerandoPlanos ? (
                  <>
                    <Activity className="w-5 h-5 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Gerar Planos
                  </>
                )}
              </Button>
            </div>

            {planosGerados.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">
                    {planosGerados.length} plano(s) de ação sugerido(s):
                  </p>
                  <Button onClick={salvarPlanos} variant="secondary">
                    <CheckCircle className="w-4 h-4" />
                    Salvar Todos os Planos
                  </Button>
                </div>

                {planosGerados.map((plano, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-purple-50 border border-purple-200 rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{plano.titulo}</h3>
                      <Badge variant={
                        plano.prioridade === 'alta' ? 'primary' : 
                        plano.prioridade === 'media' ? 'info' : 'gradient'
                      }>
                        {plano.prioridade === 'alta' ? 'Alta Prioridade' : 
                         plano.prioridade === 'media' ? 'Média Prioridade' : 'Baixa Prioridade'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{plano.descricao}</p>
                    <div className="flex gap-4 text-xs text-gray-600">
                      <span>📁 {plano.categoria}</span>
                      <span>👤 {plano.responsavel}</span>
                      <span>📅 Prazo: {new Date(plano.prazo).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          {/* Respostas Individuais */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-red-700 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Respostas Individuais dos Avaliadores
                </h2>
                <p className="text-sm text-gray-600">
                  Veja detalhadamente cada resposta de cada cliente
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {avaliacoes.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Nenhuma avaliação encontrada
                </p>
              ) : (
                avaliacoes.map((av, index) => (
                  <motion.div
                    key={av.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{av.nome}</h3>
                          <p className="text-sm text-gray-600">
                            {av.local} • {new Date(av.dataAvaliacao).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={
                            av.avaliacaoGeral === 'Excelente' || av.avaliacaoGeral === 'Boa' ? 'success' :
                            av.avaliacaoGeral === 'Regular' ? 'info' : 'primary'
                          }>
                            {av.avaliacaoGeral}
                          </Badge>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedAvaliacao(av)}
                          >
                            <Eye className="w-4 h-4" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </Card>

          {/* Análise por Categoria */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-red-700 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Distribuição Geral
                </h2>
              </div>

              <div className="space-y-4">
                {['Excelente', 'Boa', 'Regular', 'Ruim', 'Péssima'].map((nota) => {
                  const quantidade = distribuicaoNotas[nota] || 0;
                  const percentual = total > 0 ? ((quantidade / total) * 100).toFixed(1) : 0;
                  const cores: any = {
                    Excelente: 'bg-green-500',
                    Boa: 'bg-blue-500',
                    Regular: 'bg-yellow-500',
                    Ruim: 'bg-orange-500',
                    Péssima: 'bg-red-500',
                  };

                  return (
                    <div key={nota}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{nota}</span>
                        <span className="text-sm font-bold text-gray-900">
                          {quantidade} ({percentual}%)
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentual}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full ${cores[nota]}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-secondary to-blue-700 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Análise por Categoria
                </h2>
              </div>

              <div className="space-y-4">
                {categoriasAnalise.map(cat => {
                  const valores = avaliacoes.flatMap(av => 
                    cat.campos.map(campo => notasMap[(av as any)[campo]] || 0)
                  );
                  const media = valores.length > 0 ? 
                    valores.reduce((a, b) => a + b, 0) / valores.length : 0;
                  
                  return (
                    <div key={cat.nome} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{cat.nome}</span>
                        <span className="text-sm font-bold text-gray-900">
                          {media.toFixed(2)} / 5.0
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            media >= 4 ? 'bg-green-500' : 
                            media >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(media / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </main>

        {/* Modal de Detalhes */}
        {selectedAvaliacao && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAvaliacao(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedAvaliacao.nome}
                  </h2>
                  <p className="text-gray-600">
                    {selectedAvaliacao.local} • {new Date(selectedAvaliacao.dataAvaliacao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAvaliacao(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Avaliação Geral */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Avaliação Geral</h3>
                  <div className="flex gap-4">
                    <Badge variant="success" className="text-lg px-4 py-2">
                      {selectedAvaliacao.avaliacaoGeral}
                    </Badge>
                    <Badge variant={selectedAvaliacao.recomendaria === "Sim" ? "success" : "primary"} className="text-lg px-4 py-2">
                      {selectedAvaliacao.recomendaria === "Sim" ? "Recomenda" : "Não Recomenda"}
                    </Badge>
                  </div>
                </div>

                {/* Categorias */}
                {categoriasAnalise.map(cat => (
                  <div key={cat.nome}>
                    <h3 className="font-bold text-gray-900 mb-3">{cat.nome}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {cat.campos.map(campo => {
                        const valor = (selectedAvaliacao as any)[campo];
                        return (
                          <div key={campo} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1 capitalize">
                              {campo.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className={`font-semibold ${
                              valor === 'Excelente' || valor === 'Boa' ? 'text-green-600' :
                              valor === 'Regular' ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {valor || 'Não avaliado'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Elogio */}
                {selectedAvaliacao.elogio && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Elogio</h3>
                    <p className="text-gray-700 bg-green-50 p-4 rounded-xl border border-green-200">
                      {selectedAvaliacao.elogio}
                    </p>
                  </div>
                )}

                {/* Melhoria */}
                {selectedAvaliacao.melhoriaDescricao && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Sugestão de Melhoria</h3>
                    {selectedAvaliacao.melhoriaArea && (
                      <p className="text-sm text-gray-600 mb-2">
                        Área: {selectedAvaliacao.melhoriaArea}
                      </p>
                    )}
                    <p className="text-gray-700 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      {selectedAvaliacao.melhoriaDescricao}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
