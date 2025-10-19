// Teste de conexão com Evolution API
const API_URL = 'http://703.190.187.145:8080';
const API_KEY = 'SUA-API-KEY-AQUI'; // Substitua pela sua API key
const INSTANCE = 'nexus-whatsapp';

console.log('🧪 Testando conexão com Evolution API...\n');

// Teste 1: Verificar status da instância
console.log('1️⃣ Verificando status da instância...');
try {
  const response = await fetch(`${API_URL}/instance/connectionState/${INSTANCE}`, {
    method: 'GET',
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json'
    }
  });
  
  console.log(`   Status HTTP: ${response.status}`);
  if (response.ok) {
    const data = await response.json();
    console.log('   ✅ Resposta:', JSON.stringify(data, null, 2));
  } else {
    const error = await response.text();
    console.log('   ❌ Erro:', error);
  }
} catch (error) {
  console.log('   ❌ Erro de conexão:', error.message);
}

console.log('\n2️⃣ Tentando obter QR Code...');
try {
  const response = await fetch(`${API_URL}/instance/connect/${INSTANCE}`, {
    method: 'GET',
    headers: {
      'apikey': API_KEY,
      'Content-Type': 'application/json'
    }
  });
  
  console.log(`   Status HTTP: ${response.status}`);
  if (response.ok) {
    const data = await response.json();
    console.log('   ✅ Resposta recebida!');
    console.log('   Estrutura da resposta:', Object.keys(data));
    
    // Verificar se tem o QR code
    if (data.qrcode) {
      console.log('   ✅ QR Code encontrado!');
      console.log('   Formato do QR:', Object.keys(data.qrcode));
    } else if (data.base64) {
      console.log('   ✅ QR Code em base64 direto:', data.base64.substring(0, 50) + '...');
    } else {
      console.log('   Resposta completa:', JSON.stringify(data, null, 2));
    }
  } else {
    const error = await response.text();
    console.log('   ❌ Erro:', error);
  }
} catch (error) {
  console.log('   ❌ Erro de conexão:', error.message);
}
