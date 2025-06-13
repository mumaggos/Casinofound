# Tutorial de Hospedagem - CasinoFound

Este documento contém tutoriais detalhados para hospedar o site CasinoFound em diferentes plataformas gratuitas, sem necessidade de instalar aplicativos no seu computador.

## Índice

1. [Hospedagem na Vercel (Recomendado)](#vercel)
2. [Hospedagem na Netlify](#netlify)
3. [Hospedagem no GitHub Pages](#github-pages)
4. [Configurações Importantes](#configurações)
5. [Solução de Problemas](#problemas)

---

## 1. Hospedagem na Vercel (Recomendado) {#vercel}

A Vercel é uma das melhores opções para hospedar sites React gratuitamente, com deploy automático e excelente performance.

### Passo a Passo:

#### 1.1. Preparar os Arquivos
1. Faça o download de todos os arquivos do projeto
2. Certifique-se de que você tem a pasta `dist/` com todos os arquivos de build
3. Crie um arquivo `.vercelignore` na raiz do projeto (opcional)

#### 1.2. Criar Conta na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up" (Cadastrar-se)
3. Escolha "Continue with GitHub" para facilitar o processo
4. Autorize a Vercel a acessar sua conta do GitHub

#### 1.3. Fazer Upload do Projeto
1. Na dashboard da Vercel, clique em "New Project"
2. Escolha "Import Git Repository" se você tem o código no GitHub, ou
3. Clique em "Browse All" e depois "Continue with Other"
4. Faça upload da pasta do projeto ou conecte seu repositório GitHub

#### 1.4. Configurar o Deploy
1. **Project Name**: `casinofound-site` (ou o nome que preferir)
2. **Framework Preset**: Selecione "Vite" ou "Other"
3. **Root Directory**: Deixe como `.` (raiz)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

#### 1.5. Variáveis de Ambiente (Opcional)
Se você precisar configurar variáveis de ambiente:
1. Vá para "Environment Variables"
2. Adicione as variáveis necessárias:
   - `VITE_WALLETCONNECT_PROJECT_ID`: Seu Project ID do WalletConnect
   - `VITE_CONTRACT_ADDRESS`: Endereço do contrato inteligente
   - Outras variáveis conforme necessário

#### 1.6. Deploy
1. Clique em "Deploy"
2. Aguarde o processo de build (geralmente 2-5 minutos)
3. Após concluído, você receberá uma URL como `https://casinofound-site.vercel.app`

#### 1.7. Configurar Domínio Personalizado (Opcional)
1. Na dashboard do projeto, vá para "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme as instruções da Vercel

### Vantagens da Vercel:
- ✅ Deploy automático a cada push no GitHub
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Excelente performance
- ✅ Suporte nativo para React/Vite
- ✅ Domínio personalizado gratuito

---

## 2. Hospedagem na Netlify {#netlify}

A Netlify é outra excelente opção gratuita para hospedagem de sites estáticos.

### Passo a Passo:

#### 2.1. Preparar os Arquivos
1. Certifique-se de que você tem a pasta `dist/` com o build do projeto
2. Crie um arquivo `_redirects` na pasta `dist/` com o conteúdo:
   ```
   /*    /index.html   200
   ```
   (Isso é necessário para o roteamento do React funcionar corretamente)

#### 2.2. Criar Conta na Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Clique em "Sign up"
3. Escolha "Sign up with GitHub" para facilitar

#### 2.3. Deploy Manual (Método Mais Simples)
1. Na dashboard da Netlify, procure por "Want to deploy a new site without connecting to Git?"
2. Clique em "Browse to upload"
3. Selecione e arraste a pasta `dist/` para a área de upload
4. Aguarde o upload e deploy automático
5. Você receberá uma URL como `https://random-name-123456.netlify.app`

#### 2.4. Deploy via GitHub (Recomendado)
1. Clique em "New site from Git"
2. Escolha "GitHub" e autorize a conexão
3. Selecione o repositório do seu projeto
4. Configure as opções de build:
   - **Branch to deploy**: `main` ou `master`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### 2.5. Configurar Variáveis de Ambiente
1. Vá para "Site settings" > "Environment variables"
2. Adicione as variáveis necessárias (mesmo formato da Vercel)

#### 2.6. Configurar Domínio Personalizado
1. Vá para "Site settings" > "Domain management"
2. Clique em "Add custom domain"
3. Siga as instruções para configurar o DNS

### Vantagens da Netlify:
- ✅ Interface muito intuitiva
- ✅ Deploy por drag & drop
- ✅ Formulários integrados
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Suporte para redirects e headers personalizados

---

## 3. Hospedagem no GitHub Pages {#github-pages}

O GitHub Pages é gratuito e integrado ao GitHub, ideal se você já usa Git.

### Passo a Passo:

#### 3.1. Preparar o Repositório
1. Crie um repositório no GitHub para o projeto
2. Faça upload de todos os arquivos do projeto
3. Certifique-se de que a pasta `dist/` está incluída

#### 3.2. Configurar GitHub Pages
1. No repositório, vá para "Settings"
2. Role para baixo até "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Escolha a branch `main` ou `master`
5. Selecione a pasta `/` (root) ou `/docs` se você mover os arquivos de build para lá

#### 3.3. Configurar Base Path (Importante!)
Como o GitHub Pages usa um subpath (ex: `username.github.io/repository-name`), você precisa configurar o base path:

1. No arquivo `vite.config.js`, adicione:
   ```javascript
   export default {
     base: '/nome-do-seu-repositorio/',
     // outras configurações...
   }
   ```

2. Rebuild o projeto:
   ```bash
   npm run build
   ```

3. Faça commit e push das mudanças

#### 3.4. Acessar o Site
Após alguns minutos, seu site estará disponível em:
`https://seu-usuario.github.io/nome-do-repositorio/`

### Vantagens do GitHub Pages:
- ✅ Totalmente gratuito
- ✅ Integrado ao GitHub
- ✅ Versionamento automático
- ✅ HTTPS automático
- ✅ Fácil de configurar

### Desvantagens:
- ❌ Não suporta variáveis de ambiente
- ❌ Limitações de build (apenas sites estáticos)
- ❌ Pode ser mais lento que Vercel/Netlify

---

## 4. Configurações Importantes {#configurações}

### 4.1. Variáveis de Ambiente
Para que o site funcione corretamente, você precisa configurar estas variáveis:

```env
VITE_WALLETCONNECT_PROJECT_ID=seu_project_id_aqui
VITE_CONTRACT_ADDRESS=0x...
VITE_ADMIN_WALLET=0x...
```

### 4.2. Configuração do WalletConnect
1. Acesse [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Crie uma conta e um novo projeto
3. Copie o Project ID e use na variável `VITE_WALLETCONNECT_PROJECT_ID`

### 4.3. Configuração do Contrato Inteligente
1. Deploy seu contrato na rede Polygon
2. Copie o endereço do contrato para `VITE_CONTRACT_ADDRESS`
3. Configure a wallet do administrador em `VITE_ADMIN_WALLET`

### 4.4. Arquivo _redirects (Para Netlify)
Crie um arquivo `_redirects` na pasta `public/` com:
```
/*    /index.html   200
```

### 4.5. Arquivo vercel.json (Para Vercel)
Crie um arquivo `vercel.json` na raiz com:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 5. Solução de Problemas {#problemas}

### 5.1. Problema: Página em branco após deploy
**Solução:**
- Verifique se o base path está configurado corretamente
- Certifique-se de que os arquivos estão na pasta correta
- Verifique o console do navegador para erros

### 5.2. Problema: Roteamento não funciona (404 em páginas internas)
**Solução:**
- Configure redirects conforme mostrado acima
- Para GitHub Pages, use HashRouter em vez de BrowserRouter

### 5.3. Problema: Variáveis de ambiente não funcionam
**Solução:**
- Certifique-se de que as variáveis começam com `VITE_`
- Rebuild o projeto após adicionar variáveis
- Verifique se as variáveis estão configuradas na plataforma de hospedagem

### 5.4. Problema: Site lento para carregar
**Solução:**
- Use code splitting para reduzir o tamanho dos chunks
- Otimize imagens
- Configure cache headers

### 5.5. Problema: Erro de CORS
**Solução:**
- Configure CORS no seu backend/API
- Use proxy durante desenvolvimento
- Verifique URLs das APIs

---

## Resumo de Recomendações

### Para Iniciantes:
1. **Netlify** - Mais fácil de usar, deploy por drag & drop

### Para Desenvolvedores:
1. **Vercel** - Melhor performance e integração com Git

### Para Projetos Open Source:
1. **GitHub Pages** - Gratuito e integrado ao GitHub

### Checklist Final:
- [ ] Build do projeto criado (`npm run build`)
- [ ] Variáveis de ambiente configuradas
- [ ] Redirects configurados para SPA
- [ ] Domínio personalizado configurado (opcional)
- [ ] HTTPS funcionando
- [ ] Todas as páginas acessíveis
- [ ] Funcionalidades testadas

---

**Suporte:** Se você encontrar problemas, verifique a documentação oficial de cada plataforma ou entre em contato para suporte técnico.

