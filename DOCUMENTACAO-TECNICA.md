# Documentação Técnica - CasinoFound

Esta documentação técnica fornece informações detalhadas sobre a arquitetura, implementação e manutenção do projeto CasinoFound.

## 📋 Índice

1. [Arquitetura do Sistema](#arquitetura)
2. [Estrutura de Componentes](#componentes)
3. [Integração Blockchain](#blockchain)
4. [Sistema de Internacionalização](#i18n)
5. [Gerenciamento de Estado](#estado)
6. [API e Endpoints](#api)
7. [Segurança](#seguranca)
8. [Performance](#performance)
9. [Deployment](#deployment)
10. [Manutenção](#manutencao)

---

## 1. Arquitetura do Sistema {#arquitetura}

### 1.1. Visão Geral
O CasinoFound é uma Single Page Application (SPA) construída com React que interage com contratos inteligentes na blockchain Polygon.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Blockchain    │    │   IPFS/CDN      │
│   (React)       │◄──►│   (Polygon)     │    │   (Assets)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   WalletConnect │    │   Smart         │    │   Translations  │
│   (Auth)        │    │   Contracts     │    │   (i18n)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2. Tecnologias Principais
- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Blockchain**: Wagmi + Viem + WalletConnect
- **Routing**: React Router v6
- **State**: React Context + Hooks
- **i18n**: React i18next

### 1.3. Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface base
│   └── admin/          # Componentes específicos do admin
├── contexts/           # Contextos React para estado global
├── lib/               # Configurações e utilitários
├── pages/             # Componentes de página
│   └── admin/         # Páginas do painel administrativo
├── utils/             # Funções utilitárias
└── assets/            # Recursos estáticos
```

---

## 2. Estrutura de Componentes {#componentes}

### 2.1. Hierarquia de Componentes
```
App
├── Layout (público)
│   ├── Header
│   ├── Outlet (páginas)
│   └── Footer
└── AdminLayout (administrativo)
    ├── AdminHeader
    ├── AdminSidebar
    └── Outlet (páginas admin)
```

### 2.2. Componentes Base (UI)
Localizados em `src/components/ui/`:

- **Button**: Botões com variantes e tamanhos
- **Card**: Containers para conteúdo
- **Input**: Campos de entrada
- **Label**: Rótulos para formulários
- **Tabs**: Navegação em abas
- **Alert**: Mensagens de alerta
- **DropdownMenu**: Menus suspensos
- **Separator**: Divisores visuais

### 2.3. Componentes Específicos
- **WalletButton**: Conexão com carteira
- **LanguageSwitcher**: Seletor de idioma
- **LoadingScreen**: Tela de carregamento
- **CountdownTimer**: Timer para lançamento

### 2.4. Padrões de Desenvolvimento
```jsx
// Exemplo de componente padrão
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ExampleComponent = ({ data, onAction }) => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('example.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Conteúdo do componente */}
      </CardContent>
    </Card>
  );
};

export default ExampleComponent;
```

---

## 3. Integração Blockchain {#blockchain}

### 3.1. Configuração Wagmi
```javascript
// src/lib/web3.js
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { polygon, polygonMumbai } from 'wagmi/chains';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const metadata = {
  name: 'CasinoFound',
  description: 'CFD Token Platform',
  url: 'https://casinofound.me',
  icons: ['https://casinofound.me/favicon.png']
};

const chains = [polygon, polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });
```

### 3.2. Hooks Personalizados
```javascript
// Exemplo de hook para interação com contrato
const useTokenContract = () => {
  const { address } = useAccount();
  const { settings } = useSettings();
  
  const { data: balance } = useReadContract({
    address: settings.contractAddress,
    abi: settings.contractABI,
    functionName: 'balanceOf',
    args: [address],
  });
  
  const { writeContract: buyTokens } = useWriteContract();
  
  return { balance, buyTokens };
};
```

### 3.3. Contratos Inteligentes
O projeto interage com os seguintes contratos:

- **CFD Token**: Token principal (ERC-20)
- **Staking Contract**: Sistema de staking
- **ICO Contract**: Venda de tokens
- **USDT/MATIC**: Tokens de pagamento

### 3.4. ABIs dos Contratos
```javascript
// Exemplo de ABI simplificada
const CFD_ABI = [
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  },
  {
    "inputs": [{"name": "amount", "type": "uint256"}],
    "name": "stake",
    "outputs": [],
    "type": "function"
  }
  // ... mais funções
];
```

---

## 4. Sistema de Internacionalização {#i18n}

### 4.1. Configuração i18next
```javascript
// src/lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en', 'fr', 'zh'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
```

### 4.2. Estrutura de Traduções
```json
{
  "translation": {
    "common": {
      "loading": "Carregando...",
      "error": "Erro",
      "success": "Sucesso"
    },
    "header": {
      "home": "Início",
      "digitalVault": "Cofre Digital"
    }
  }
}
```

### 4.3. Uso em Componentes
```jsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div>
      <h1>{t('header.home')}</h1>
      <button onClick={() => changeLanguage('en')}>
        English
      </button>
    </div>
  );
};
```

---

## 5. Gerenciamento de Estado {#estado}

### 5.1. Contextos React
O projeto usa React Context para gerenciamento de estado global:

#### Web3Context
```javascript
const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [tokenBalance, setTokenBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  
  const value = {
    tokenBalance,
    stakedBalance,
    // ... outras propriedades e funções
  };
  
  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};
```

#### SettingsContext
```javascript
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    contractAddress: '',
    contractABI: [],
    adminWallet: '',
    // ... outras configurações
  });
  
  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
```

### 5.2. Custom Hooks
```javascript
// Hook para usar o contexto Web3
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
```

---

## 6. API e Endpoints {#api}

### 6.1. Estrutura de API (Futuro)
```
/api/
├── auth/              # Autenticação
├── users/             # Gestão de usuários
├── transactions/      # Histórico de transações
├── analytics/         # Métricas e estatísticas
└── admin/             # Endpoints administrativos
```

### 6.2. Integração com Blockchain
```javascript
// Exemplo de função para buscar dados da blockchain
const fetchTokenData = async (address) => {
  try {
    const balance = await readContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'balanceOf',
      args: [address],
    });
    
    return formatEther(balance);
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
};
```

### 6.3. Cache e Performance
```javascript
// Exemplo de cache com React Query (futuro)
const useTokenBalance = (address) => {
  return useQuery({
    queryKey: ['tokenBalance', address],
    queryFn: () => fetchTokenData(address),
    staleTime: 30000, // 30 segundos
    enabled: !!address,
  });
};
```

---

## 7. Segurança {#seguranca}

### 7.1. Autenticação Blockchain
```javascript
// Verificação de assinatura para admin
const verifyAdminSignature = async (address, signature, message) => {
  try {
    const recoveredAddress = await verifyMessage({
      address,
      message,
      signature,
    });
    
    return recoveredAddress.toLowerCase() === ADMIN_WALLET.toLowerCase();
  } catch (error) {
    return false;
  }
};
```

### 7.2. Validação de Inputs
```javascript
// Exemplo de validação
const validateTokenAmount = (amount) => {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount) || numAmount <= 0) {
    throw new Error('Invalid amount');
  }
  
  if (numAmount > MAX_PURCHASE_AMOUNT) {
    throw new Error('Amount exceeds maximum');
  }
  
  return true;
};
```

### 7.3. Sanitização de Dados
```javascript
// Sanitização de strings para prevenir XSS
const sanitizeInput = (input) => {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 1000); // Limitar tamanho
};
```

### 7.4. Configurações de Segurança
- HTTPS obrigatório em produção
- Content Security Policy (CSP)
- Validação de origem para requests
- Rate limiting para APIs
- Sanitização de todos os inputs

---

## 8. Performance {#performance}

### 8.1. Code Splitting
```javascript
// Lazy loading de componentes
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));

