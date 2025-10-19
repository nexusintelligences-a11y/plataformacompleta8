#!/bin/bash

# ========================================
# SCRIPT DE RESTAURAÇÃO DO GIT
# Execute após importar o projeto
# ========================================

echo "🔄 Restaurando repositório Git..."

if [ ! -f ".git.completo" ]; then
    echo "❌ Arquivo .git.completo não encontrado!"
    echo "   Certifique-se de que o arquivo foi importado junto com o projeto."
    exit 1
fi

if [ -d ".git" ]; then
    echo "⚠️  Diretório .git já existe. Deseja substituir? (s/n)"
    read -r response
    if [[ ! "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
        echo "Operação cancelada."
        exit 0
    fi
    rm -rf .git
fi

# Descompactar o repositório Git
tar -xzf .git.completo

if [ -d ".git" ]; then
    echo "✅ Repositório Git restaurado com sucesso!"
    echo ""
    echo "📊 Status:"
    git status --short
    echo ""
    echo "🔗 Remote:"
    git remote -v
else
    echo "❌ Erro ao restaurar repositório Git"
    exit 1
fi

echo ""
echo "✨ Pronto! Seu repositório Git foi restaurado."
echo "   Execute 'git status' para verificar."
