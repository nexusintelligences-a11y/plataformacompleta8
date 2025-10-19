# ExecutiveAI Pro - Plataforma SaaS de IA para Negócios

Plataforma premium de gestão empresarial com IA, dashboard executivo, integração Google Calendar e workspace colaborativo estilo Notion.

## 🚀 IMPORTAÇÃO ZERO CRÉDITOS (3 Passos)

### 📥 1. Importar do GitHub
```
1. https://replit.com/import
2. Cole a URL do repositório
3. ⚠️ IMPORTANTE: Clique em "Skip" (NÃO use Agent!)
```

### 🗄️ 2. Criar Banco PostgreSQL
```
1. Tools → Database
2. Create PostgreSQL Database
3. Aguarde 30-60 segundos
```

### ⚡ 3. Executar Script Automático
```bash
bash import-zero-creditos.sh
```

**OU executar manualmente:**
```bash
npm install
npm run db:push
npm run dev
```

### ✅ **Pronto! 0 Créditos Gastos!**

---

## 📚 DOCUMENTAÇÃO

### 🎯 Começar Aqui
- **[README_IMPORTACAO.md](README_IMPORTACAO.md)** - Guia rápido importação/exportação
- **[GUIA_ZERO_CREDITOS.md](GUIA_ZERO_CREDITOS.md)** - Guia completo e detalhado
- **[COMANDOS_RAPIDOS.md](COMANDOS_RAPIDOS.md)** - Cola de comandos
- **[INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)** - Índice completo

### 📦 Documentação Consolidada
- **[DOCS_TECNICAS_COMPLETAS.md](DOCS_TECNICAS_COMPLETAS.md)** (182KB) - Toda documentação técnica
- **[DOCS_EXPORTACAO_IMPORTACAO.md](DOCS_EXPORTACAO_IMPORTACAO.md)** (132KB) - Guias de exportação/importação
- **[DOCS_LEGACY_BANCO.md](DOCS_LEGACY_BANCO.md)** (123KB) - Documentação legacy

---

## ✨ Recursos Principais

- 🎯 **Dashboard Executivo** - Análise completa de negócios e clientes
- 📅 **Google Calendar** - Sincronização automática de eventos e reuniões
- 🔐 **Autenticação JWT** - Sistema seguro multi-tenant
- 📊 **Workspace** - Editor estilo Notion com páginas, databases e quadros Kanban
- 🤖 **Automação IA** - Detecção automática de novos clientes
- 🌙 **Tema Premium** - Design dark luxuoso com detalhes dourados

## 🚀 Quick Start

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Configurar Workspace do Supabase
```bash
node setup-replit-import.mjs
```

Este script automaticamente:
- ✅ Cria 3 tabelas workspace (pages, databases, boards)
- ✅ Configura RLS e políticas de segurança
- ✅ Recarrega o schema cache do PostgREST

### 3️⃣ Executar
```bash
npm run dev
```

**Acesse:** http://localhost:5000

**Login padrão:**
- Email: admin@empresa.com
- Senha: 123456

### 4️⃣ Configurar Credenciais (Opcional)
Configure as credenciais diretamente na interface web:
- **Pluggy (Faturamento)**: Acesse `/faturamento` → **Configurações** → Adicione Client ID e Secret
- **Supabase (Workspace)**: Acesse `/configuracoes` → Configure URL e Anon Key
- **Google Calendar**: Acesse `/configuracoes` → Configure OAuth credentials

---

## 📚 Documentação

**🎯 Navegação:**
- 📚 **[README_DOCUMENTACAO.md](README_DOCUMENTACAO.md)** - **GUIA DE NAVEGAÇÃO COMPLETO**
- 📘 **[replit.md](replit.md)** - Documentação técnica principal

**📦 Arquivos Consolidados:**
- 📖 **[DOCS_EXPORTACAO_IMPORTACAO.md](DOCS_EXPORTACAO_IMPORTACAO.md)** - Exportar/Importar (26 guias)
- 🔧 **[DOCS_TECNICAS_COMPLETAS.md](DOCS_TECNICAS_COMPLETAS.md)** - Técnico (26 docs)
- 📜 **[DOCS_LEGACY_BANCO.md](DOCS_LEGACY_BANCO.md)** - Legacy (18 docs)

**💡 Dica:** Use Ctrl+F nos arquivos consolidados para buscar rapidamente!

**✅ Compilação:** 70 arquivos → 6 arquivos | 100% preservado

## 🛠️ Tecnologias

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Radix UI  
**Backend:** Express.js, JWT, bcryptjs, Multi-tenant  
**Database:** Supabase PostgreSQL, Drizzle ORM  
**Integrações:** Google Calendar API, WhatsApp Business

## 📁 Estrutura

```
├── src/              # Frontend React + Workspace
├── server/           # Backend Express API
├── shared/           # Schema e types compartilhados
├── replit.md         # Guia principal do projeto
└── SETUP_SUPABASE.md # Guia de configuração Supabase
```

## 🎯 Principais Funcionalidades

### Dashboard Executivo
- Visão geral de clientes e conversas
- Métricas de atendimento em tempo real
- Integração com Google Calendar
- Status de automações ativas

### Workspace Colaborativo
- **Pages** - Documentos estilo Notion com blocos
- **Databases** - Tabelas personalizáveis com múltiplas views
- **Boards** - Quadros Kanban para gestão de tarefas

### Automação
- Detecção automática de novos clientes
- Processamento de mensagens WhatsApp
- Sincronização com Google Calendar
- Notificações em tempo real

## 🚀 Deploy

Projeto pronto para deploy no Replit:
- **Tipo:** VM (servidor persistente)
- **Build:** `npm run build`
- **Run:** `npm start`

Clique em **Deploy** no Replit.

## 📚 Documentação

- **replit.md** - Guia completo do projeto
- **SETUP_SUPABASE.md** - Configuração Supabase em 2 minutos

## 💡 Suporte

Problemas? Verifique:
1. `npm install` executado
2. Workflow "Dev Server" rodando
3. Credenciais configuradas na interface web
4. Documentação em `replit.md`

---

✅ **Status:** Funcional e pronto para produção  
🔗 **Replit:** Otimizado para deploy imediato  
📅 **Última atualização:** October 2025
