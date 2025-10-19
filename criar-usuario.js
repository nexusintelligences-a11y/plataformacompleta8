#!/usr/bin/env node

/**
 * 🔐 Script para Criar Usuários - NEXUS Intelligence
 * 
 * USO:
 *   node criar-usuario.js
 *   
 * O script vai pedir:
 *   - Email do usuário
 *   - Senha
 *   - Nome completo
 *   - Nome da empresa (opcional)
 */

import bcrypt from 'bcryptjs';
import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pergunta(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function criarUsuario() {
  console.log('\n🔐 === CRIAR NOVO USUÁRIO - NEXUS Intelligence ===\n');
  
  // Coletar dados do usuário
  const email = await pergunta('📧 Email do usuário: ');
  const senha = await pergunta('🔑 Senha: ');
  const nome = await pergunta('👤 Nome completo: ');
  const empresa = await pergunta('🏢 Nome da empresa (opcional, pressione Enter para pular): ');
  
  console.log('\n⏳ Gerando hash seguro da senha...');
  
  // Gerar hash bcrypt (mesmo algoritmo usado no sistema)
  const senhaHash = await bcrypt.hash(senha, 10);
  
  console.log('\n✅ Usuário criado com sucesso!\n');
  console.log('📋 === INFORMAÇÕES DO USUÁRIO ===');
  console.log(`Email: ${email}`);
  console.log(`Senha: ${senha}`);
  console.log(`Nome: ${nome}`);
  if (empresa) console.log(`Empresa: ${empresa}`);
  console.log(`Hash da Senha: ${senhaHash}`);
  
  // Salvar em arquivo de configuração
  const config = {
    email,
    senha,
    senhaHash,
    nome,
    empresa: empresa || 'Sua Empresa',
    criadoEm: new Date().toISOString()
  };
  
  // Criar arquivo com os dados do usuário
  const nomeArquivo = `usuario_${email.replace('@', '_at_').replace(/\./g, '_')}.json`;
  fs.writeFileSync(nomeArquivo, JSON.stringify(config, null, 2));
  
  console.log(`\n💾 Dados salvos em: ${nomeArquivo}`);
  
  // Criar arquivo .env se não existir
  const envContent = `
# === CONFIGURAÇÃO DE LOGIN - ${email} ===
CLIENT_LOGIN_EMAIL=${email}
CLIENT_LOGIN_PASSWORD_HASH=${senhaHash}
CLIENT_USER_NAME=${nome}
CLIENT_COMPANY_NAME=${empresa || 'Sua Empresa'}
CLIENT_PLAN_TYPE=pro
`;

  const envFile = `.env.${email.split('@')[0]}`;
  fs.writeFileSync(envFile, envContent.trim());
  
  console.log(`\n📝 Variáveis de ambiente criadas em: ${envFile}`);
  
  console.log('\n🚀 === COMO USAR ===');
  console.log('\n1. OPÇÃO 1 - Adicionar ao .env principal:');
  console.log(`   cat ${envFile} >> .env`);
  console.log('\n2. OPÇÃO 2 - Usar variáveis ao iniciar:');
  console.log(`   CLIENT_LOGIN_EMAIL=${email} CLIENT_LOGIN_PASSWORD_HASH=${senhaHash} npm run dev`);
  console.log('\n3. OPÇÃO 3 - Configurar nos Secrets do Replit:');
  console.log('   • Abra a aba "Secrets" (🔒)');
  console.log(`   • Adicione: CLIENT_LOGIN_EMAIL = ${email}`);
  console.log(`   • Adicione: CLIENT_LOGIN_PASSWORD_HASH = ${senhaHash}`);
  console.log(`   • Adicione: CLIENT_USER_NAME = ${nome}`);
  if (empresa) console.log(`   • Adicione: CLIENT_COMPANY_NAME = ${empresa}`);
  
  console.log('\n✨ Depois de configurar, reinicie o servidor e faça login!\n');
  
  rl.close();
}

criarUsuario().catch(console.error);
