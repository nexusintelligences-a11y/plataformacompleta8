#!/bin/bash

# ========================================
# SCRIPT DE IMPORTAÇÃO ZERO CRÉDITOS
# Execute com: bash import-zero-creditos.sh
# ========================================

echo "=================================================="
echo "🚀 IMPORTAÇÃO ZERO CRÉDITOS - ExecutiveAI Pro"
echo "=================================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para mostrar status
show_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

show_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

show_error() {
    echo -e "${RED}❌ $1${NC}"
}

# ========================================
# PASSO 1: Verificar DATABASE_URL
# ========================================
echo "📋 Passo 1: Verificando banco de dados..."

if [ -z "$DATABASE_URL" ]; then
    show_error "DATABASE_URL não encontrado!"
    echo ""
    echo "Por favor, crie o banco PostgreSQL primeiro:"
    echo "1. Abra: Tools → Database"
    echo "2. Clique: Create PostgreSQL Database"
    echo "3. Aguarde a criação (30-60 segundos)"
    echo ""
    echo "Depois execute este script novamente."
    exit 1
else
    show_status "DATABASE_URL configurado"
fi

# ========================================
# PASSO 2: Instalar dependências
# ========================================
echo ""
echo "📦 Passo 2: Instalando dependências (2-3 minutos)..."

if npm install --prefer-offline --no-audit; then
    show_status "Dependências instaladas"
else
    show_error "Falha ao instalar dependências"
    echo "Tente executar manualmente: npm install"
    exit 1
fi

# ========================================
# PASSO 3: Criar tabelas do banco
# ========================================
echo ""
echo "🗄️  Passo 3: Criando tabelas do banco de dados..."

if npm run db:push; then
    show_status "Tabelas criadas com sucesso"
else
    show_error "Falha ao criar tabelas"
    echo "Tente executar manualmente: npm run db:push"
    exit 1
fi

# ========================================
# PASSO 4: Verificar estrutura
# ========================================
echo ""
echo "🔍 Passo 4: Verificando estrutura do projeto..."

# Verificar diretórios importantes
if [ -d "src" ] && [ -d "server" ] && [ -d "shared" ]; then
    show_status "Estrutura de diretórios OK"
else
    show_warning "Alguns diretórios podem estar faltando"
fi

# Verificar arquivos importantes
if [ -f "package.json" ] && [ -f "vite.config.ts" ] && [ -f "drizzle.config.ts" ]; then
    show_status "Arquivos de configuração OK"
else
    show_warning "Alguns arquivos de configuração podem estar faltando"
fi

# ========================================
# PASSO 5: Informações finais
# ========================================
echo ""
echo "=================================================="
echo "✨ IMPORTAÇÃO CONCLUÍDA COM SUCESSO!"
echo "=================================================="
echo ""
echo "📊 Estatísticas:"
npm list --depth=0 2>/dev/null | grep -c "├──\|└──" | xargs -I {} echo "   - {} pacotes npm instalados"
psql $DATABASE_URL -c "\dt" 2>/dev/null | grep -c "public" | xargs -I {} echo "   - {} tabelas criadas no banco"
echo ""
echo "🚀 Próximos passos:"
echo ""
echo "1. INICIAR O SERVIDOR:"
echo "   Execute: npm run dev"
echo ""
echo "2. ACESSAR A APLICAÇÃO:"
echo "   Abra: https://$(echo $REPLIT_DEV_DOMAIN)/replit.dev"
echo ""
echo "3. CONFIGURAR CREDENCIAIS (opcional):"
echo "   - Pluggy: /faturamento → Configurações"
echo "   - Supabase: /configuracoes"
echo "   - Google Calendar: /configuracoes"
echo ""
echo "💰 CRÉDITOS GASTOS: 0 ✨"
echo ""
echo "=================================================="
echo ""
echo "Deseja iniciar o servidor agora? (s/n)"
read -r response

if [[ "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
    echo ""
    echo "🚀 Iniciando servidor..."
    npm run dev
else
    echo ""
    echo "OK! Execute 'npm run dev' quando estiver pronto."
    echo ""
fi
