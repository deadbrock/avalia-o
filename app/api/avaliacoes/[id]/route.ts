import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const AVALIACOES_FILE = path.join(DATA_DIR, 'avaliacoes.json');

async function readAvaliacoes() {
  try {
    if (existsSync(AVALIACOES_FILE)) {
      const data = await readFile(AVALIACOES_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    return [];
  }
}

// GET - Buscar avaliação por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const avaliacoes = await readAvaliacoes();
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
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar avaliação' },
      { status: 500 }
    );
  }
}

