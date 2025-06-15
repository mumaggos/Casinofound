// ===========================================
// CONFIGURAÇÕES DOS CONTRATOS INTELIGENTES
// ===========================================

import { createPublicClient, createWalletClient, custom, http, formatEther, parseEther } from 'viem';
import { polygon } from 'viem/chains';
import { CFD_TOKEN_ABI, USDT_ABI, MATIC_ABI, CONTRACT_ADDRESSES, POLYGON_CONFIG } from './abis.js';

// Cliente público para leitura da blockchain
export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(import.meta.env.VITE_RPC_URL || 'https://polygon-rpc.com'),
});

// Função para criar cliente da carteira conectada
export const createWalletClientFromConnector = (connector) => {
  return createWalletClient({
    chain: polygon,
    transport: custom(connector),
  });
};

// Endereços dos contratos (usando variáveis de ambiente)
export const CONTRACTS = {
  CFD_TOKEN: import.meta.env.VITE_TOKEN_CONTRACT,
  USDT: import.meta.env.VITE_USDT_CONTRACT,
  MATIC: import.meta.env.VITE_MATIC_CONTRACT,
};

// ABIs dos contratos
export const ABIS = {
  CFD_TOKEN: CFD_TOKEN_ABI,
  USDT: USDT_ABI,
  MATIC: MATIC_ABI,
};

// ===========================================
// FUNÇÕES DE LEITURA DE DADOS
// ===========================================

// Obter saldo de tokens CFD
export const getCFDBalance = async (userAddress) => {
  try {
    const balance = await publicClient.readContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'balanceOf',
      args: [userAddress],
    });
    return formatEther(balance);
  } catch (error) {
    console.error('Erro ao obter saldo CFD:', error);
    return '0';
  }
};

// Obter saldo de USDT
export const getUSDTBalance = async (userAddress) => {
  try {
    const balance = await publicClient.readContract({
      address: CONTRACTS.USDT,
      abi: ABIS.USDT,
      functionName: 'balanceOf',
      args: [userAddress],
    });
    // USDT tem 6 decimais
    return (Number(balance) / 1000000).toString();
  } catch (error) {
    console.error('Erro ao obter saldo USDT:', error);
    return '0';
  }
};

// Obter saldo de MATIC
export const getMaticBalance = async (userAddress) => {
  try {
    const balance = await publicClient.getBalance({
      address: userAddress,
    });
    return formatEther(balance);
  } catch (error) {
    console.error('Erro ao obter saldo MATIC:', error);
    return '0';
  }
};

// Obter saldo em staking
export const getStakedBalance = async (userAddress) => {
  try {
    const balance = await publicClient.readContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'stakedBalance',
      args: [userAddress],
    });
    return formatEther(balance);
  } catch (error) {
    console.error('Erro ao obter saldo em stake:', error);
    return '0';
  }
};

// Obter total de tokens em staking
export const getTotalStaked = async () => {
  try {
    const total = await publicClient.readContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'totalStaked',
      args: [],
    });
    return formatEther(total);
  } catch (error) {
    console.error('Erro ao obter total em stake:', error);
    return '0';
  }
};

// Verificar se pode fazer unstake
export const canUnstake = async (userAddress) => {
  try {
    const canUnstakeResult = await publicClient.readContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'canUnstake',
      args: [userAddress],
    });
    return canUnstakeResult;
  } catch (error) {
    console.error('Erro ao verificar unstake:', error);
    return false;
  }
};

// Obter recompensas pendentes
export const getPendingRewards = async (userAddress) => {
  try {
    const rewards = await publicClient.readContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'pendingRewards',
      args: [userAddress],
    });
    return formatEther(rewards);
  } catch (error) {
    console.error('Erro ao obter recompensas:', error);
    return '0';
  }
};

// Obter informações da ICO
export const getICOInfo = async () => {
  try {
    const [currentPhase, currentPrice, tokensRemaining] = await Promise.all([
      publicClient.readContract({
        address: CONTRACTS.CFD_TOKEN,
        abi: ABIS.CFD_TOKEN,
        functionName: 'currentPhase',
        args: [],
      }),
      publicClient.readContract({
        address: CONTRACTS.CFD_TOKEN,
        abi: ABIS.CFD_TOKEN,
        functionName: 'currentPrice',
        args: [],
      }),
      publicClient.readContract({
        address: CONTRACTS.CFD_TOKEN,
        abi: ABIS.CFD_TOKEN,
        functionName: 'tokensRemaining',
        args: [],
      }),
    ]);

    return {
      phase: Number(currentPhase),
      price: formatEther(currentPrice),
      tokensRemaining: formatEther(tokensRemaining),
    };
  } catch (error) {
    console.error('Erro ao obter informações da ICO:', error);
    return {
      phase: 1,
      price: import.meta.env.VITE_ICO_PHASE_1_PRICE || '0.02',
      tokensRemaining: import.meta.env.VITE_ICO_PHASE_1_TOKENS || '2520000',
    };
  }
};

