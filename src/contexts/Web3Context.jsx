import { createContext, useContext, useEffect, useState } from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID';

// 2. Create wagmiConfig
const metadata = {
  name: 'CasinoFound',
  description: 'CasinoFound - CFD Token Platform',
  url: 'https://casinofound.com',
  icons: ['https://casinofound.com/favicon.png']
};

const chains = [polygon, polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

// 4. Create query client
const queryClient = new QueryClient();

const Web3Context = createContext({});

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [stakedBalance, setStakedBalance] = useState('0');
  const [chainId, setChainId] = useState(137); // Polygon mainnet

  // Mock functions for demonstration
  const connect = async () => {
    try {
      // This would normally use the Web3Modal
      setIsConnected(true);
      setAddress('0x1234...5678');
      setBalance('1.5');
      setTokenBalance('1000');
      setStakedBalance('500');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress('');
    setBalance('0');
    setTokenBalance('0');
    setStakedBalance('0');
  };

  const buyTokens = async (amount, paymentMethod) => {
    try {
      console.log(`Buying ${amount} tokens with ${paymentMethod}`);
      // Implementation would go here
      return { success: true, txHash: '0x...' };
    } catch (error) {
      console.error('Failed to buy tokens:', error);
      return { success: false, error: error.message };
    }
  };

  const stakeTokens = async (amount) => {
    try {
      console.log(`Staking ${amount} tokens`);
      // Implementation would go here
      return { success: true, txHash: '0x...' };
    } catch (error) {
      console.error('Failed to stake tokens:', error);
      return { success: false, error: error.message };
    }
  };

  const unstakeTokens = async (amount) => {
    try {
      console.log(`Unstaking ${amount} tokens`);
      // Implementation would go here
      return { success: true, txHash: '0x...' };
    } catch (error) {
      console.error('Failed to unstake tokens:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    isConnected,
    address,
    balance,
    tokenBalance,
    stakedBalance,
    chainId,
    connect,
    disconnect,
    buyTokens,
    stakeTokens,
    unstakeTokens,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <Web3Context.Provider value={value}>
          {children}
        </Web3Context.Provider>
      </WagmiConfig>
    </QueryClientProvider>
  );
};

