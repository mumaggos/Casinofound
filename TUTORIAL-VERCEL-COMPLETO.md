# 🚀 TUTORIAL COMPLETO - DEPLOY NO VERCEL

## 📋 **PRÉ-REQUISITOS**
- Conta no GitHub (gratuita)
- Conta no Vercel (gratuita)
- Arquivos do projeto CasinoFound

---

## 🔧 **PASSO 1: PREPARAÇÃO DOS ARQUIVOS**

### 1.1 Baixar e Extrair o Projeto
1. Baixe o arquivo `casinofound-profissional-final.zip`
2. Extraia todos os arquivos em uma pasta no seu computador
3. Você terá a pasta `casinofound-project/` com todos os arquivos

### 1.2 Verificar Arquivos Essenciais
Certifique-se que estes arquivos estão presentes:
- ✅ `package.json` (dependências)
- ✅ `vite.config.js` (configuração do build)
- ✅ `vercel.json` (configuração do Vercel)
- ✅ `dist/` (pasta com build de produção)
- ✅ `src/` (código fonte)

---

## 🌐 **PASSO 2: CRIAR CONTA NO GITHUB**

### 2.1 Acessar GitHub
1. Vá para: https://github.com
2. Clique em **"Sign up"** (se não tiver conta)
3. Preencha: nome de usuário, email, senha
4. Verifique seu email

### 2.2 Criar Repositório
1. Clique no botão **"+"** no canto superior direito
2. Selecione **"New repository"**
3. Nome do repositório: `casinofound-site`
4. Marque **"Public"** (gratuito)
5. Clique **"Create repository"**

### 2.3 Fazer Upload dos Arquivos
1. Na página do repositório criado, clique **"uploading an existing file"**
2. Arraste TODOS os arquivos da pasta `casinofound-project/`
3. Escreva uma mensagem: "Initial commit - CasinoFound site"
4. Clique **"Commit changes"**

---

## ⚡ **PASSO 3: DEPLOY NO VERCEL**

### 3.1 Acessar Vercel
1. Vá para: https://vercel.com
2. Clique **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar sua conta GitHub

### 3.2 Importar Projeto
1. No dashboard do Vercel, clique **"New Project"**
2. Encontre seu repositório `casinofound-site`
3. Clique **"Import"**

### 3.3 Configurar Deploy
1. **Project Name**: `casinofound-site`
2. **Framework Preset**: Vite
3. **Root Directory**: `./` (deixar padrão)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. Clique **"Deploy"**

### 3.4 Aguardar Deploy
- O Vercel irá instalar dependências e fazer o build
- Processo leva 2-5 minutos
- Você verá logs em tempo real

---

## 🔑 **PASSO 4: CONFIGURAR VARIÁVEIS DE AMBIENTE**

### 4.1 Acessar Configurações
1. No dashboard do projeto no Vercel
2. Vá para aba **"Settings"**
3. Clique em **"Environment Variables"**

### 4.2 Adicionar Variáveis Essenciais
Adicione estas variáveis uma por uma:

```
VITE_WALLETCONNECT_PROJECT_ID=seu_project_id_aqui
VITE_ADMIN_WALLET=0xSeuEnderecoDeAdministrador
VITE_TOKEN_CONTRACT=0xEnderecoDoContratoDoToken
VITE_STAKING_CONTRACT=0xEnderecoDoContratoDeStaking
VITE_USDT_CONTRACT=0xc2132D05D31c914a87C6611C10748AEb04B58e8F
VITE_MATIC_CONTRACT=0x0000000000000000000000000000000000001010
```

### 4.3 Como Obter WalletConnect Project ID
1. Vá para: https://cloud.walletconnect.com
2. Crie uma conta gratuita
3. Clique **"Create Project"**
4. Nome: "CasinoFound"
5. Copie o **Project ID** gerado

---

## 🎯 **PASSO 5: CONFIGURAÇÕES AVANÇADAS**

### 5.1 Domínio Personalizado (Opcional)
1. No Vercel, vá para **"Settings" > "Domains"**
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

### 5.2 Configurar Redirects
O arquivo `vercel.json` já está configurado para:
- Redirecionar todas as rotas para `index.html`
- Suporte a SPA (Single Page Application)

