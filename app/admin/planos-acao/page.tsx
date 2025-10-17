"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Edit,
} from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

interface PlanoAcao {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: "alta" | "media" | "baixa";
  status: "pendente" | "em-progresso" | "concluido";
  responsavel: string;
  prazo: string;
  dataCriacao: string;
}

export default function PlanosAcaoPage() {
  const [planos, setPlanos] = useState<PlanoAcao[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [novoPlano, setNovoPlano] = useState<Partial<PlanoAcao>>({
    titulo: "",
    descricao: "",
    categoria: "Qualidade",
    prioridade: "media",
    status: "pendente",
    responsavel: "",
    prazo: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("planosAcao");
    if (stored) {
      setPlanos(JSON.parse(stored));
    } else {
      // Planos de exemplo
      const exemplos: PlanoAcao[] = [
        {
          id: 1,
          titulo: "Melhorar limpeza de banheiros",
          descricao: "Implementar checklist específico para banheiros e aumentar frequência de inspeção",
          categoria: "Qualidade",
          prioridade: "alta",
          status: "em-progresso",
          responsavel: "João Silva",
          prazo: "2025-11-01",
          dataCriacao: new Date().toISOString(),
        },
        {
          id: 2,
          titulo: "Treinamento de equipe",
          descricao: "Realizar treinamento sobre uso de EPIs e protocolos de segurança",
          categoria: "Segurança",
          prioridade: "alta",
          status: "pendente",
          responsavel: "Maria Santos",
          prazo: "2025-10-25",
          dataCriacao: new Date().toISOString(),
        },
      ];
      setPlanos(exemplos);
      localStorage.setItem("planosAcao", JSON.stringify(exemplos));
    }
  }, []);

  const salvarPlano = () => {
    const plano: PlanoAcao = {
      ...(novoPlano as PlanoAcao),
      id: Date.now(),
      dataCriacao: new Date().toISOString(),
    };

    const novosPlanos = [plano, ...planos];
    setPlanos(novosPlanos);
    localStorage.setItem("planosAcao", JSON.stringify(novosPlanos));
    setShowModal(false);
    setNovoPlano({
      titulo: "",
      descricao: "",
      categoria: "Qualidade",
      prioridade: "media",
      status: "pendente",
      responsavel: "",
      prazo: "",
    });
  };

  const atualizarStatus = (id: number, novoStatus: PlanoAcao["status"]) => {
    const novosPlanos = planos.map((p) =>
      p.id === id ? { ...p, status: novoStatus } : p
    );
    setPlanos(novosPlanos);
    localStorage.setItem("planosAcao", JSON.stringify(novosPlanos));
  };

  const deletarPlano = (id: number) => {
    if (confirm("Tem certeza que deseja deletar este plano de ação?")) {
      const novosPlanos = planos.filter((p) => p.id !== id);
      setPlanos(novosPlanos);
      localStorage.setItem("planosAcao", JSON.stringify(novosPlanos));
    }
  };

  const stats = {
    total: planos.length,
    pendentes: planos.filter((p) => p.status === "pendente").length,
    emProgresso: planos.filter((p) => p.status === "em-progresso").length,
    concluidos: planos.filter((p) => p.status === "concluido").length,
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 lg:ml-72 p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Planos de Ação
              </h1>
              <p className="text-gray-600">Gerencie as ações de melhoria</p>
            </div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Plus className="w-5 h-5" />
              Novo Plano
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Total</h3>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Pendentes</h3>
                <AlertCircle className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendentes}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Em Progresso</h3>
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{stats.emProgresso}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-gray-600">Concluídos</h3>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.concluidos}</p>
            </Card>
          </div>

          {/* Lista de Planos */}
          <div className="space-y-4">
            {planos.length === 0 ? (
              <Card className="p-12 text-center">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Nenhum plano de ação
                </h3>
                <p className="text-gray-600 mb-6">
                  Crie seu primeiro plano de ação para melhorias
                </p>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  <Plus className="w-5 h-5" />
                  Criar Plano
                </Button>
              </Card>
            ) : (
              planos.map((plano, index) => (
                <motion.div
                  key={plano.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card hover className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {plano.titulo}
                          </h3>
                          <Badge
                            variant={
                              plano.prioridade === "alta"
                                ? "primary"
                                : plano.prioridade === "media"
                                ? "info"
                                : "success"
                            }
                          >
                            {plano.prioridade === "alta"
                              ? "Alta"
                              : plano.prioridade === "media"
                              ? "Média"
                              : "Baixa"}
                          </Badge>
                          <Badge variant="info">{plano.categoria}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{plano.descricao}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>Responsável: {plano.responsavel}</span>
                          <span>Prazo: {new Date(plano.prazo).toLocaleDateString("pt-BR")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => deletarPlano(plano.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => atualizarStatus(plano.id, "pendente")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          plano.status === "pendente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Pendente
                      </button>
                      <button
                        onClick={() => atualizarStatus(plano.id, "em-progresso")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          plano.status === "em-progresso"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Em Progresso
                      </button>
                      <button
                        onClick={() => atualizarStatus(plano.id, "concluido")}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          plano.status === "concluido"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        Concluído
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </main>

        {/* Modal Novo Plano */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Novo Plano de Ação
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    value={novoPlano.titulo}
                    onChange={(e) =>
                      setNovoPlano({ ...novoPlano, titulo: e.target.value })
                    }
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-primary transition-all"
                    placeholder="Ex: Melhorar limpeza de banheiros"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Descrição *
                  </label>
                  <textarea
                    value={novoPlano.descricao}
                    onChange={(e) =>
                      setNovoPlano({ ...novoPlano, descricao: e.target.value })
                    }
                    rows={3}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-primary transition-all resize-none"
                    placeholder="Descreva as ações necessárias..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoria *
                    </label>
                    <select
                      value={novoPlano.categoria}
                      onChange={(e) =>
                        setNovoPlano({ ...novoPlano, categoria: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-primary transition-all"
                    >
                      <option>Qualidade</option>
                      <option>Pontualidade</option>
                      <option>Atendimento</option>
                      <option>Segurança</option>
                      <option>Gestão</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prioridade *
                    </label>
                    <select
                      value={novoPlano.prioridade}
                      onChange={(e) =>
                        setNovoPlano({
                          ...novoPlano,
                          prioridade: e.target.value as PlanoAcao["prioridade"],
                        })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-primary transition-all"
                    >
                      <option value="baixa">Baixa</option>
                      <option value="media">Média</option>
                      <option value="alta">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Responsável *
                    </label>
                    <input
                      type="text"
                      value={novoPlano.responsavel}
                      onChange={(e) =>
                        setNovoPlano({ ...novoPlano, responsavel: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-primary transition-all"
                      placeholder="Nome do responsável"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prazo *
                    </label>
                    <input
                      type="date"
                      value={novoPlano.prazo}
                      onChange={(e) =>
                        setNovoPlano({ ...novoPlano, prazo: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="primary"
                  onClick={salvarPlano}
                  disabled={
                    !novoPlano.titulo ||
                    !novoPlano.descricao ||
                    !novoPlano.responsavel ||
                    !novoPlano.prazo
                  }
                  className="flex-1"
                >
                  Criar Plano
                </Button>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

