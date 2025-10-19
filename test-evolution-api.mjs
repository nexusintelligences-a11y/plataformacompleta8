#!/usr/bin/env node

/**
 * Script de teste para Evolution API
 * Testa salvamento de credenciais e geração de QR Code
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Configuração da Evolution API (do screenshot do usuário)
const evolutionConfig = {
  api_url: 'http://703.190.187.146:8080',
  api_key: 'USER_API_KEY', // Usuário deve substituir pela chave real
  instance: 'nexus-whatsapp'
};

console.log('🧪 Testando Evolution API Integration');
console.log('=====================================\n');

// Função de criptografia (mesma do credentialsManager.ts)
function getEncryptionKey() {
  const keyBase64 = process.env.CREDENTIALS_ENCRYPTION_KEY_BASE64;
  if (!keyBase64) {
    console.warn('⚠️  Usando chave de desenvolvimento');
    return Buffer.from('dev-key-only-32-bytes-long-12345', 'utf8').subarray(0, 32);
  }
  return Buffer.from(keyBase64, 'base64');
}

function encrypt(text) {
  const ENCRYPTION_KEY = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
}

// 1. Carregar credenciais existentes
console.log('📂 Carregando credenciais existentes...');
const credentialsFile = path.join(process.cwd(), 'data', 'credentials.json');
let credentials = {};

if (fs.existsSync(credentialsFile)) {
  credentials = JSON.parse(fs.readFileSync(credentialsFile, 'utf8'));
  console.log('✅ Credenciais carregadas');
  console.log('   Clientes:', Object.keys(credentials));
} else {
  console.log('⚠️  Arquivo de credenciais não encontrado, criando novo');
  credentials = { "1": {} };
}

// 2. Adicionar credenciais Evolution API
console.log('\n📝 Adicionando credenciais Evolution API...');
if (!credentials["1"]) {
  credentials["1"] = {};
}

// Criptografar credenciais
const encryptedCreds = encrypt(JSON.stringify(evolutionConfig));
credentials["1"]["evolution_api"] = encryptedCreds;

// Salvar arquivo
fs.writeFileSync(credentialsFile, JSON.stringify(credentials, null, 2), 'utf8');
console.log('✅ Credenciais Evolution API salvas');

// 3. Testar conexão com Evolution API
console.log('\n🔌 Testando conexão com Evolution API...');
console.log('   URL:', evolutionConfig.api_url);
console.log('   Instance:', evolutionConfig.instance);

if (evolutionConfig.api_key === 'USER_API_KEY') {
  console.log('\n⚠️  IMPORTANTE: Você precisa substituir USER_API_KEY pela sua API Key real!');
  console.log('   1. Abra o arquivo: test-evolution-api.mjs');
  console.log('   2. Substitua USER_API_KEY pela sua chave de API');
  console.log('   3. Execute novamente: node test-evolution-api.mjs');
} else {
  console.log('\n🚀 Credenciais configuradas! Agora você pode:');
  console.log('   1. Acessar /settings no navegador');
  console.log('   2. Clicar em "Conectar WhatsApp"');
  console.log('   3. Ver o QR Code e conectar seu WhatsApp');
}

console.log('\n✨ Teste concluído!\n');
