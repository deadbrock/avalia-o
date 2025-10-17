"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Upload, CheckCircle, AlertCircle, Loader } from "lucide-react";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function MigrarPage() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState<string>("");
  const [verificando, setVerificando] = useState(false);
  const [statusKV, setStatusKV] = useState<any>(null);

  const verificarConexao = async () => {
    setVerificando(true);
    setErro("");
    
    try {
      const response = await fetch('/api/migrate');
      const data = await response.json();
      
      setStatusKV(data);
      
      if (!data.success) {
        setErro(data.error + (data.details ? `: ${data.details}` : ''));
      }
    } catch (error) {
      setErro('Erro ao verificar conexão com Vercel KV');
    }
    
    setVerificando(false);
  };

  const migrarDados = async () => {
    setLoading(true);
    setErro("");
    setResultado(null);

    try {
      // Buscar dados do localStorage
      const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
      
      if (avaliacoes.length === 0) {
        setErro("Nenhum dado encontrado no localStorage para migrar.");
        setLoading(false);
        return;
      }

      // Enviar para API de migração
      const response = await fetch('/api/migrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avaliacoes }),
      });

      const data = await response.json();

      if (data.success) {
        setResultado(data);
        // Recarregar dados do KV
        await verificarConexao();
      } else {
        setErro(data.error + (data.details ? `: ${data.details}` : ''));
      }
    } catch (error) {
      setErro("Erro ao migrar dados. Verifique se o Vercel KV está configurado.");
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />

        <main className="flex-1 p-8 ml-0 lg:ml-64">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Migração de Dados
              </h1>
              <p className="text-gray-600">
                Migre os dados do localStorage para o Vercel KV
              </p>
            </motion.div>

            {/* Card de Verificação */}
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Status da Conexão
                </h2>
                <Button
                  onClick={verificarConexao}
                  disabled={verificando}
                  variant="outline"
                >
                  {verificando ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4" />
                      Verificar Conexão
                    </>
                  )}
                </Button>
              </div>

              {statusKV && (
                <div className={`p-4 rounded-xl ${statusKV.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  {statusKV.success ? (
                    <div>
                      <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                        <CheckCircle className="w-5 h-5" />
                        Conexão OK!
                      </div>
                      <p className="text-sm text-green-600 mb-3">
                        {statusKV.message}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700">Avaliações no KV:</span>
                          <span className="font-bold">{statusKV.avaliacoes.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700">Planos de Ação no KV:</span>
                          <span className="font-bold">{statusKV.planosAcao.total}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 text-red-700 font-semibold mb-2">
                        <AlertCircle className="w-5 h-5" />
                        Erro na Conexão
                      </div>
                      <p className="text-sm text-red-600 mb-2">
                        {statusKV.error}
                      </p>
                      {statusKV.details && (
                        <p className="text-xs text-red-500 mb-2">
                          Detalhes: {statusKV.details}
                        </p>
                      )}
                      {statusKV.hint && (
                        <p className="text-xs text-gray-600 bg-white p-2 rounded">
                          💡 {statusKV.hint}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Card de Migração */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Migrar Dados do localStorage
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Como funciona:</strong> Esta ferramenta copia os dados salvos
                  no navegador (localStorage) para o Vercel KV (banco de dados na nuvem).
                  Assim, todos os computadores terão acesso aos mesmos dados.
                </p>
              </div>

              {erro && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Erro</p>
                      <p className="text-sm text-red-700">{erro}</p>
                    </div>
                  </div>
                </div>
              )}

              {resultado && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-2">
                        {resultado.message}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total no KV</p>
                          <p className="text-2xl font-bold text-green-600">
                            {resultado.total}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Novos Migrados</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {resultado.novos}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Já Existiam</p>
                          <p className="text-2xl font-bold text-gray-600">
                            {resultado.existentes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={migrarDados}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Migrando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Migrar Dados
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Instruções */}
            <Card className="mt-6 bg-gray-50">
              <h3 className="font-bold text-gray-900 mb-3">📋 Instruções</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. Clique em "Verificar Conexão" para testar o Vercel KV</li>
                <li>2. Se a conexão estiver OK, clique em "Migrar Dados"</li>
                <li>3. Os dados serão copiados para o banco de dados na nuvem</li>
                <li>4. Pronto! Agora todos os computadores verão os mesmos dados</li>
              </ol>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

