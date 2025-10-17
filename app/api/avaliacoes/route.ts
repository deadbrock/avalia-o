import { NextRequest, NextResponse } from 'next/server';
import { redisGet, redisSet } from '@/lib/redis';

// GET - Listar todas as avaliações
export async function GET(request: NextRequest) {
  try {
    // Buscar avaliações do Redis
    const avaliacoes = await redisGet<any[]>('avaliacoes') || [];
    
    return NextResponse.json({
      success: true,
      data: avaliacoes,
      total: avaliacoes.length,
    });
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
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
    
    // Buscar avaliações existentes
    const avaliacoes = await redisGet<any[]>('avaliacoes') || [];
    
    // Criar nova avaliação
    const novaAvaliacao = {
      id: Date.now(),
      ...body,
      dataAvaliacao: new Date().toISOString(),
    };
    
    // Adicionar ao início do array
    avaliacoes.unshift(novaAvaliacao);
    
    // Salvar no Redis
    await redisSet('avaliacoes', avaliacoes);
    
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

