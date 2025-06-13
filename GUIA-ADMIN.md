# Guia de Uso - Painel Administrativo CasinoFound

Este guia explica como usar o painel administrativo do site CasinoFound para gerenciar conteúdo, configurações e traduções.

## 📋 Índice

1. [Acesso ao Painel](#acesso)
2. [Dashboard](#dashboard)
3. [Gestão de Conteúdo](#conteudo)
4. [Configurações](#configuracoes)
5. [Gestão de Idiomas](#idiomas)
6. [Solução de Problemas](#problemas)

---

## 1. Acesso ao Painel {#acesso}

### 1.1. URL de Acesso
O painel administrativo está disponível em:
```
https://seu-site.com/admin
```

### 1.2. Autenticação
1. **Conecte sua carteira** usando o botão "Conectar Carteira"
2. **Verifique se é a wallet correta** - apenas a wallet configurada como administrador tem acesso
3. **Aguarde a verificação** - o sistema verificará automaticamente se você tem permissões

### 1.3. Wallet do Administrador
- A wallet do administrador é configurada na variável de ambiente `VITE_ADMIN_WALLET`
- Apenas esta wallet específica pode acessar o painel
- Se você não conseguir acessar, verifique se está usando a wallet correta

---

## 2. Dashboard {#dashboard}

### 2.1. Visão Geral
O dashboard fornece uma visão geral das principais métricas do projeto:

#### Estatísticas Principais
- **Total de Tokens Vendidos**
- **Valor Total Arrecadado**
- **Número de Holders**
- **Fase Atual da ICO**

#### Gráficos e Métricas
- **Vendas por Dia**
- **Distribuição de Tokens**
- **Atividade de Staking**
- **Visitantes do Site**

### 2.2. Ações Rápidas
- **Avançar Fase da ICO**
- **Atualizar Preço do Token**
- **Pausar/Retomar Vendas**
- **Enviar Notificações**

---

## 3. Gestão de Conteúdo {#conteudo}

### 3.1. Edição de Textos
1. Acesse **"Conteúdo"** no menu lateral
2. Selecione a **seção que deseja editar**:
   - Página Inicial
   - Whitepaper
   - Roadmap
   - Tokenomics
   - Equipe

3. **Edite o conteúdo** diretamente nos campos de texto
4. **Visualize as mudanças** em tempo real
5. **Salve as alterações** clicando em "Salvar"

### 3.2. Upload de Imagens
1. Clique em **"Adicionar Imagem"**
2. **Selecione o arquivo** do seu computador
3. **Aguarde o upload** (máximo 5MB)
4. **Posicione a imagem** conforme necessário
5. **Salve as alterações**

### 3.3. Edição da Equipe
1. Vá para **"Conteúdo" > "Equipe"**
2. **Adicione novos membros**:
   - Nome
   - Cargo
   - Biografia
   - Foto
   - Links sociais

3. **Edite membros existentes** clicando no ícone de edição
4. **Remova membros** se necessário
5. **Reordene a equipe** arrastando os cards

### 3.4. Configuração do Countdown
1. Acesse **"Conteúdo" > "Countdown"**
2. **Defina a data de lançamento** do casino
3. **Configure a mensagem** exibida
4. **Ative/desative** o countdown
5. **Salve as configurações**

---

## 4. Configurações {#configuracoes}

### 4.1. Configurações da ICO
1. Acesse **"Configurações" > "ICO"**
2. **Configure as fases**:
   - Fase 1: Preço, quantidade, data de início/fim
   - Fase 2: Preço, quantidade, data de início/fim
   - Adicione mais fases se necessário

3. **Defina limites**:
   - Mínimo por compra
   - Máximo por compra
   - Total de tokens disponíveis

### 4.2. Configurações de Blockchain
1. Vá para **"Configurações" > "Blockchain"**
2. **Configure os contratos**:
   - Endereço do contrato CFD
   - Endereço do contrato USDT
   - Endereço do contrato MATIC
   - ABI dos contratos

3. **Defina parâmetros**:
   - Taxa de transação
   - Slippage tolerado
   - Tempo de confirmação

### 4.3. Configurações de Staking
1. Acesse **"Configurações" > "Staking"**
2. **Configure recompensas**:
   - Taxa de recompensa anual (APY)
   - Período mínimo de staking
   - Penalidades por unstaking antecipado

3. **Defina distribuição**:
   - Frequência de distribuição de lucros
   - Porcentagem dos lucros distribuída
   - Critérios de elegibilidade

### 4.4. Configurações de Email
1. Vá para **"Configurações" > "Email"**
2. **Configure o serviço de email**:
   - Provedor (EmailJS, SendGrid, etc.)
   - Chaves de API
   - Templates de email

3. **Defina notificações**:
   - Novos usuários
   - Compras de tokens
   - Eventos importantes

---

## 5. Gestão de Idiomas {#idiomas}

### 5.1. Visualizar Traduções
1. Acesse **"Idiomas"** no menu
2. **Selecione o idioma** que deseja editar:
   - Português (pt)
   - Inglês (en)
   - Francês (fr)
   - Chinês (zh)

3. **Navegue pelas seções** de tradução

### 5.2. Editar Traduções
1. **Clique no campo** que deseja editar
2. **Digite a nova tradução**
3. **Use as teclas Tab/Enter** para navegar entre campos
4. **Salve as alterações** regularmente

### 5.3. Adicionar Novos Idiomas
1. Clique em **"Adicionar Idioma"**
2. **Selecione o código do idioma** (ex: es, de, it)
3. **Defina o nome** do idioma
4. **Copie traduções** de um idioma base
5. **Edite as traduções** conforme necessário

### 5.4. Exportar/Importar Traduções
1. **Exportar**:
   - Clique em "Exportar"
   - Selecione o formato (JSON, CSV)
   - Baixe o arquivo

2. **Importar**:
   - Clique em "Importar"
   - Selecione o arquivo
   - Confirme a importação

---

## 6. Solução de Problemas {#problemas}

### 6.1. Não Consigo Acessar o Painel
**Possíveis Causas:**
- Wallet incorreta conectada
- Wallet não configurada como administrador
- Problemas de conexão

**Soluções:**
1. Verifique se está usando a wallet correta
2. Confirme o endereço na configuração `VITE_ADMIN_WALLET`
3. Tente desconectar e reconectar a wallet
4. Limpe o cache do navegador

### 6.2. Mudanças Não Aparecem no Site
**Possíveis Causas:**
- Cache do navegador
- CDN não atualizado
- Erro ao salvar

**Soluções:**
1. Force refresh (Ctrl+F5)
2. Aguarde alguns minutos para propagação
3. Verifique se clicou em "Salvar"
4. Verifique o console para erros

### 6.3. Erro ao Fazer Upload de Imagem
**Possíveis Causas:**
- Arquivo muito grande
- Formato não suportado
- Problemas de conexão

**Soluções:**
1. Reduza o tamanho da imagem (máx 5MB)
2. Use formatos suportados (JPG, PNG, WebP)
3. Verifique sua conexão com a internet
4. Tente novamente após alguns minutos

### 6.4. Traduções Não Funcionam
**Possíveis Causas:**
- Chaves de tradução incorretas
- Arquivo de tradução corrompido
- Cache do i18next

**Soluções:**
1. Verifique a sintaxe das traduções
2. Recarregue a página
3. Exporte e reimporte as traduções
4. Contate o suporte técnico

### 6.5. Problemas com Blockchain
**Possíveis Causas:**
- Endereços de contrato incorretos
- ABI desatualizada
- Rede incorreta

**Soluções:**
1. Verifique os endereços dos contratos
2. Atualize a ABI se necessário
3. Confirme se está na rede Polygon
4. Verifique se os contratos estão deployados

---

## 📞 Suporte Técnico

### Informações de Contato
- **Email**: admin@casinofound.me
- **Telegram**: @CasinoFoundSupport
- **Discord**: CasinoFound Official

### Logs e Debugging
1. **Console do Navegador**: F12 > Console
2. **Network Tab**: Para verificar requisições
3. **Local Storage**: Para verificar dados salvos
4. **Wallet Logs**: Para problemas de conexão

### Backup e Recuperação
1. **Exporte configurações** regularmente
2. **Mantenha backup** das traduções
3. **Documente mudanças** importantes
4. **Teste em ambiente** de desenvolvimento primeiro

---

## ✅ Checklist de Manutenção

### Diário
- [ ] Verificar métricas do dashboard
- [ ] Responder mensagens de usuários
- [ ] Monitorar transações blockchain

### Semanal
- [ ] Atualizar conteúdo se necessário
- [ ] Verificar traduções
- [ ] Backup das configurações
- [ ] Análise de performance

### Mensal
- [ ] Revisar configurações da ICO
- [ ] Atualizar roadmap
- [ ] Análise de métricas completa
- [ ] Planejamento de melhorias

---

**Lembre-se**: Sempre teste mudanças em um ambiente de desenvolvimento antes de aplicar em produção!

