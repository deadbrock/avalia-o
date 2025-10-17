import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Endpoint para migrar dados do localStorage para Vercel KV
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
    
    // Buscar dados existentes no KV
    const existentes = await kv.get<any[]>('avaliacoes') || [];
    
    // Mesclar dados (evitar duplicatas por ID)
    const idsExistentes = new Set(existentes.map(av => av.id));
    const novosRegistros = avaliacoes.filter(av => !idsExistentes.has(av.id));
    
    // Combinar e salvar
    const todosDados = [...existentes, ...novosRegistros];
    await kv.set('avaliacoes', todosDados);
    
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

// Endpoint para verificar conexão com KV
export async function GET(request: NextRequest) {
  try {
    // Testar conexão
    const avaliacoes = await kv.get<any[]>('avaliacoes');
    const planosAcao = await kv.get<any[]>('planosAcao');
    
    return NextResponse.json({
      success: true,
      message: 'Conexão com Vercel KV funcionando!',
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
    console.error('Erro ao conectar com KV:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao conectar com Vercel KV',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        hint: 'Verifique se as variáveis KV_REST_API_URL e KV_REST_API_TOKEN estão configuradas'
      },
      { status: 500 }
    );
  }
}

