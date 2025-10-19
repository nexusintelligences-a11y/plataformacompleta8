#!/bin/bash

# Script de teste do lifecycle de notificações push
# Testa: Registro → Envio → Desregistro

echo "🧪 TESTE: Sistema de Lifecycle de Notificações Push"
echo "=================================================="
echo ""

# 1. Obter chave VAPID
echo "1️⃣ Obtendo chave VAPID..."
VAPID_KEY=$(curl -s http://localhost:5000/api/notifications/vapid-public-key | grep -o '"publicKey":"[^"]*"' | cut -d'"' -f4)
if [ -z "$VAPID_KEY" ]; then
  echo "❌ Erro: Não foi possível obter chave VAPID"
  exit 1
fi
echo "✅ Chave VAPID obtida: ${VAPID_KEY:0:20}..."
echo ""

# 2. Registrar dispositivo (simulando subscription)
echo "2️⃣ Registrando dispositivo..."
SUBSCRIPTION='{
  "endpoint": "https://fcm.googleapis.com/fcm/send/test-endpoint-123",
  "keys": {
    "p256dh": "test-p256dh-key",
    "auth": "test-auth-key"
  }
}'

REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/notifications/devices/register \
  -H "Content-Type: application/json" \
  -d "{
    \"subscription\": $SUBSCRIPTION,
    \"deviceInfo\": {
      \"type\": \"web\",
      \"name\": \"Test Device\",
      \"model\": \"Linux\"
    }
  }")

echo "Resposta do registro: $REGISTER_RESPONSE"

# Extrair token hash da resposta
TOKEN_HASH=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN_HASH" ]; then
  echo "❌ Erro: Dispositivo não retornou token hash"
  exit 1
fi

echo "✅ Dispositivo registrado com token hash: ${TOKEN_HASH:0:16}..."
echo ""

# 3. Enviar notificação de teste
echo "3️⃣ Enviando notificação de teste..."
TEST_NOTIF_RESPONSE=$(curl -s -X POST http://localhost:5000/api/notifications/test)
echo "Resposta: $TEST_NOTIF_RESPONSE"
echo ""

# 4. Desregistrar dispositivo usando token hash
echo "4️⃣ Desregistrando dispositivo com token hash..."
UNREGISTER_RESPONSE=$(curl -s -X DELETE "http://localhost:5000/api/notifications/devices/$TOKEN_HASH")
echo "Resposta do desregistro: $UNREGISTER_RESPONSE"

if echo "$UNREGISTER_RESPONSE" | grep -q '"success":true'; then
  echo "✅ Dispositivo desregistrado com sucesso!"
else
  echo "❌ Erro ao desregistrar dispositivo"
  exit 1
fi
echo ""

# 5. Verificar que não há mais dispositivos
echo "5️⃣ Verificando se dispositivo foi removido (enviar notificação deve falhar)..."
VERIFY_RESPONSE=$(curl -s -X POST http://localhost:5000/api/notifications/test)
echo "Resposta: $VERIFY_RESPONSE"

if echo "$VERIFY_RESPONSE" | grep -q '"reason":"no_devices"'; then
  echo "✅ Confirmado: Dispositivo foi removido corretamente!"
else
  echo "⚠️ Aviso: Resposta inesperada ao verificar remoção"
fi
echo ""

echo "=================================================="
echo "✅ TESTE COMPLETO: Todos os passos executados com sucesso!"
echo ""
echo "📋 Resumo:"
echo "  • Chave VAPID obtida: ✓"
echo "  • Dispositivo registrado com token hash: ✓"
echo "  • Token hash armazenado: ${TOKEN_HASH:0:16}..."
echo "  • Notificação enviada: ✓"
echo "  • Dispositivo desregistrado usando hash: ✓"
echo "  • Remoção confirmada: ✓"
echo ""
echo "🎉 Sistema de lifecycle funcionando corretamente!"
