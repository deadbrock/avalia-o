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
  avaliacaoGeral: string;
  atendimento: string;
  qualidade: string;
  pontualidade: string;
  postura: string;
  gestao: string;
  recomendaria: string;
  elogios?: string;
  sugestoes?: string;
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
  doc.text('Relatório de Satisfação', 105, 23, { align: 'center' });
  
  // Data
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 40);
  
  // Análise por categoria
  const categorias = [
    { nome: 'Atendimento e Comunicação', campo: 'atendimento' },
    { nome: 'Qualidade do Serviço', campo: 'qualidade' },
    { nome: 'Pontualidade e Frequência', campo: 'pontualidade' },
    { nome: 'Postura Profissional', campo: 'postura' },
    { nome: 'Gestão e Supervisão', campo: 'gestao' },
  ];
  
  const notasMap: { [key: string]: number } = {
    Excelente: 5, Bom: 4, Regular: 3, Ruim: 2, Péssimo: 1
  };
  
  let yPos = 50;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Análise por Categoria', 14, yPos);
  yPos += 10;
  
  const tableData = categorias.map(cat => {
    const valores = avaliacoes.map(av => notasMap[(av as any)[cat.campo]] || 0);
    const media = valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
    const excelentes = avaliacoes.filter(av => (av as any)[cat.campo] === 'Excelente').length;
    const problemas = avaliacoes.filter(av => ['Ruim', 'Péssimo'].includes((av as any)[cat.campo])).length;
    
    return [
      cat.nome,
      media.toFixed(2),
      excelentes.toString(),
      problemas.toString(),
    ];
  });
  
  autoTable(doc, {
    startY: yPos,
    head: [['Categoria', 'Média', 'Excelentes', 'Problemas']],
    body: tableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [162, 18, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: { fontSize: 10, cellPadding: 4 },
  });
  
  // Elogios e Sugestões
  const elogios = avaliacoes.filter(av => av.elogios && av.elogios.trim()).slice(0, 5);
  const sugestoes = avaliacoes.filter(av => av.sugestoes && av.sugestoes.trim()).slice(0, 5);
  
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  if (elogios.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Principais Elogios', 14, finalY);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    let elY = finalY + 7;
    elogios.forEach((av, i) => {
      if (elY > 260) return;
      const texto = doc.splitTextToSize(`• ${av.elogios}`, 180);
      doc.text(texto, 14, elY);
      elY += texto.length * 5 + 3;
    });
  }
  
  if (sugestoes.length > 0 && finalY < 200) {
    doc.addPage();
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Principais Sugestões de Melhoria', 14, 20);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    let sugY = 27;
    sugestoes.forEach((av, i) => {
      if (sugY > 270) return;
      const texto = doc.splitTextToSize(`• ${av.sugestoes}`, 180);
      doc.text(texto, 14, sugY);
      sugY += texto.length * 5 + 3;
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
  doc.text('Relatório Detalhado de Avaliações', 105, 23, { align: 'center' });
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Total: ${avaliacoes.length} avaliações | Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 40);
  
  // Detalhes de cada avaliação
  let yPos = 50;
  
  avaliacoes.slice(0, 20).forEach((av, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Box
    doc.setDrawColor(162, 18, 42);
    doc.setLineWidth(0.5);
    doc.rect(14, yPos, 182, 45);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`#${index + 1} - ${av.nome}`, 16, yPos + 6);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Local: ${av.local} | Data: ${new Date(av.data).toLocaleDateString('pt-BR')}`, 16, yPos + 12);
    doc.text(`Email: ${av.email}${av.telefone ? ` | Tel: ${av.telefone}` : ''}`, 16, yPos + 17);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Avaliações:', 16, yPos + 24);
    doc.setFont('helvetica', 'normal');
    doc.text(`Geral: ${av.avaliacaoGeral} | Atendimento: ${av.atendimento} | Qualidade: ${av.qualidade}`, 16, yPos + 29);
    doc.text(`Pontualidade: ${av.pontualidade} | Postura: ${av.postura} | Gestão: ${av.gestao}`, 16, yPos + 34);
    doc.text(`Recomendaria: ${av.recomendaria}`, 16, yPos + 39);
    
    yPos += 50;
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
  
  doc.save(`relatorio-detalhado-fg-services-${new Date().toISOString().split('T')[0]}.pdf`);
};

