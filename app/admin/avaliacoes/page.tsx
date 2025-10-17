"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  MapPin,
  User,
  X,
} from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";

interface Avaliacao {
  id: number;
  nome: string;
  email: string;
  local: string;
  data: string;
  avaliacaoGeral: string;
  recomendaria: string;
  melhoriaDescricao?: string;
  elogio?: string;
  dataAvaliacao: string;
  [key: string]: any;
}

export default function AvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [filteredAvaliacoes, setFilteredAvaliacoes] = useState<Avaliacao[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNota, setFilterNota] = useState("");
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<Avaliacao | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("avaliacoes");
    if (stored) {
      const data = JSON.parse(stored);
      setAvaliacoes(data);
      setFilteredAvaliacoes(data);
    }
  }, []);

  useEffect(() => {
    let filtered = avaliacoes;

    // Filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (av) =>
          av.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          av.local.toLowerCase().includes(searchTerm.toLowerCase()) ||
          av.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro de nota
    if (filterNota) {
      filtered = filtered.filter((av) => av.avaliacaoGeral === filterNota);
    }

    setFilteredAvaliacoes(filtered);
  }, [searchTerm, filterNota, avaliacoes]);

  const exportarCSV = () => {
    try {
      // Cabeçalhos do CSV
      const headers = [
        'ID',
        'Data da Avaliação',
        'Nome',
        'Email',
        'Telefone',
        'Local',
        'Data do Serviço',
        'Avaliação Geral',
        'Atendimento',
        'Qualidade',
        'Pontualidade',
        'Postura',
        'Gestão',
        'Recomendaria',
        'Elogios',
        'Sugestões'
      ];

      // Dados
      const rows = filteredAvaliacoes.map(av => [
        av.id,
        new Date(av.dataAvaliacao).toLocaleDateString('pt-BR'),
        av.nome,
        av.email,
        av.telefone || '',
        av.local,
        new Date(av.data).toLocaleDateString('pt-BR'),
        av.avaliacaoGeral,
        av.atendimento,
        av.qualidade,
        av.pontualidade,
        av.postura,
        av.gestao,
        av.recomendaria,
        av.elogios || '',
        av.sugestoes || ''
      ]);

      // Criar CSV
      const csvContent = [
        headers.join(';'),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(';'))
      ].join('\n');

      // Adicionar BOM para UTF-8
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Download
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `avaliacoes-fg-services-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    } catch (error) {
      console.error('Erro ao exportar CSV:', error);
      alert('Erro ao exportar CSV. Tente novamente.');
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 lg:ml-72 p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Todas as Avaliações
            </h1>
            <p className="text-gray-600">
              {filteredAvaliacoes.length} avaliações encontradas
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, local ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all"
                />
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                <select
                  value={filterNota}
                  onChange={(e) => setFilterNota(e.target.value)}
                  className="rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary transition-all"
                >
                  <option value="">Todas as notas</option>
                  <option value="Excelente">Excelente</option>
                  <option value="Bom">Bom</option>
                  <option value="Regular">Regular</option>
                  <option value="Ruim">Ruim</option>
                  <option value="Péssimo">Péssimo</option>
                </select>

                <Button variant="secondary" onClick={exportarCSV}>
                  <Download className="w-5 h-5" />
                  Exportar
                </Button>
              </div>
            </div>
          </Card>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Local
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Data
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Avaliação
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Recomenda
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAvaliacoes.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        Nenhuma avaliação encontrada
                      </td>
                    </tr>
                  ) : (
                    filteredAvaliacoes.map((av, index) => (
                      <motion.tr
                        key={av.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{av.nome}</p>
                            <p className="text-sm text-gray-500">{av.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{av.local}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(av.dataAvaliacao).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
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
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-medium ${
                              av.recomendaria === "Sim"
                                ? "text-green-600"
                                : av.recomendaria === "Não"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {av.recomendaria}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedAvaliacao(av)}
                            className="text-primary hover:text-red-700 transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
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
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-gray-900">
                  Detalhes da Avaliação
                </h2>
                <button
                  onClick={() => setSelectedAvaliacao(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Info Cliente */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Informações do Cliente</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Nome</p>
                      <p className="font-semibold">{selectedAvaliacao.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold">{selectedAvaliacao.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Local</p>
                      <p className="font-semibold">{selectedAvaliacao.local}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Data do Serviço</p>
                      <p className="font-semibold">{selectedAvaliacao.data}</p>
                    </div>
                  </div>
                </div>

                {/* Avaliação Geral */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Avaliação Geral</h3>
                  <div className="flex gap-4">
                    <Badge variant="success" className="text-lg px-4 py-2">
                      {selectedAvaliacao.avaliacaoGeral}
                    </Badge>
                    <Badge
                      variant={selectedAvaliacao.recomendaria === "Sim" ? "success" : "primary"}
                      className="text-lg px-4 py-2"
                    >
                      {selectedAvaliacao.recomendaria === "Sim" ? "Recomenda" : "Não Recomenda"}
                    </Badge>
                  </div>
                </div>

                {/* Melhorias */}
                {selectedAvaliacao.melhoriaDescricao && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Sugestões de Melhoria</h3>
                    <p className="text-gray-700 bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                      {selectedAvaliacao.melhoriaDescricao}
                    </p>
                  </div>
                )}

                {/* Elogios */}
                {selectedAvaliacao.elogio && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Elogios</h3>
                    <p className="text-gray-700 bg-green-50 p-4 rounded-xl border border-green-200">
                      {selectedAvaliacao.elogio}
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

