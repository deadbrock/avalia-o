"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Users,
  ClipboardCheck,
  Clock,
  Award,
  Settings,
  ThumbsUp,
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
  melhoriaArea: string;
  melhoriaDescricao: string;
  elogio: string;
}

export default function AvaliarPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    local: "",
    data: "",
    cordialidade: "",
    comunicacao: "",
    agilidade: "",
    limpezaOrganizacao: "",
    banheirosVestiarios: "",
    pisos: "",
    materiaisEquipamentos: "",
    protocolosSeguranca: "",
    cumprimentoHorarios: "",
    reforcoLimpeza: "",
    substituicao: "",
    responsabilidade: "",
    apresentacaoPessoal: "",
    comportamento: "",
    acompanhamentoSupervisor: "",
    correcaoNaoConformidades: "",
    gerenciamentoContrato: "",
    avaliacaoGeral: "",
    recomendaria: "",
    melhoriaArea: "",
    melhoriaDescricao: "",
    elogio: "",
  });

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

    if (!formData.avaliacaoGeral) {
      setError("Por favor, selecione uma avaliação geral.");
      return;
    }

    setLoading(true);

    try {
      // Enviar para API
      const response = await fetch('/api/avaliacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Também salvar no localStorage para compatibilidade
        const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
        avaliacoes.unshift(result.data);
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

        setLoading(false);
        setSubmitted(true);
      } else {
        setError(result.error || "Erro ao enviar avaliação");
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      setError("Erro ao enviar avaliação. Tente novamente.");
      setLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const RadioGroup = ({
    name,
    options,
    value,
    onChange,
  }: {
    name: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <label
          key={option}
          className={`flex-1 min-w-[100px] cursor-pointer transition-all ${
            value === option
              ? "bg-gradient-to-r from-primary to-red-700 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } px-4 py-3 rounded-xl text-center font-medium text-sm`}
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );

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
                        cordialidade: "",
                        comunicacao: "",
                        agilidade: "",
                        limpezaOrganizacao: "",
                        banheirosVestiarios: "",
                        pisos: "",
                        materiaisEquipamentos: "",
                        protocolosSeguranca: "",
                        cumprimentoHorarios: "",
                        reforcoLimpeza: "",
                        substituicao: "",
                        responsabilidade: "",
                        apresentacaoPessoal: "",
                        comportamento: "",
                        acompanhamentoSupervisor: "",
                        correcaoNaoConformidades: "",
                        gerenciamentoContrato: "",
                        avaliacaoGeral: "",
                        recomendaria: "",
                        melhoriaArea: "",
                        melhoriaDescricao: "",
                        elogio: "",
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
        <div className="mx-auto max-w-5xl px-4">
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
                Avalie Nosso Serviço
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Sua avaliação nos ajuda a melhorar continuamente. Preencha o formulário abaixo.
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
                        onChange={(e) => updateField("nome", e.target.value)}
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
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Local do serviço *"
                        value={formData.local}
                        onChange={(e) => updateField("local", e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={formData.data}
                        onChange={(e) => updateField("data", e.target.value)}
                        className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-11 pr-4 py-3 outline-none focus:border-primary focus:bg-white transition-all text-gray-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 1. Atendimento e Comunicação */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    1. Atendimento e Comunicação
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        A equipe de limpeza é cordial e educada no contato diário?
                      </p>
                      <RadioGroup
                        name="cordialidade"
                        options={["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"]}
                        value={formData.cordialidade}
                        onChange={(value) => updateField("cordialidade", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        A comunicação com o supervisor ou encarregado é clara e eficiente?
                      </p>
                      <RadioGroup
                        name="comunicacao"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.comunicacao}
                        onChange={(value) => updateField("comunicacao", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Quando há solicitações ou imprevistos, a equipe responde com agilidade e disposição para resolver?
                      </p>
                      <RadioGroup
                        name="agilidade"
                        options={["Sempre", "Frequentemente", "Às vezes", "Raramente", "Nunca"]}
                        value={formData.agilidade}
                        onChange={(value) => updateField("agilidade", value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Qualidade do Serviço */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <ClipboardCheck className="w-6 h-6 text-primary" />
                    2. Qualidade do Serviço Executado
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Os ambientes são mantidos limpos e organizados conforme o padrão esperado?
                      </p>
                      <RadioGroup
                        name="limpezaOrganizacao"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.limpezaOrganizacao}
                        onChange={(value) => updateField("limpezaOrganizacao", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Os banheiros e vestiários estão sempre higienizados, abastecidos e sem odores?
                      </p>
                      <RadioGroup
                        name="banheirosVestiarios"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.banheirosVestiarios}
                        onChange={(value) => updateField("banheirosVestiarios", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        A limpeza de pisos e áreas comuns é bem executada?
                      </p>
                      <RadioGroup
                        name="pisos"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.pisos}
                        onChange={(value) => updateField("pisos", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Os materiais e equipamentos utilizados parecem adequados e em bom estado?
                      </p>
                      <RadioGroup
                        name="materiaisEquipamentos"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.materiaisEquipamentos}
                        onChange={(value) => updateField("materiaisEquipamentos", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        A equipe segue os protocolos de limpeza e segurança (ex: uso de EPI, sinalização de piso molhado)?
                      </p>
                      <RadioGroup
                        name="protocolosSeguranca"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.protocolosSeguranca}
                        onChange={(value) => updateField("protocolosSeguranca", value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Pontualidade e Frequência */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    3. Pontualidade e Frequência
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        A equipe cumpre os horários estabelecidos e mantém constância na presença?
                      </p>
                      <RadioGroup
                        name="cumprimentoHorarios"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.cumprimentoHorarios}
                        onChange={(value) => updateField("cumprimentoHorarios", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Os reforços de limpeza ocorrem nos momentos de maior movimento, quando necessário?
                      </p>
                      <RadioGroup
                        name="reforcoLimpeza"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.reforcoLimpeza}
                        onChange={(value) => updateField("reforcoLimpeza", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Há substituição adequada em casos de ausência de funcionários?
                      </p>
                      <RadioGroup
                        name="substituicao"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.substituicao}
                        onChange={(value) => updateField("substituicao", value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Postura Profissional */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    4. Postura Profissional
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Os colaboradores demonstram responsabilidade e comprometimento?
                      </p>
                      <RadioGroup
                        name="responsabilidade"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.responsabilidade}
                        onChange={(value) => updateField("responsabilidade", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        A apresentação pessoal (uniforme, crachá, higiene) é adequada?
                      </p>
                      <RadioGroup
                        name="apresentacaoPessoal"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.apresentacaoPessoal}
                        onChange={(value) => updateField("apresentacaoPessoal", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        O comportamento da equipe contribui para um ambiente agradável e respeitoso?
                      </p>
                      <RadioGroup
                        name="comportamento"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.comportamento}
                        onChange={(value) => updateField("comportamento", value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Gestão e Supervisão */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-primary" />
                    5. Gestão e Supervisão
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        O supervisor acompanha e fiscaliza a execução dos serviços com frequência?
                      </p>
                      <RadioGroup
                        name="acompanhamentoSupervisor"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.acompanhamentoSupervisor}
                        onChange={(value) => updateField("acompanhamentoSupervisor", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Quando há não conformidades, o retorno e correção ocorrem rapidamente?
                      </p>
                      <RadioGroup
                        name="correcaoNaoConformidades"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.correcaoNaoConformidades}
                        onChange={(value) => updateField("correcaoNaoConformidades", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Você considera o gerenciamento do contrato de limpeza satisfatório?
                      </p>
                      <RadioGroup
                        name="gerenciamentoContrato"
                        options={["Excelente", "Boa", "Regular", "Ruim", "Péssima"]}
                        value={formData.gerenciamentoContrato}
                        onChange={(value) => updateField("gerenciamentoContrato", value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Satisfação Geral e Sugestões */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <ThumbsUp className="w-6 h-6 text-primary" />
                    6. Satisfação Geral e Sugestões
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        De forma geral, como você avalia o serviço de limpeza prestado pela FG Services? *
                      </p>
                      <RadioGroup
                        name="avaliacaoGeral"
                        options={["Excelente", "Bom", "Regular", "Ruim", "Péssimo"]}
                        value={formData.avaliacaoGeral}
                        onChange={(value) => updateField("avaliacaoGeral", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Você recomendaria os serviços da FG Services para outra empresa?
                      </p>
                      <RadioGroup
                        name="recomendaria"
                        options={["Sim", "Talvez", "Não"]}
                        value={formData.recomendaria}
                        onChange={(value) => updateField("recomendaria", value)}
                      />
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Existe alguma área ou aspecto que poderia ser melhorado?
                      </p>
                      <RadioGroup
                        name="melhoriaArea"
                        options={["Sim", "Não"]}
                        value={formData.melhoriaArea}
                        onChange={(value) => updateField("melhoriaArea", value)}
                      />
                      
                      {formData.melhoriaArea === "Sim" && (
                        <div className="mt-4">
                          <textarea
                            placeholder="Descreva as melhorias sugeridas..."
                            value={formData.melhoriaDescricao}
                            onChange={(e) => updateField("melhoriaDescricao", e.target.value)}
                            rows={4}
                            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="p-5 bg-gray-50 rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">
                        Há algum elogio ou observação positiva que gostaria de registrar?
                      </p>
                      <textarea
                        placeholder="Compartilhe seus elogios ou observações positivas..."
                        value={formData.elogio}
                        onChange={(e) => updateField("elogio", e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 outline-none focus:border-primary transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                      />
                    </div>
                  </div>
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
