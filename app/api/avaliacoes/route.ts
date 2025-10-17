import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const AVALIACOES_FILE = path.join(DATA_DIR, 'avaliacoes.json');

// Garantir que o diretório existe
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// Ler avaliações do arquivo
async function readAvaliacoes() {
  try {
    await ensureDataDir();
    if (existsSync(AVALIACOES_FILE)) {
      const data = await readFile(AVALIACOES_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Erro ao ler avaliações:', error);
    return [];
  }
}

// Salvar avaliações no arquivo
async function saveAvaliacoes(avaliacoes: any[]) {
  try {
    await ensureDataDir();
    await writeFile(AVALIACOES_FILE, JSON.stringify(avaliacoes, null, 2));
    return true;
  } catch (error) {
    console.error('Erro ao salvar avaliações:', error);
    return false;
  }
}

// GET - Listar todas as avaliações
export async function GET(request: NextRequest) {
  try {
    const avaliacoes = await readAvaliacoes();
    
    return NextResponse.json({
      success: true,
      data: avaliacoes,
      total: avaliacoes.length,
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
    
    // Ler avaliações existentes
    const avaliacoes = await readAvaliacoes();
    
    // Criar nova avaliação
    const novaAvaliacao = {
      id: Date.now(),
      ...body,
      dataAvaliacao: new Date().toISOString(),
    };
    
    // Adicionar ao início do array
    avaliacoes.unshift(novaAvaliacao);
    
    // Salvar
    const saved = await saveAvaliacoes(avaliacoes);
    
    if (!saved) {
      return NextResponse.json(
        { success: false, error: 'Erro ao salvar avaliação' },
        { status: 500 }
      );
    }
    
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

