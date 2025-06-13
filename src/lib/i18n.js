import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traduções inline para evitar problemas de carregamento
const resources = {
  pt: {
    translation: {
      common: {
        loading: "Carregando...",
        error: "Erro",
        success: "Sucesso",
        connectWallet: "Conectar Carteira",
        disconnectWallet: "Desconectar Carteira",
        buyTokens: "Comprar Tokens",
        stack: "Stack",
        unstack: "Unstack",
        subscribe: "Inscrever-se",
        learnMore: "Saiba Mais",
        comingSoon: "Em Breve"
      },
      header: {
        home: "Início",
        digitalVault: "Cofre Digital",
        whitepaper: "Whitepaper",
        roadmap: "Roadmap",
        tokenomics: "Tokenomics",
        team: "Equipa"
      },
      home: {
        countdown: {
          title: "Lançamento do Casino em",
          days: "Dias",
          hours: "Horas",
          minutes: "Minutos",
          seconds: "Segundos"
        },
        icoPhase: {
          title: "Fase Atual da ICO",
          phase1: "Fase 1: $0,02 por token",
          phase2: "Fase 2: $0,10 por token",
          buyNow: "Comprar Agora"
        },
        about: {
          title: "Sobre o Token CFD",
          description: "CasinoFound é uma criptomoeda baseada na rede Polygon (Matic), criada para financiar o lançamento e a operação de um casino online inovador. Através do token CFD, os detentores participam dos lucros do casino, recebendo dividendos proporcionais à quantidade de tokens que possuem em Stack."
        },
        newsletter: {
          title: "Fique Atualizado",
          subtitle: "Inscreva-se na nossa newsletter para receber as últimas novidades",
          placeholder: "Seu email",
          button: "Inscrever-se"
        }
      },
      digitalVault: {
        title: "Cofre Digital",
        connectFirst: "Conecte sua carteira para acessar o cofre digital",
        walletInfo: {
          title: "Informações da Carteira",
          address: "Endereço",
          balance: "Saldo"
        },
        buyTokens: {
          title: "Comprar Tokens",
          usdt: "Comprar com USDT",
          matic: "Comprar com MATIC",
          amount: "Quantidade",
          price: "Preço",
          total: "Total",
          buy: "Comprar"
        },
        tokenInfo: {
          title: "Informações de Tokens",
          stackPercentage: "Percentagem em Stack",
          totalPercentage: "Percentagem do Total"
        },
        stackArea: {
          title: "Área de Stack",
          description: "Faça stack dos seus tokens CFD para receber dividendos proporcionais aos lucros do casino. Os tokens em stack ficam bloqueados por um período mínimo de 30 dias.",
          stackButton: "Stack",
          unstackButton: "Unstack",
          amountToStack: "Quantidade para Stack",
          amountToUnstack: "Quantidade para Unstack"
        }
      },
      footer: {
        rights: "Todos os direitos reservados",
        privacy: "Política de Privacidade",
        terms: "Termos de Uso",
        contact: "Contato"
      }
    }
  },
  en: {
    translation: {
      common: {
        loading: "Loading...",
        error: "Error",
        success: "Success",
        connectWallet: "Connect Wallet",
        disconnectWallet: "Disconnect Wallet",
        buyTokens: "Buy Tokens",
        stack: "Stake",
        unstack: "Unstake",
        subscribe: "Subscribe",
        learnMore: "Learn More",
        comingSoon: "Coming Soon"
      },
      header: {
        home: "Home",
        digitalVault: "Digital Vault",
        whitepaper: "Whitepaper",
        roadmap: "Roadmap",
        tokenomics: "Tokenomics",
        team: "Team"
      },
      home: {
        countdown: {
          title: "Casino Launch in",
          days: "Days",
          hours: "Hours",
          minutes: "Minutes",
          seconds: "Seconds"
        },
        icoPhase: {
          title: "Current ICO Phase",
          phase1: "Phase 1: $0.02 per token",
          phase2: "Phase 2: $0.10 per token",
          buyNow: "Buy Now"
        },
        about: {
          title: "About CFD Token",
          description: "CasinoFound is a cryptocurrency based on the Polygon (Matic) network, created to finance the launch and operation of an innovative online casino. Through the CFD token, holders participate in casino profits, receiving dividends proportional to the amount of tokens they have staked."
        },
        newsletter: {
          title: "Stay Updated",
          subtitle: "Subscribe to our newsletter to receive the latest news",
          placeholder: "Your email",
          button: "Subscribe"
        }
      },
      digitalVault: {
        title: "Digital Vault",
        connectFirst: "Connect your wallet to access the digital vault",
        walletInfo: {
          title: "Wallet Information",
          address: "Address",
          balance: "Balance"
        },
        buyTokens: {
          title: "Buy Tokens",
          usdt: "Buy with USDT",
          matic: "Buy with MATIC",
          amount: "Amount",
          price: "Price",
          total: "Total",
          buy: "Buy"
        },
        tokenInfo: {
          title: "Token Information",
          stackPercentage: "Staked Percentage",
          totalPercentage: "Total Percentage"
        },
        stackArea: {
          title: "Staking Area",
          description: "Stake your CFD tokens to receive dividends proportional to casino profits. Staked tokens are locked for a minimum period of 30 days.",
          stackButton: "Stake",
          unstackButton: "Unstake",
          amountToStack: "Amount to Stake",
          amountToUnstack: "Amount to Unstake"
        }
      },
      footer: {
        rights: "All rights reserved",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        contact: "Contact"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  });

// Função para mudar o idioma
export const changeLanguage = (lng) => {
  return i18n.changeLanguage(lng);
};

// Função para obter o idioma atual
export const getCurrentLanguage = () => {
  return i18n.language || window.localStorage.i18nextLng || 'pt';
};

// Função para obter todos os idiomas suportados
export const getSupportedLanguages = () => {
  return [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];
};

// Função para obter o nome do idioma atual
export const getCurrentLanguageName = () => {
  const currentLng = getCurrentLanguage();
  const language = getSupportedLanguages().find(lng => lng.code === currentLng);
  return language ? language.name : 'Português';
};

export default i18n;

