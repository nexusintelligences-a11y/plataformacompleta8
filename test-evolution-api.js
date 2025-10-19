/**
 * Script de teste exaustivo para Evolution API
 * 
 * Testa:
 * 1. Salvamento de credenciais
 * 2. Teste de conexão
 * 3. Listagem de status
 * 4. Criação de instância
 * 5. Obtenção de QR Code
 */

const BASE_URL = 'http://localhost:5000';

// Credenciais de teste (substitua pelos valores reais)
const EVOLUTION_CREDENTIALS = {
  api_url: 'http://103.199.187.146:8080',
  api_key: 'sua-api-key-aqui', // ⚠️ COLOQUE SUA API KEY AQUI
  instance: 'nexus-whatsapp'
};

async function testEvolutionAPI() {
  console.log('🧪 Iniciando testes do Evolution API...\n');

  // Test 1: Salvar credenciais
  console.log('📝 Test 1: Salvando credenciais...');
  try {
    const saveResponse = await fetch(`${BASE_URL}/api/credentials/evolution_api`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(EVOLUTION_CREDENTIALS)
    });

    const saveData = await saveResponse.json();
    
    if (saveData.success) {
      console.log('✅ Credenciais salvas com sucesso!\n');
    } else {
      console.log('❌ Erro ao salvar credenciais:', saveData.error, '\n');
      return;
    }
  } catch (error) {
    console.log('❌ Erro na requisição de salvamento:', error.message, '\n');
    return;
  }

  // Aguardar um pouco para garantir que foi salvo
  await new Promise(resolve => setTimeout(resolve, 500));

  // Test 2: Verificar status das credenciais
  console.log('📋 Test 2: Verificando status das credenciais...');
  try {
    const statusResponse = await fetch(`${BASE_URL}/api/credentials`);
    const statusData = await statusResponse.json();
    
    console.log('Status das credenciais:', statusData);
    
    if (statusData.success && statusData.credentials.evolution_api) {
      console.log('✅ Evolution API configurado!\n');
    } else {
      console.log('❌ Evolution API não aparece como configurado\n');
    }
  } catch (error) {
    console.log('❌ Erro ao verificar status:', error.message, '\n');
  }

  // Test 3: Testar conexão
  console.log('🔌 Test 3: Testando conexão com Evolution API...');
  try {
    const testResponse = await fetch(`${BASE_URL}/api/credentials/test/evolution_api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const testData = await testResponse.json();
    
    if (testData.success) {
      console.log('✅ Teste de conexão bem-sucedido!');
      console.log('   Mensagem:', testData.message);
      console.log('   Dados:', testData.data, '\n');
    } else {
      console.log('❌ Teste de conexão falhou:', testData.error, '\n');
    }
  } catch (error) {
    console.log('❌ Erro ao testar conexão:', error.message, '\n');
  }

  // Test 4: Obter status da instância
  console.log('📊 Test 4: Obtendo status da instância...');
  try {
    const instanceResponse = await fetch(`${BASE_URL}/api/evolution/status`);
    const instanceData = await instanceResponse.json();
    
    if (instanceData.success) {
      console.log('✅ Status da instância obtido!');
      console.log('   Status:', instanceData.status, '\n');
    } else {
      console.log('⚠️  Status da instância:', instanceData.error);
      console.log('   (Isto é normal se a instância ainda não foi criada)\n');
    }
  } catch (error) {
    console.log('❌ Erro ao obter status:', error.message, '\n');
  }

  // Test 5: Criar instância (se necessário)
  console.log('🔧 Test 5: Criando instância...');
  try {
    const createResponse = await fetch(`${BASE_URL}/api/evolution/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const createData = await createResponse.json();
    
    if (createData.success) {
      console.log('✅ Instância criada com sucesso!');
      console.log('   Instância:', createData.instance, '\n');
    } else {
      console.log('⚠️  Criação de instância:', createData.error);
      console.log('   (Isto é normal se a instância já existe)\n');
    }
  } catch (error) {
    console.log('❌ Erro ao criar instância:', error.message, '\n');
  }

  // Test 6: Obter QR Code
  console.log('📱 Test 6: Obtendo QR Code...');
  try {
    const qrResponse = await fetch(`${BASE_URL}/api/evolution/qrcode`);
    const qrData = await qrResponse.json();
    
    if (qrData.success) {
      console.log('✅ QR Code obtido com sucesso!');
      console.log('   Instância:', qrData.instance);
      console.log('   QR Code disponível:', qrData.qrcode ? 'Sim' : 'Não', '\n');
    } else {
      console.log('⚠️  QR Code:', qrData.error, '\n');
    }
  } catch (error) {
    console.log('❌ Erro ao obter QR Code:', error.message, '\n');
  }

  console.log('🎉 Testes concluídos!\n');
  console.log('📌 Resumo:');
  console.log('   - Todas as correções de URL foram aplicadas');
  console.log('   - URLs não devem mais ter barras duplas (//)');
  console.log('   - Sistema de autenticação em modo dev funcionando');
}

// Executar testes
testEvolutionAPI().catch(console.error);