// ===========================================
// FUNÇÕES DE ESCRITA (TRANSAÇÕES)
// ===========================================

// Comprar tokens com USDT
export const buyTokensWithUSDT = async (walletClient, tokenAmount, userAddress) => {
  try {
    const usdtAmount = parseEther(tokenAmount) * parseEther(import.meta.env.VITE_ICO_PHASE_1_PRICE || '0.02') / parseEther('1');
    
    // Primeiro aprovar USDT
    const approveHash = await walletClient.writeContract({
      address: CONTRACTS.USDT,
      abi: ABIS.USDT,
      functionName: 'approve',
      args: [CONTRACTS.CFD_TOKEN, usdtAmount],
      account: userAddress,
    });

    // Aguardar confirmação da aprovação
    await publicClient.waitForTransactionReceipt({ hash: approveHash });

    // Comprar tokens
    const buyHash = await walletClient.writeContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'buyTokens',
      args: [parseEther(tokenAmount), CONTRACTS.USDT],
      account: userAddress,
    });

    return buyHash;
  } catch (error) {
    console.error('Erro ao comprar tokens com USDT:', error);
    throw error;
  }
};

// Comprar tokens com MATIC
export const buyTokensWithMatic = async (walletClient, tokenAmount, userAddress) => {
  try {
    const maticAmount = parseEther(tokenAmount) * parseEther(import.meta.env.VITE_ICO_PHASE_1_PRICE || '0.02') / parseEther('1');
    
    const hash = await walletClient.writeContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'buyTokens',
      args: [parseEther(tokenAmount), CONTRACTS.MATIC],
      account: userAddress,
      value: maticAmount,
    });

    return hash;
  } catch (error) {
    console.error('Erro ao comprar tokens com MATIC:', error);
    throw error;
  }
};

// Fazer stake de tokens
export const stakeTokens = async (walletClient, amount, userAddress) => {
  try {
    const hash = await walletClient.writeContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'stake',
      args: [parseEther(amount)],
      account: userAddress,
    });

    return hash;
  } catch (error) {
    console.error('Erro ao fazer stake:', error);
    throw error;
  }
};

// Fazer unstake de tokens
export const unstakeTokens = async (walletClient, amount, userAddress) => {
  try {
    const hash = await walletClient.writeContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'unstake',
      args: [parseEther(amount)],
      account: userAddress,
    });

    return hash;
  } catch (error) {
    console.error('Erro ao fazer unstake:', error);
    throw error;
  }
};

// Reivindicar recompensas
export const claimRewards = async (walletClient, userAddress) => {
  try {
    const hash = await walletClient.writeContract({
      address: CONTRACTS.CFD_TOKEN,
      abi: ABIS.CFD_TOKEN,
      functionName: 'claimRewards',
      args: [],
      account: userAddress,
    });

    return hash;
  } catch (error) {
    console.error('Erro ao reivindicar recompensas:', error);
    throw error;
  }
};

// ===========================================
// FUNÇÕES UTILITÁRIAS
// ===========================================

// Calcular porcentagem de tokens do usuário
export const calculateUserPercentage = async (userAddress) => {
  try {
    const [userBalance, totalSupply] = await Promise.all([
      getCFDBalance(userAddress),
      publicClient.readContract({
        address: CONTRACTS.CFD_TOKEN,
        abi: ABIS.CFD_TOKEN,
        functionName: 'totalSupply',
        args: [],
      }),
    ]);

    const percentage = (parseFloat(userBalance) / parseFloat(formatEther(totalSupply))) * 100;
    return percentage.toFixed(4);
  } catch (error) {
    console.error('Erro ao calcular porcentagem:', error);
    return '0';
  }
};

// Calcular porcentagem de staking
export const calculateStakingPercentage = async (userAddress) => {
  try {
    const [userStaked, totalStaked] = await Promise.all([
      getStakedBalance(userAddress),
      getTotalStaked(),
    ]);

    if (parseFloat(totalStaked) === 0) return '0';
    
    const percentage = (parseFloat(userStaked) / parseFloat(totalStaked)) * 100;
    return percentage.toFixed(4);
  } catch (error) {
    console.error('Erro ao calcular porcentagem de staking:', error);
    return '0';
  }
};

// Verificar se a rede está correta
export const checkNetwork = async (walletClient) => {
  try {
    const chainId = await walletClient.getChainId();
    return chainId === POLYGON_CONFIG.chainId;
  } catch (error) {
    console.error('Erro ao verificar rede:', error);
    return false;
  }
};

// Adicionar rede Polygon à carteira
export const addPolygonNetwork = async (walletClient) => {
  try {
    await walletClient.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: `0x${POLYGON_CONFIG.chainId.toString(16)}`,
        chainName: POLYGON_CONFIG.name,
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: [POLYGON_CONFIG.rpcUrl],
        blockExplorerUrls: [POLYGON_CONFIG.explorerUrl],
      }],
    });
    return true;
  } catch (error) {
    console.error('Erro ao adicionar rede Polygon:', error);
    return false;
  }
};

