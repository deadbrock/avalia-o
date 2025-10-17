import { NextRequest, NextResponse } from 'next/server';

// Nota: Em produção na Vercel, não é possível salvar arquivos.
// Os dados são persistidos apenas no localStorage do cliente.
// Para persistência real, integre com banco de dados (Vercel Postgres, MongoDB, etc)

// GET - Listar todas as avaliações
export async function GET(request: NextRequest) {
  try {
    // Em produção, retorna array vazio
    // Os dados vêm do localStorage do cliente
    return NextResponse.json({
      success: true,
      data: [],
      total: 0,
      message: 'Dados carregados do localStorage do cliente',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar avaliações' },
      { status: 500 }
    );
  }
}

// POST - Criar nova avaliação
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body.nome || !body.email || !body.local || !body.data) {
      return NextResponse.json(
        { success: false, error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }
    
    // Criar nova avaliação
    const novaAvaliacao = {
      id: Date.now(),
      ...body,
      dataAvaliacao: new Date().toISOString(),
    };
    
    // Retornar sucesso
    // Os dados são salvos no localStorage pelo cliente
    return NextResponse.json({
      success: true,
      data: novaAvaliacao,
      message: 'Avaliação salva com sucesso!',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Erro ao criar avaliação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao processar avaliação' },
      { status: 500 }
    );
  }
}