### 5.3 Configurar Headers de Segurança
Adicione no `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 🔧 **PASSO 6: CONFIGURAR CONTRATOS INTELIGENTES**

### 6.1 Deploy dos Contratos
Para funcionalidade completa, você precisará:

1. **Contrato do Token CFD**
   - Deploy na rede Polygon
   - Configurar supply total: 21.000.000 tokens
   - Adicionar funcionalidades de mint/burn

2. **Contrato de Staking**
   - Sistema de stake/unstake
   - Distribuição de dividendos
   - Cálculo de recompensas

3. **Contrato de Venda**
   - Aceitar USDT e MATIC
   - Conversão automática para CFD
   - Controle de fases da ICO

### 6.2 Configurar ABIs
1. Após deploy dos contratos, obtenha as ABIs
2. Adicione nos arquivos de configuração
3. Atualize endereços nas variáveis de ambiente

---

## 💾 **PASSO 7: CONFIGURAR BANCO DE DADOS (OPCIONAL)**

### 7.1 Opções de Banco de Dados
- **Supabase** (recomendado - gratuito)
- **PlanetScale** (MySQL serverless)
- **MongoDB Atlas** (NoSQL)

### 7.2 Configurar Supabase
1. Vá para: https://supabase.com
2. Crie projeto gratuito
3. Configure tabelas:
   - `users` (dados dos usuários)
   - `transactions` (histórico de transações)
   - `stakes` (informações de staking)

### 7.3 Adicionar Variáveis do Banco
```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

---

## 📧 **PASSO 8: CONFIGURAR EMAIL (OPCIONAL)**

### 8.1 Serviço de Email
Para newsletter e notificações:
- **EmailJS** (gratuito até 200 emails/mês)
- **SendGrid** (gratuito até 100 emails/dia)

### 8.2 Configurar EmailJS
1. Vá para: https://emailjs.com
2. Crie conta gratuita
3. Configure service e template
4. Adicione variáveis:
```
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

---

## 🔄 **PASSO 9: ATUALIZAÇÕES AUTOMÁTICAS**

### 9.1 Configurar Auto-Deploy
- Qualquer push para o repositório GitHub
- Automaticamente faz novo deploy no Vercel
- Zero downtime

### 9.2 Branches de Desenvolvimento
1. Crie branch `development` no GitHub
2. Configure preview deployments no Vercel
3. Teste mudanças antes de ir para produção

---

## 🛡️ **PASSO 10: SEGURANÇA E MONITORAMENTO**

### 10.1 Configurar Analytics
- **Vercel Analytics** (gratuito)
- **Google Analytics** (opcional)

### 10.2 Monitoramento de Uptime
- **UptimeRobot** (gratuito)
- **Pingdom** (opcional)

### 10.3 Backup
- Código no GitHub (backup automático)
- Configurações no Vercel (exportáveis)
- Banco de dados (backup automático no Supabase)

---

## ✅ **CHECKLIST FINAL**

### Antes do Launch:
- [ ] Site funcionando no Vercel
- [ ] Domínio configurado
- [ ] Variáveis de ambiente definidas
- [ ] Contratos inteligentes deployados
- [ ] Banco de dados configurado
- [ ] Email funcionando
- [ ] Analytics configurado
- [ ] Testes em mobile e desktop
- [ ] Backup configurado

### Pós-Launch:
- [ ] Monitorar logs do Vercel
- [ ] Verificar analytics
- [ ] Testar todas as funcionalidades
- [ ] Configurar alertas de uptime
- [ ] Documentar processos

---

## 🆘 **SOLUÇÃO DE PROBLEMAS**

### Build Falhando
1. Verificar logs no Vercel
2. Testar build localmente: `npm run build`
3. Verificar dependências no `package.json`

### Site Não Carregando
1. Verificar configuração do `vercel.json`
2. Verificar redirects
3. Verificar variáveis de ambiente

### Wallet Não Conectando
1. Verificar `VITE_WALLETCONNECT_PROJECT_ID`
2. Verificar configuração de rede
3. Testar em diferentes navegadores

---

## 📞 **SUPORTE**

### Recursos Úteis:
- **Documentação Vercel**: https://vercel.com/docs
- **Documentação Vite**: https://vitejs.dev
- **WalletConnect Docs**: https://docs.walletconnect.com
- **Polygon Docs**: https://docs.polygon.technology

### Comunidades:
- **Discord Vercel**: https://vercel.com/discord
- **Telegram Polygon**: https://t.me/polygonofficial

---

## 🎉 **PARABÉNS!**

Seu site CasinoFound está agora online e funcionando profissionalmente!

**URL do seu site**: https://seu-projeto.vercel.app

Agora você pode:
- ✅ Aceitar investidores
- ✅ Vender tokens CFD
- ✅ Gerenciar staking
- ✅ Administrar o site
- ✅ Escalar globalmente

**Sucesso com seu projeto! 🚀**

