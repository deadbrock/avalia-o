# 🔧 Configurar Vercel KV (Banco de Dados)

## ⚠️ IMPORTANTE: Dados Compartilhados Entre Computadores

Para que os dados sejam acessíveis de **qualquer computador**, você precisa configurar o **Vercel KV** (banco de dados Redis).

---

## 📋 Passo a Passo:

### 1. **Acesse o Dashboard da Vercel**
```
https://vercel.com/dashboard
```

### 2. **Selecione seu Projeto**
- Clique no projeto `avaliacao-plum-seven`

### 3. **Vá em Storage**
- No menu superior, clique em **"Storage"**

### 4. **Criar Banco KV**
- Clique em **"Create Database"**
- Selecione **"KV"** (Redis)
- Nome sugerido: `avaliacoes-db`
- Clique em **"Create"**

### 5. **Conectar ao Projeto**
- Na tela do banco criado, clique em **"Connect Project"**
- Selecione o projeto `avaliacao-plum-seven`
- Clique em **"Connect"**

### 6. **Pronto!**
✅ O Vercel automaticamente adiciona as variáveis de ambiente necessárias
✅ Faça um novo deploy (já está configurado no código)
✅ Os dados agora são compartilhados entre todos os dispositivos!

---

## 🎯 O Que Muda:

### **Antes (localStorage):**
- ❌ Dados apenas no navegador local
- ❌ Cada computador vê dados diferentes
- ❌ Perda de dados ao limpar cache

### **Depois (Vercel KV):**
- ✅ Dados no servidor (Redis)
- ✅ Todos os computadores veem os mesmos dados
- ✅ Dados persistentes e seguros
- ✅ Acesso de qualquer lugar

---

## 📊 Estrutura dos Dados:

No Vercel KV, os dados são armazenados assim:

```
Key: avaliacoes
Value: [
  {
    id: 1234567890,
    nome: "Cliente",
    email: "email@example.com",
    avaliacaoGeral: "Excelente",
    ...
  },
  ...
]
```

---

## 🔍 Verificar Dados:

1. Vá em **Storage** no painel da Vercel
2. Clique no banco **avaliacoes-db**
3. Aba **"Data Browser"**
4. Veja a key `avaliacoes` com todos os dados

---

## 💰 Custos:

**Plano Hobby (Gratuito):**
- ✅ 30,000 comandos/mês
- ✅ 256 MB de storage
- ✅ Mais que suficiente para este projeto

---

## 🚀 Próximo Deploy:

Após configurar o KV:
1. O código já está atualizado
2. Faça um novo deploy (automático ao fazer push)
3. Teste acessando de computadores diferentes
4. ✅ Todos verão os mesmos dados!

---

## ⚙️ Desenvolvimento Local (Opcional):

Se quiser testar localmente:

1. Copie `.env.example` para `.env.local`
2. Cole as credenciais do Vercel KV
3. Execute `npm run dev`

---

## 📞 Suporte:

Se tiver problemas:
- Documentação: https://vercel.com/docs/storage/vercel-kv
- Suporte Vercel: https://vercel.com/support

---

**🎉 Configuração Simples e Rápida!**

