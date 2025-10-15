"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  User,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Button from "@/components/Button";

interface FormData {
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
}

export default function AvaliarPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    local: "",
    data: "",
    nota: 0,
    comentario: "",
    aspectos: {
      qualidade: 0,
      pontualidade: 0,
      profissionalismo: 0,
      atendimento: 0,
    },
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validação
    if (!formData.nome || !formData.email || !formData.local || !formData.data) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (formData.nota === 0) {
      setError("Por favor, selecione uma nota para o serviço.");
      return;
    }

    setLoading(true);

    // Simulação de envio
    setTimeout(() => {
      // Salvar no localStorage (em produção, enviar para API)
      const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
      avaliacoes.unshift({
        ...formData,
        id: Date.now(),
        dataAvaliacao: new Date().toISOString(),
      });
      localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const renderStars = (
    value: number,
    onChange: (rating: number) => void,
    size: "sm" | "lg" = "lg"
  ) => {
    const starSize = size === "lg" ? "w-12 h-12" : "w-6 h-6";

    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`${starSize} transition-colors ${
                star <= (hoverRating || value)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-green-50 to-white">
          <div className="mx-auto max-w-2xl px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Avaliação Enviada com Sucesso!
                </h1>
                <p className="text-gray-600 text-lg mb-8">
                  Muito obrigado por dedicar seu tempo para avaliar nosso serviço. Sua opinião é fundamental para continuarmos melhorando!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        nome: "",
                        email: "",
                        local: "",
                        data: "",
                        nota: 0,
                        comentario: "",
                        aspectos: {
                          qualidade: 0,
                          pontualidade: 0,
                          profissionalismo: 0,
                          atendimento: 0,
                        },
                      });
                    }}
                  >
                    Nova Avaliação
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/avaliacoes")}
                  >
                    Ver Avaliações
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4">
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
                Avaliação de Serviço
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-secondary bg-clip-text text-transparent">
                Como Foi Nosso Serviço?
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sua avaliação é muito importante! Compartilhe sua experiência conosco.
            </p>
          </motion.div>

          {/* Formulário */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Erro */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">Atenção!</h4>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Informações Pessoais */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-primary" />
                    Suas Informações
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Seu nome completo *"
                        value={formData.nome}
                        onChange={(e) =>
                          setFormData({ ...formData, nome: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Seu e-mail *"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Informações do Serviço */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    Sobre o Serviço
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Local do serviço *"
                        value={formData.local}
                        onChange={(e) =>
                          setFormData({ ...formData, local: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.data}
                        onChange={(e) =>
                          setFormData({ ...formData, data: e.target.value })
                        }
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Avaliação Geral */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-primary" />
                    Avaliação Geral
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Como você avalia o serviço de forma geral?
                  </p>
                  <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200">
                    {renderStars(formData.nota, (rating) =>
                      setFormData({ ...formData, nota: rating })
                    )}
                    {formData.nota > 0 && (
                      <p className="text-lg font-semibold text-primary">
                        {formData.nota === 5 && "Excelente! ⭐"}
                        {formData.nota === 4 && "Muito Bom! 👍"}
                        {formData.nota === 3 && "Bom 👌"}
                        {formData.nota === 2 && "Regular 😐"}
                        {formData.nota === 1 && "Precisa Melhorar 😞"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Aspectos Específicos */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Aspectos Específicos
                  </h2>
                  <div className="space-y-6">
                    {/* Qualidade */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">
                          Qualidade da Limpeza
                        </span>
                        {formData.aspectos.qualidade > 0 && (
                          <span className="text-sm text-primary font-medium">
                            {formData.aspectos.qualidade}/5
                          </span>
                        )}
                      </div>
                      {renderStars(
                        formData.aspectos.qualidade,
                        (rating) =>
                          setFormData({
                            ...formData,
                            aspectos: { ...formData.aspectos, qualidade: rating },
                          }),
                        "sm"
                      )}
                    </div>

                    {/* Pontualidade */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">
                          Pontualidade
                        </span>
                        {formData.aspectos.pontualidade > 0 && (
                          <span className="text-sm text-primary font-medium">
                            {formData.aspectos.pontualidade}/5
                          </span>
                        )}
                      </div>
                      {renderStars(
                        formData.aspectos.pontualidade,
                        (rating) =>
                          setFormData({
                            ...formData,
                            aspectos: { ...formData.aspectos, pontualidade: rating },
                          }),
                        "sm"
                      )}
                    </div>

                    {/* Profissionalismo */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">
                          Profissionalismo
                        </span>
                        {formData.aspectos.profissionalismo > 0 && (
                          <span className="text-sm text-primary font-medium">
                            {formData.aspectos.profissionalismo}/5
                          </span>
                        )}
                      </div>
                      {renderStars(
                        formData.aspectos.profissionalismo,
                        (rating) =>
                          setFormData({
                            ...formData,
                            aspectos: { ...formData.aspectos, profissionalismo: rating },
                          }),
                        "sm"
                      )}
                    </div>

                    {/* Atendimento */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">
                          Atendimento
                        </span>
                        {formData.aspectos.atendimento > 0 && (
                          <span className="text-sm text-primary font-medium">
                            {formData.aspectos.atendimento}/5
                          </span>
                        )}
                      </div>
                      {renderStars(
                        formData.aspectos.atendimento,
                        (rating) =>
                          setFormData({
                            ...formData,
                            aspectos: { ...formData.aspectos, atendimento: rating },
                          }),
                        "sm"
                      )}
                    </div>
                  </div>
                </div>

                {/* Comentário */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-primary" />
                    Comentário (opcional)
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Compartilhe mais detalhes sobre sua experiência
                  </p>
                  <textarea
                    placeholder="Conte-nos mais sobre sua experiência com nosso serviço..."
                    value={formData.comentario}
                    onChange={(e) =>
                      setFormData({ ...formData, comentario: e.target.value })
                    }
                    rows={5}
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                  />
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="flex-1 text-lg py-4"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Enviar Avaliação
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => (window.location.href = "/")}
                    className="sm:w-auto text-lg py-4"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}

