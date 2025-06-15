import React, { createContext, useContext, useEffect, useState } from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { 
  getCFDBalance, 
  getUSDTBalance, 
  getMaticBalance, 
  getStakedBalance,
  getTotalStaked,
  canUnstake,
  getPendingRewards,
  getICOInfo,
  calculateUserPercentage,
  calculateStakingPercentage,
  buyTokensWithUSDT,
  buyTokensWithMatic,
  stakeTokens,
  unstakeTokens,
  claimRewards,
  createWalletClientFromConnector,
  checkNetwork,
  addPolygonNetwork
} from '../lib/contracts';

// Configuração do WalletConnect
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error('VITE_WALLETCONNECT_PROJECT_ID não está definido');
}

const metadata = {
  name: 'CasinoFound',
  description: 'Plataforma de investimento em casino online baseada em blockchain',
  url: 'https://casinofound.me',
  icons: ['https://casinofound.me/favicon.svg']
};

const chains = [polygon];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Criar modal Web3
createWeb3Modal({ wagmiConfig, projectId, chains });

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 deve ser usado dentro de Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState({
    cfd: '0',
    usdt: '0',
    matic: '0',
    staked: '0'
  });
  const [stakingInfo, setStakingInfo] = useState({
    totalStaked: '0',
    userPercentage: '0',
    stakingPercentage: '0',
    canUnstake: false,
    pendingRewards: '0'
  });
  const [icoInfo, setIcoInfo] = useState({
    phase: 1,
    price: '0.02',
    tokensRemaining: '2520000'
  });
  const [loading, setLoading] = useState(false);
  const [walletClient, setWalletClient] = useState(null);

  // Conectar carteira
  const connectWallet = async () => {
    try {
      setLoading(true);
      const modal = document.querySelector('w3m-modal');
      if (modal) {
        modal.open();
      }
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    } finally {
      setLoading(false);
    }
  };

  // Desconectar carteira
  const disconnectWallet = async () => {
    try {
      setLoading(true);
      const modal = document.querySelector('w3m-modal');
      if (modal) {
        modal.close();
      }
      setIsConnected(false);
      setAddress('');
      setWalletClient(null);
      resetBalances();
    } catch (error) {
      console.error('Erro ao desconectar carteira:', error);
    } finally {
      setLoading(false);
    }
  };

  // Resetar saldos
  const resetBalances = () => {
    setBalances({
      cfd: '0',
      usdt: '0',
      matic: '0',
      staked: '0'
    });
    setStakingInfo({
      totalStaked: '0',
      userPercentage: '0',
      stakingPercentage: '0',
      canUnstake: false,
      pendingRewards: '0'
    });
  };

  // Atualizar dados da carteira
  const updateWalletData = async (userAddress) => {
    if (!userAddress) return;

    try {
      setLoading(true);

      // Buscar saldos
      const [cfdBalance, usdtBalance, maticBalance, stakedBalance] = await Promise.all([
        getCFDBalance(userAddress),
        getUSDTBalance(userAddress),
        getMaticBalance(userAddress),
        getStakedBalance(userAddress)
      ]);

      setBalances({
        cfd: cfdBalance,
        usdt: usdtBalance,
        matic: maticBalance,
        staked: stakedBalance
      });

      // Buscar informações de staking
      const [
        totalStaked,
        userPercentage,
        stakingPercentage,
        canUnstakeResult,
        pendingRewards
      ] = await Promise.all([
        getTotalStaked(),
        calculateUserPercentage(userAddress),
        calculateStakingPercentage(userAddress),
        canUnstake(userAddress),
        getPendingRewards(userAddress)
      ]);

      setStakingInfo({
        totalStaked,
        userPercentage,
        stakingPercentage,
        canUnstake: canUnstakeResult,
        pendingRewards
      });

      // Buscar informações da ICO
      const icoData = await getICOInfo();
      setIcoInfo(icoData);

    } catch (error) {
      console.error('Erro ao atualizar dados da carteira:', error);
    } finally {
      setLoading(false);
    }
  };

  // Comprar tokens
  const buyTokens = async (amount, paymentMethod) => {
    if (!walletClient || !address) {
      throw new Error('Carteira não conectada');
    }

    try {
      setLoading(true);
      let hash;

      if (paymentMethod === 'usdt') {
        hash = await buyTokensWithUSDT(walletClient, amount, address);
      } else if (paymentMethod === 'matic') {
        hash = await buyTokensWithMatic(walletClient, amount, address);
      } else {
        throw new Error('Método de pagamento inválido');
      }

      // Aguardar confirmação e atualizar dados
      await new Promise(resolve => setTimeout(resolve, 3000));
      await updateWalletData(address);

      return hash;
    } catch (error) {
      console.error('Erro ao comprar tokens:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fazer stake
  const stake = async (amount) => {
    if (!walletClient || !address) {
      throw new Error('Carteira não conectada');
    }

    try {
      setLoading(true);
      const hash = await stakeTokens(walletClient, amount, address);
      
      // Aguardar confirmação e atualizar dados
      await new Promise(resolve => setTimeout(resolve, 3000));
      await updateWalletData(address);

      return hash;
    } catch (error) {
      console.error('Erro ao fazer stake:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fazer unstake
  const unstake = async (amount) => {
    if (!walletClient || !address) {
      throw new Error('Carteira não conectada');
    }

    try {
      setLoading(true);
      const hash = await unstakeTokens(walletClient, amount, address);
      
      // Aguardar confirmação e atualizar dados
      await new Promise(resolve => setTimeout(resolve, 3000));
      await updateWalletData(address);

      return hash;
    } catch (error) {
      console.error('Erro ao fazer unstake:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reivindicar recompensas
  const claim = async () => {
    if (!walletClient || !address) {
      throw new Error('Carteira não conectada');
    }

    try {
      setLoading(true);
      const hash = await claimRewards(walletClient, address);
      
      // Aguardar confirmação e atualizar dados
      await new Promise(resolve => setTimeout(resolve, 3000));
      await updateWalletData(address);

      return hash;
    } catch (error) {
      console.error('Erro ao reivindicar recompensas:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Verificar conexão da carteira
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Verificar se há uma carteira conectada
        const accounts = await window.ethereum?.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          const userAddress = accounts[0];
          setAddress(userAddress);
          setIsConnected(true);

          // Criar cliente da carteira
          if (window.ethereum) {
            const client = createWalletClientFromConnector(window.ethereum);
            setWalletClient(client);

            // Verificar rede
            const isCorrectNetwork = await checkNetwork(client);
            if (!isCorrectNetwork) {
              await addPolygonNetwork(client);
            }
          }

          // Atualizar dados
          await updateWalletData(userAddress);
        }
      } catch (error) {
        console.error('Erro ao verificar conexão:', error);
      }
    };

    checkConnection();

    // Escutar mudanças de conta
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          const userAddress = accounts[0];
          setAddress(userAddress);
          setIsConnected(true);
          updateWalletData(userAddress);
        } else {
          setIsConnected(false);
          setAddress('');
          setWalletClient(null);
          resetBalances();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const value = {
    // Estado
    isConnected,
    address,
    balances,
    stakingInfo,
    icoInfo,
    loading,
    walletClient,

    // Funções
    connectWallet,
    disconnectWallet,
    updateWalletData,
    buyTokens,
    stake,
    unstake,
    claim,

    // Utilitários
    formatAddress: (addr) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '',
    formatNumber: (num) => parseFloat(num).toLocaleString('pt-PT', { maximumFractionDigits: 4 }),
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Web3Context.Provider value={value}>
        {children}
      </Web3Context.Provider>
    </WagmiConfig>
  );
};