// Uso com Suspense
<Suspense fallback={<LoadingScreen />}>
  <AdminDashboard />
</Suspense>
```

### 8.2. Otimizações de Bundle
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          blockchain: ['wagmi', 'viem', '@web3modal/wagmi'],
          ui: ['@radix-ui/react-slot', '@radix-ui/react-tabs'],
        },
      },
    },
  },
};
```

### 8.3. Memoização
```javascript
// Exemplo de otimização com useMemo
const TokenStats = ({ balance, totalSupply }) => {
  const percentage = useMemo(() => {
    if (!balance || !totalSupply) return 0;
    return (parseFloat(balance) / parseFloat(totalSupply)) * 100;
  }, [balance, totalSupply]);
  
  return <div>{percentage.toFixed(2)}%</div>;
};
```

### 8.4. Métricas de Performance
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

---

## 9. Deployment {#deployment}

### 9.1. Build de Produção
```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Verificar build
npm run preview
```

### 9.2. Configurações de Deploy

#### Vercel
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

#### Netlify
```
# _redirects
/*    /index.html   200
```

### 9.3. Variáveis de Ambiente
```env
# Produção
VITE_WALLETCONNECT_PROJECT_ID=
VITE_CONTRACT_ADDRESS=
VITE_ADMIN_WALLET=
VITE_CHAIN_ID=137
```

### 9.4. CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
```

---

## 10. Manutenção {#manutencao}

### 10.1. Monitoramento
```javascript
// Exemplo de logging de erros
const logError = (error, context) => {
  console.error('Error:', error);
  
  // Em produção, enviar para serviço de monitoramento
  if (process.env.NODE_ENV === 'production') {
    // Sentry, LogRocket, etc.
  }
};
```

### 10.2. Atualizações de Dependências
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências
npm update

# Atualizar dependências principais
npm install react@latest react-dom@latest
```

### 10.3. Testes
```javascript
// Exemplo de teste unitário
import { render, screen } from '@testing-library/react';
import { WalletButton } from './WalletButton';

test('renders wallet button', () => {
  render(<WalletButton />);
  const button = screen.getByText(/conectar carteira/i);
  expect(button).toBeInTheDocument();
});
```

### 10.4. Backup e Recuperação
- Backup regular das configurações
- Versionamento de contratos inteligentes
- Backup das traduções
- Documentação de mudanças

### 10.5. Checklist de Manutenção

#### Diário
- [ ] Verificar logs de erro
- [ ] Monitorar performance
- [ ] Verificar transações blockchain

#### Semanal
- [ ] Atualizar dependências menores
- [ ] Revisar métricas de uso
- [ ] Backup de configurações

#### Mensal
- [ ] Auditoria de segurança
- [ ] Análise de performance
- [ ] Planejamento de melhorias
- [ ] Atualização de documentação

---

## 📞 Suporte Técnico

### Contatos
- **Email**: dev@casinofound.me
- **GitHub**: [repositório do projeto]
- **Discord**: CasinoFound Developers

### Recursos Úteis
- [Documentação do React](https://react.dev)
- [Documentação do Wagmi](https://wagmi.sh)
- [Documentação do Tailwind CSS](https://tailwindcss.com)
- [Documentação do Vite](https://vitejs.dev)

---

**Esta documentação deve ser atualizada regularmente conforme o projeto evolui.**

