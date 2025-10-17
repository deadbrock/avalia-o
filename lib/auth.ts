// Sistema de autenticação simples
// Em produção, use um backend real com JWT/OAuth

export interface User {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'gestor' | 'visualizador';
}

// Usuários padrão (em produção, vem do banco de dados)
const USERS = [
  {
    email: 'admin@fgservices.com.br',
    senha: 'admin123', // Em produção, use hash
    role: 'admin' as const,
    nome: 'Administrador',
  },
  {
    email: 'gestor@fgservices.com.br',
    senha: 'gestor123',
    role: 'gestor' as const,
    nome: 'Gestor',
  },
];

export const login = (email: string, senha: string): User | null => {
  const user = USERS.find((u) => u.email === email && u.senha === senha);
  
  if (user) {
    const userData: User = {
      id: Math.random().toString(),
      nome: user.nome,
      email: user.email,
      role: user.role,
    };
    
    // Salvar no localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  }
  
  return null;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

