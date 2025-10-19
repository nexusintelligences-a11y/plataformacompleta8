# 📱 Guia Completo - Evolution API WhatsApp

## ✅ Status da Integração

A integração Evolution API está **100% funcional** e pronta para uso!

### O que foi corrigido:
- ✅ Rotas do backend configuradas corretamente (`/api/evolution/*`)
- ✅ Frontend EvolutionQRCode.tsx otimizado  
- ✅ Rota de navegação corrigida (`/whatsapp`)
- ✅ Sistema de credenciais criptografadas funcionando
- ✅ Geração de QR Code implementada
- ✅ Status de conexão em tempo real
- ✅ Funções de logout e delete da instância

---

## 🚀 Como Conectar (Passo a Passo)

### 1️⃣ Fazer Login no Sistema
1. Acesse: `http://localhost:5000` ou seu domínio Replit
2. Faça login com:
   - Email: `admin@empresa.com`
   - Senha: `123456`

### 2️⃣ Configurar Credenciais Evolution API
1. Clique no menu **"Configurações"** (ícone de engrenagem)
2. Role até a seção **"WhatsApp (Evolution API)"**
3. Preencha os campos:
   - **URL da Evolution API**: `http://703.190.187.146:8080`
   - **API Key**: *[Sua chave de API]*
   - **Nome da Instância**: `nexus-whatsapp`
4. Clique no botão **"Salvar Configuração"** ⭐
5. Aguarde a confirmação "Credenciais salvas com sucesso!"

### 3️⃣ Conectar WhatsApp
1. Ainda na página de Configurações
2. Clique no botão **"Conectar WhatsApp"**
3. Você será redirecionado para `/whatsapp`

### 4️⃣ Gerar QR Code
1. Na página WhatsApp, você verá:
   - **Status da Conexão**: Desconectado (vermelho piscando)
   - Botão **"Gerar QR Code"**
2. Clique em **"Gerar QR Code"**
3. Aguarde alguns segundos...
4. O QR Code aparecerá na tela! 📱

### 5️⃣ Escanear com WhatsApp
1. Abra o WhatsApp no seu celular
2. Toque em **Menu (⋮)** → **Aparelhos conectados**
3. Toque em **"Conectar um aparelho"**
4. Aponte seu telefone para o QR Code na tela
5. Aguarde a conexão...
6. ✅ **Conectado!** O status mudará para verde

---

## 🔧 Endpoints da API

### Verificar Status
```bash
GET /api/evolution/status
```
Retorna o estado atual da conexão WhatsApp.

### Gerar QR Code
```bash
GET /api/evolution/qrcode
```
Gera um novo QR Code para conexão.

### Criar Instância
```bash
POST /api/evolution/create
```
Cria uma nova instância na Evolution API.

### Desconectar
```bash
POST /api/evolution/logout
```
Desconecta o WhatsApp da instância.

### Deletar Instância
```bash
DELETE /api/evolution/delete
```
Remove completamente a instância.

---

## 🔍 Troubleshooting

### Erro: "Evolution API não configurado"
**Solução**: Você precisa salvar as credenciais primeiro
1. Vá em **Configurações**
2. Preencha os 3 campos (URL, API Key, Instância)
3. Clique em **"Salvar Configuração"**

### QR Code não aparece
**Possíveis causas**:
1. **URL incorreta**: Verifique se `http://703.190.187.146:8080` está acessível
2. **API Key inválida**: Confirme sua chave de API
3. **Instância já existe**: Tente deletar e criar novamente

### Botão "Conectar WhatsApp" desabilitado
**Solução**: As credenciais não foram salvas ainda
- Verifique se o badge "Configurado" aparece ao lado de "WhatsApp (Evolution API)"
- Se não aparecer, clique em "Salvar Configuração" novamente

### QR Code expirou
**Solução**: QR Codes expiram após 2-3 minutos
- Clique em **"Gerar QR Code"** novamente
- Um novo código será gerado instantaneamente

---

## 📊 Monitoramento

### Status em Tempo Real
A página `/whatsapp` atualiza o status automaticamente a cada 5 segundos:
- 🟢 **Conectado** (`state: "open"`)
- 🔴 **Desconectado** (`state: "close"`)
- 🟡 **Connecting** (`state: "connecting"`)

### Logs do Backend
Para ver logs detalhados:
```bash
# Logs do servidor
tail -f /tmp/logs/Dev_Server_*.log | grep evolution
```

---

## 🎨 Interface

### Tela de QR Code (`/whatsapp`)
**Elementos**:
- Card de Status (verde/vermelho com animação)
- Card do QR Code (imagem 256x256px)
- Instruções de conexão
- Botões de ação:
  - ✅ **Gerar QR Code**
  - 🚪 **Desconectar** (só quando conectado)
  - 🗑️ **Deletar Instância**

**Design Premium**:
- Tema dark com gradiente
- Bordas douradas (#ffdf80)
- Ícones Lucide
- Animações suaves

---

## 💾 Armazenamento de Credenciais

### Onde estão salvas?
```
data/credentials.json
```

### Formato (criptografado):
```json
{
  "1": {
    "evolution_api": "encrypted_data_here..."
  }
}
```

### Criptografia
- **Algoritmo**: AES-256-GCM
- **Formato**: `iv:authTag:encrypted`
- **Chave**: 32 bytes (development ou `CREDENTIALS_ENCRYPTION_KEY_BASE64`)

---

## 🧪 Testes

### Testar Conexão Manualmente
```bash
# Verificar se credenciais foram salvas
cat data/credentials.json | grep evolution_api

# Testar endpoint de status
curl http://localhost:5000/api/evolution/status

# Testar geração de QR Code
curl http://localhost:5000/api/evolution/qrcode
```

### Script de Teste
Foi criado um script de teste em `test-evolution-api.mjs`:
```bash
node test-evolution-api.mjs
```

---

## 📝 Checklist de Verificação

Antes de conectar, verifique:
- [ ] Login feito com sucesso
- [ ] Credenciais Evolution API salvas
- [ ] Badge "Configurado" visível em Settings
- [ ] Botão "Conectar WhatsApp" habilitado
- [ ] Página `/whatsapp` acessível
- [ ] Status mostra "Desconectado"
- [ ] QR Code gerado sem erros
- [ ] QR Code visível (imagem branca com código)

---

## ⚡ Resumo Rápido

**3 passos para conectar**:
1. **Settings** → Preencher Evolution API → **Salvar Configuração**
2. **Conectar WhatsApp** → Gerar QR Code
3. **WhatsApp no celular** → Aparelhos conectados → Escanear

**Pronto!** 🎉

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do servidor
2. Confirme que a Evolution API está online
3. Teste a conexão direta: `http://703.190.187.146:8080/instance/status`
4. Verifique se a API Key está correta

---

✅ **Status**: Sistema 100% funcional e testado!  
📅 **Última atualização**: October 17, 2025  
🔧 **Versão**: 1.0.0 - Production Ready
