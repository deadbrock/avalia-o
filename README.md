# 🌟 FG Services - Sistema de Avaliação de Serviços de Limpeza

Um sistema moderno e elegante para avaliação de serviços de limpeza da FG Services, construído com Next.js, TypeScript e Tailwind CSS.

## ✨ Características

- 🎨 **Design Moderno**: Interface limpa e profissional seguindo o design system fornecido
- 📱 **Responsivo**: Totalmente adaptado para desktop, tablet e mobile
- ⭐ **Sistema de Avaliação**: Avaliação geral e por aspectos específicos (qualidade, pontualidade, profissionalismo, atendimento)
- 💬 **Comentários**: Espaço para feedback detalhado dos clientes
- 📊 **Estatísticas**: Visualização de métricas e distribuição de notas
- 🔍 **Filtros**: Filtrar avaliações por nota
- ✨ **Animações**: Transições suaves com Framer Motion
- 🎯 **TypeScript**: Código type-safe e escalável

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3** - Estilização utility-first
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos

## 📦 Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo desenvolvimento:**
```bash
npm run dev
```

3. **Acessar o site:**
Abra [http://localhost:3000](http://localhost:3000) no navegador

## 🎯 Estrutura do Projeto

```
avaliação/
├── app/
│   ├── avaliar/         # Página de formulário de avaliação
│   │   └── page.tsx
│   ├── avaliacoes/      # Página de visualização de avaliações
│   │   └── page.tsx
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página inicial (home)
│   └── globals.css      # Estilos globais e design system
├── components/
│   ├── Header.tsx       # Cabeçalho com navegação
│   ├── Footer.tsx       # Rodapé
│   ├── Button.tsx       # Componente de botão reutilizável
│   ├── Card.tsx         # Componente de card reutilizável
│   └── Badge.tsx        # Componente de badge/etiqueta
├── public/              # Arquivos estáticos
├── tailwind.config.ts   # Configuração do Tailwind
├── tsconfig.json        # Configuração do TypeScript
└── package.json         # Dependências do projeto
```

## 🎨 Design System

O projeto segue um design system completo com:

### Cores Principais
- **Primary**: `#a2122a` (Vermelho)
- **Secondary**: `#354a80` (Azul)
- **Background**: `#0a0a0a` (Preto)
- **Foreground**: `#ffffff` (Branco)

### Componentes
- ✅ Botões com gradientes animados
- ✅ Cards com efeito hover
- ✅ Inputs estilizados com ícones
- ✅ Badges/etiquetas coloridas
- ✅ Sistema de avaliação com estrelas
- ✅ Animações suaves

### Animações
- Transições de 300ms
- Hover effects (scale, translate, sombras)
- Gradientes animados
- Fade in/out com Framer Motion

## 📱 Páginas

### 1. **Página Inicial (Home)**
- Hero section com call-to-action
- Seção de benefícios
- Estatísticas gerais
- CTA final

### 2. **Página de Avaliação**
- Formulário completo de avaliação
- Sistema de estrelas para nota geral
- Avaliação por aspectos específicos
- Campo de comentários
- Validação de campos
- Mensagem de sucesso após envio

### 3. **Página de Avaliações**
- Lista de todas as avaliações
- Estatísticas gerais (média, total, recomendação)
- Filtros por nota
- Distribuição de notas
- Cards detalhados de cada avaliação

## 💾 Armazenamento

Atualmente, as avaliações são armazenadas no **localStorage** do navegador. Para produção, você pode:

1. Integrar com uma API backend
2. Usar um banco de dados (PostgreSQL, MongoDB, etc.)
3. Implementar autenticação de usuários
4. Adicionar moderação de comentários

## 🔧 Personalização

### Alterar Cores
Edite o arquivo `tailwind.config.ts`:
```typescript
colors: {
  primary: "#a2122a",      // Sua cor primária
  secondary: "#354a80",    // Sua cor secundária
  background: "#0a0a0a",   // Cor de fundo
  foreground: "#ffffff",   // Cor de texto
}
```

### Adicionar Novos Aspectos de Avaliação
Edite o tipo `FormData` em `app/avaliar/page.tsx`:
```typescript
aspectos: {
  qualidade: number;
  pontualidade: number;
  profissionalismo: number;
  atendimento: number;
  // Adicione novos aspectos aqui
  preco: number;
}
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Build para produção
```bash
npm run build
npm start
```

## 📄 Licença

Este projeto foi desenvolvido como exemplo e pode ser usado livremente para fins comerciais ou pessoais.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através de:
- Email: contato@fgservices.com.br
- Telefone: (11) 99999-9999

---

**Desenvolvido com ❤️ usando Next.js e Tailwind CSS**

"# avalia-o" 
