import { NextRequest, NextResponse } from 'next/server';
import { redisGet, redisSet } from '@/lib/redis';

// Endpoint para migrar dados do localStorage para Redis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { avaliacoes } = body;
    
    if (!avaliacoes || !Array.isArray(avaliacoes)) {
      return NextResponse.json(
        { success: false, error: 'Dados inválidos' },
        { status: 400 }
      );
    }
    
    // Buscar dados existentes no Redis
    const existentes = await redisGet<any[]>('avaliacoes') || [];
    
    // Mesclar dados (evitar duplicatas por ID)
    const idsExistentes = new Set(existentes.map(av => av.id));
    const novosRegistros = avaliacoes.filter(av => !idsExistentes.has(av.id));
    
    // Combinar e salvar
    const todosDados = [...existentes, ...novosRegistros];
    await redisSet('avaliacoes', todosDados);
    
    return NextResponse.json({
      success: true,
      message: 'Dados migrados com sucesso!',
      total: todosDados.length,
      novos: novosRegistros.length,
      existentes: existentes.length,
    });
    
  } catch (error) {
    console.error('Erro ao migrar dados:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao migrar dados',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

// Endpoint para verificar conexão com Redis
export async function GET(request: NextRequest) {
  try {
    // Testar conexão
    const avaliacoes = await redisGet<any[]>('avaliacoes');
    const planosAcao = await redisGet<any[]>('planosAcao');
    
    return NextResponse.json({
      success: true,
      message: 'Conexão com Redis funcionando!',
      avaliacoes: {
        total: avaliacoes?.length || 0,
        dados: avaliacoes || []
      },
      planosAcao: {
        total: planosAcao?.length || 0,
        dados: planosAcao || []
      }
    });
    
  } catch (error) {
    console.error('Erro ao conectar com Redis:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao conectar com Redis',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        hint: 'Verifique se a variável REDIS_URL está configurada'
      },
      { status: 500 }
    );
  }
}

