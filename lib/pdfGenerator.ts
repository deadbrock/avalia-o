import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

export const gerarPDFPlanoAcao = (planos: PlanoAcao[]) => {
  const doc = new jsPDF();
  
  // Header com logo (text-based)
  doc.setFillColor(162, 18, 42); // Primary color
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FG SERVICES', 105, 15, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Relatório de Planos de Ação', 105, 23, { align: 'center' });
  
  // Data de geração
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, 14, 40);
  
  // Estatísticas resumidas
  const stats = {
    total: planos.length,
    pendentes: planos.filter(p => p.status === 'pendente').length,
    emProgresso: planos.filter(p => p.status === 'em-progresso').length,
    concluidos: planos.filter(p => p.status === 'concluido').length,
  };
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumo Executivo', 14, 50);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Total de Planos: ${stats.total}`, 14, 58);
  doc.text(`Pendentes: ${stats.pendentes}`, 14, 64);
  doc.text(`Em Progresso: ${stats.emProgresso}`, 14, 70);
  doc.text(`Concluídos: ${stats.concluidos}`, 14, 76);
  
  // Tabela de planos de ação
  const tableData = planos.map(plano => [
    plano.titulo,
    plano.categoria,
    plano.prioridade === 'alta' ? 'Alta' : plano.prioridade === 'media' ? 'Média' : 'Baixa',
    plano.status === 'pendente' ? 'Pendente' : plano.status === 'em-progresso' ? 'Em Progresso' : 'Concluído',
    plano.responsavel,
    new Date(plano.prazo).toLocaleDateString('pt-BR'),
  ]);
  
  autoTable(doc, {
    startY: 85,
    head: [['Título', 'Categoria', 'Prioridade', 'Status', 'Responsável', 'Prazo']],
    body: tableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [162, 18, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 25 },
      2: { cellWidth: 25 },
      3: { cellWidth: 30 },
      4: { cellWidth: 35 },
      5: { cellWidth: 25 },
    },
  });
  
  // Detalhes de cada plano (nova página)
  doc.addPage();
  
  doc.setFillColor(162, 18, 42);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Detalhamento dos Planos de Ação', 105, 12, { align: 'center' });
  
  let yPosition = 30;
  
  planos.forEach((plano, index) => {
    // Verificar se precisa de nova página
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Box para cada plano
    doc.setDrawColor(162, 18, 42);
    doc.setLineWidth(0.5);
    doc.rect(14, yPosition, 182, 50);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${plano.titulo}`, 16, yPosition + 6);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    // Badges coloridos para status e prioridade
    const prioridadeColor: [number, number, number] = plano.prioridade === 'alta' ? [220, 38, 38] : plano.prioridade === 'media' ? [234, 179, 8] : [34, 197, 94];
    doc.setFillColor(...prioridadeColor);
    doc.roundedRect(16, yPosition + 10, 20, 5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text(plano.prioridade === 'alta' ? 'ALTA' : plano.prioridade === 'media' ? 'MÉDIA' : 'BAIXA', 26, yPosition + 13.5, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(9);
    doc.text(`Categoria: ${plano.categoria}`, 40, yPosition + 13);
    
    doc.text(`Descrição:`, 16, yPosition + 20);
    const descricaoLinhas = doc.splitTextToSize(plano.descricao, 170);
    doc.text(descricaoLinhas, 16, yPosition + 25);
    
    doc.text(`Responsável: ${plano.responsavel}`, 16, yPosition + 40);
    doc.text(`Prazo: ${new Date(plano.prazo).toLocaleDateString('pt-BR')}`, 100, yPosition + 40);
    doc.text(`Status: ${plano.status === 'pendente' ? 'Pendente' : plano.status === 'em-progresso' ? 'Em Progresso' : 'Concluído'}`, 16, yPosition + 45);
    
    yPosition += 55;
  });
  
  // Footer em todas as páginas
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} | © ${new Date().getFullYear()} FG Services - Todos os direitos reservados`,
      105,
      290,
      { align: 'center' }
    );
  }
  
  // Salvar PDF
  doc.save(`plano-acao-fg-services-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Gerar PDF Relatório Mensal
export const gerarPDFRelatorioMensal = (avaliacoes: Avaliacao[]) => {
  const doc = new jsPDF();
  const hoje = new Date();
  const mesAtual = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  
  // Header
  doc.setFillColor(162, 18, 42);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FG SERVICES', 105, 15, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Relatório Mensal de Avaliações', 105, 23, { align: 'center' });
  
  // Período
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Período: ${mesAtual}`, 14, 40);
  doc.text(`Gerado em: ${hoje.toLocaleDateString('pt-BR')}`, 14, 47);
  
  // Estatísticas
  const totalAvaliacoes = avaliacoes.length;
  const notasMap: { [key: string]: number } = {
    Excelente: 5, Bom: 4, Regular: 3, Ruim: 2, Péssimo: 1
  };
  const mediaGeral = avaliacoes.length > 0
    ? avaliacoes.reduce((acc, av) => acc + (notasMap[av.avaliacaoGeral] || 0), 0) / avaliacoes.length
    : 0;
  const recomendacoes = avaliacoes.filter(av => av.recomendaria === 'Sim').length;
  const nps = avaliacoes.length > 0 ? Math.round((recomendacoes / avaliacoes.length) * 100) : 0;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumo do Mês', 14, 57);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Total de Avaliações: ${totalAvaliacoes}`, 14, 64);
  doc.text(`Média Geral: ${mediaGeral.toFixed(1)} / 5.0`, 14, 70);
  doc.text(`Taxa de Recomendação (NPS): ${nps}%`, 14, 76);
  
  // Distribuição de notas
  const distribuicao = {
    Excelente: avaliacoes.filter(av => av.avaliacaoGeral === 'Excelente').length,
    Bom: avaliacoes.filter(av => av.avaliacaoGeral === 'Bom').length,
    Regular: avaliacoes.filter(av => av.avaliacaoGeral === 'Regular').length,
    Ruim: avaliacoes.filter(av => av.avaliacaoGeral === 'Ruim').length,
    Péssimo: avaliacoes.filter(av => av.avaliacaoGeral === 'Péssimo').length,
  };
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Distribuição de Avaliações', 14, 86);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  let yPos = 92;
  Object.entries(distribuicao).forEach(([nota, qtd]) => {
    const perc = totalAvaliacoes > 0 ? ((qtd / totalAvaliacoes) * 100).toFixed(1) : '0.0';
    doc.text(`${nota}: ${qtd} (${perc}%)`, 14, yPos);
    yPos += 6;
  });
  
  // Tabela de avaliações
  const tableData = avaliacoes.slice(0, 15).map(av => [
    new Date(av.data).toLocaleDateString('pt-BR'),
    av.nome,
    av.local,
    av.avaliacaoGeral,
    av.recomendaria,
  ]);
  
  autoTable(doc, {
    startY: 125,
    head: [['Data', 'Cliente', 'Local', 'Avaliação', 'Recomenda']],
    body: tableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [162, 18, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: { fontSize: 9, cellPadding: 3 },
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} | © ${new Date().getFullYear()} FG Services`,
      105, 290, { align: 'center' }
    );
  }
  
  doc.save(`relatorio-mensal-fg-services-${hoje.toISOString().split('T')[0]}.pdf`);
};

// Gerar PDF Relatório de Satisfação
export const gerarPDFRelatorioSatisfacao = (avaliacoes: Avaliacao[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(162, 18, 42);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FG SERVICES', 105, 15, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Relatório de Satisfação Detalhado', 105, 23, { align: 'center' });
  
  // Data
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')} | Total de Avaliações: ${avaliacoes.length}`, 14, 40);
  
  const notasMap: { [key: string]: number } = {
    Excelente: 5, Boa: 4, Regular: 3, Ruim: 2, 'Péssima': 1
  };
  
  // Análise detalhada por categoria
  const categorias = [
    { 
      nome: 'Atendimento e Comunicação', 
      subcategorias: [
        { campo: 'cordialidade', label: 'Cordialidade e respeito' },
        { campo: 'comunicacao', label: 'Comunicação clara' },
        { campo: 'agilidade', label: 'Agilidade no atendimento' }
      ]
    },
    { 
      nome: 'Qualidade do Serviço', 
      subcategorias: [
        { campo: 'limpezaOrganizacao', label: 'Limpeza e organização' },
        { campo: 'banheirosVestiarios', label: 'Banheiros e vestiários' },
        { campo: 'pisos', label: 'Pisos e carpetes' },
        { campo: 'materiaisEquipamentos', label: 'Materiais e equipamentos' },
        { campo: 'protocolosSeguranca', label: 'Protocolos de segurança' }
      ]
    },
    { 
      nome: 'Pontualidade e Frequência', 
      subcategorias: [
        { campo: 'cumprimentoHorarios', label: 'Cumprimento de horários' },
        { campo: 'reforcoLimpeza', label: 'Reforço de limpeza' },
        { campo: 'substituicao', label: 'Substituição de funcionários' }
      ]
    },
    { 
      nome: 'Postura Profissional', 
      subcategorias: [
        { campo: 'responsabilidade', label: 'Responsabilidade' },
        { campo: 'apresentacaoPessoal', label: 'Apresentação pessoal' },
        { campo: 'comportamento', label: 'Comportamento adequado' }
      ]
    },
    { 
      nome: 'Gestão e Supervisão', 
      subcategorias: [
        { campo: 'acompanhamentoSupervisor', label: 'Acompanhamento do supervisor' },
        { campo: 'correcaoNaoConformidades', label: 'Correção de não conformidades' },
        { campo: 'gerenciamentoContrato', label: 'Gerenciamento do contrato' }
      ]
    }
  ];
  
  let yPos = 50;
  
  categorias.forEach((categoria, catIndex) => {
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    
    // Título da categoria
    doc.setFillColor(240, 240, 240);
    doc.rect(14, yPos - 4, 182, 8, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(162, 18, 42);
    doc.text(`${catIndex + 1}. ${categoria.nome}`, 16, yPos + 2);
    yPos += 10;
    
    // Dados da tabela
    const tableData = categoria.subcategorias.map(sub => {
      const valores = avaliacoes.map(av => notasMap[(av as any)[sub.campo]] || 0);
      const media = valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
      const excelentes = avaliacoes.filter(av => (av as any)[sub.campo] === 'Excelente' || (av as any)[sub.campo] === 'Boa').length;
      const problemas = avaliacoes.filter(av => ['Ruim', 'Péssima'].includes((av as any)[sub.campo])).length;
      const perc = avaliacoes.length > 0 ? ((excelentes / avaliacoes.length) * 100).toFixed(1) : '0.0';
      
      return [
        sub.label,
        media.toFixed(2),
        `${excelentes} (${perc}%)`,
        problemas.toString()
      ];
    });
    
    autoTable(doc, {
      startY: yPos,
      head: [['Aspecto', 'Média', 'Positivas', 'Problemas']],
      body: tableData,
      theme: 'plain',
      headStyles: { 
        fillColor: [162, 18, 42],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9
      },
      styles: { fontSize: 8, cellPadding: 2 },
      margin: { left: 16, right: 16 },
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 8;
  });
  
  // Nova página para elogios e melhorias
  doc.addPage();
  yPos = 20;
  
  // Elogios
  const elogios = avaliacoes.filter(av => av.elogio && av.elogio.trim()).slice(0, 10);
  if (elogios.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(162, 18, 42);
    doc.text('✨ Principais Elogios dos Clientes', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    elogios.forEach((av, i) => {
      if (yPos > 270) return;
      const texto = doc.splitTextToSize(`${i + 1}. "${av.elogio}" - ${av.nome}`, 180);
      doc.text(texto, 16, yPos);
      yPos += texto.length * 5 + 4;
    });
  }
  
  // Melhorias sugeridas
  yPos += 5;
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }
  
  const melhorias = avaliacoes.filter(av => av.melhoriaDescricao && av.melhoriaDescricao.trim()).slice(0, 10);
  if (melhorias.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(162, 18, 42);
    doc.text('🔧 Sugestões de Melhoria', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    melhorias.forEach((av, i) => {
      if (yPos > 270) return;
      const area = av.melhoriaArea ? `[${av.melhoriaArea}] ` : '';
      const texto = doc.splitTextToSize(`${i + 1}. ${area}"${av.melhoriaDescricao}" - ${av.nome}`, 180);
      doc.text(texto, 16, yPos);
      yPos += texto.length * 5 + 4;
    });
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} | © ${new Date().getFullYear()} FG Services`,
      105, 290, { align: 'center' }
    );
  }
  
  doc.save(`relatorio-satisfacao-fg-services-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Gerar PDF Relatório Detalhado
export const gerarPDFRelatorioDetalhado = (avaliacoes: Avaliacao[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(162, 18, 42);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('FG SERVICES', 105, 15, { align: 'center' });
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Relatório Completo de Avaliações', 105, 23, { align: 'center' });
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Total: ${avaliacoes.length} avaliações | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 40);
  
  // Detalhes de cada avaliação
  let yPos = 50;
  
  avaliacoes.slice(0, 15).forEach((av, index) => {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }
    
    // Box principal
    doc.setDrawColor(162, 18, 42);
    doc.setLineWidth(0.5);
    doc.rect(14, yPos, 182, 65);
    
    // Cabeçalho da avaliação
    doc.setFillColor(162, 18, 42);
    doc.rect(14, yPos, 182, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Avaliação #${index + 1} - ${av.nome}`, 16, yPos + 5);
    
    // Informações do cliente
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Local: ${av.local} | Data: ${new Date(av.data).toLocaleDateString('pt-BR')}`, 16, yPos + 13);
    doc.text(`Email: ${av.email}`, 16, yPos + 18);
    
    // Avaliação Geral e Recomendação
    doc.setFont('helvetica', 'bold');
    doc.text(`Avaliação Geral: ${av.avaliacaoGeral}`, 16, yPos + 25);
    doc.text(`Recomendaria: ${av.recomendaria}`, 110, yPos + 25);
    
    // Categorias resumidas
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    let detailY = yPos + 31;
    
    const categorias = [
      { label: 'Atendimento', campos: [av.cordialidade, av.comunicacao, av.agilidade] },
      { label: 'Qualidade', campos: [av.limpezaOrganizacao, av.banheirosVestiarios, av.pisos] },
      { label: 'Pontualidade', campos: [av.cumprimentoHorarios, av.reforcoLimpeza, av.substituicao] },
      { label: 'Postura', campos: [av.responsabilidade, av.apresentacaoPessoal, av.comportamento] },
      { label: 'Gestão', campos: [av.acompanhamentoSupervisor, av.correcaoNaoConformidades, av.gerenciamentoContrato] }
    ];
    
    categorias.forEach((cat, i) => {
      const excelentes = cat.campos.filter(c => c === 'Excelente' || c === 'Boa').length;
      const total = cat.campos.length;
      const cor = excelentes === total ? '✓' : excelentes > total / 2 ? '~' : '✗';
      doc.text(`${cor} ${cat.label}: ${excelentes}/${total} positivas`, 16 + (i < 3 ? 0 : 95), detailY + Math.floor(i % 3) * 4);
    });
    
    // Elogio ou melhoria
    if (av.elogio && av.elogio.trim()) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      const elogioTexto = doc.splitTextToSize(`"${av.elogio}"`, 175);
      doc.text(elogioTexto, 16, yPos + 48);
    } else if (av.melhoriaDescricao && av.melhoriaDescricao.trim()) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      const melhoriaTexto = doc.splitTextToSize(`Melhoria: "${av.melhoriaDescricao}"`, 175);
      doc.text(melhoriaTexto, 16, yPos + 48);
    }
    
    yPos += 70;
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${pageCount} | © ${new Date().getFullYear()} FG Services - Relatório Confidencial`,
      105, 290, { align: 'center' }
    );
  }
  
  doc.save(`relatorio-detalhado-fg-services-${new Date().toISOString().split('T')[0]}.pdf`);
};

