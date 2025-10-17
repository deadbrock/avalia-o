import { NextRequest, NextResponse } from 'next/server';

// Nota: Em produção na Vercel, não é possível salvar arquivos.
// Os dados são persistidos apenas no localStorage do cliente.
// Para persistência real, integre com banco de dados (Vercel Postgres, MongoDB, etc)

// GET - Buscar avaliação por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    
    // Em produção, retorna não encontrado
    // Os dados vêm do localStorage do cliente
    return NextResponse.json(
      { 
        success: false, 
        error: 'Avaliação não encontrada',
        message: 'Dados disponíveis apenas no localStorage do cliente'
      },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar avaliação' },
      { status: 500 }
    );
  }
}

