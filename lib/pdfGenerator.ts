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

