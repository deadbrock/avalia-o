import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// GET - Buscar avaliação por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    // Buscar avaliações do Vercel KV
    const avaliacoes = await kv.get<any[]>('avaliacoes') || [];
    const avaliacao = avaliacoes.find((av: any) => av.id === parseInt(params.id));
    
    if (!avaliacao) {
      return NextResponse.json(
        { success: false, error: 'Avaliação não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: avaliacao,
    });
  } catch (error) {
    console.error('Erro ao buscar avaliação:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar avaliação' },
      { status: 500 }
    );
  }
}

