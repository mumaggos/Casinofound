import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { polygon, polygonMumbai } from 'viem/chains';
import { useSettings } from '../contexts/SettingsContext';

// 1. Define constants
const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// 2. Create wagmiConfig
const metadata = {
  name: 'CasinoFound',
  description: 'CasinoFound - Token CFD na rede Polygon',
  url: 'https://casinofound.me',
  icons: ['https://casinofound.me/favicon.ico']
};

const chains = [polygon, polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
export const web3Modal = createWeb3Modal({ wagmiConfig, projectId, chains });

// 4. Export configuration
export const web3Config = {
  wagmiConfig,
  chains
};

// 5. Contract ABIs
export const tokenABI = [
  // ERC-20 standard functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // Custom functions for CasinoFound token
  "function stake(uint256 amount) returns (bool)",
  "function unstake(uint256 amount) returns (bool)",
  "function stakedBalanceOf(address owner) view returns (uint256)",
  "function totalStaked() view returns (uint256)",
  "function lastStakeTimestamp(address owner) view returns (uint256)",
  "function canUnstake(address owner) view returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Staked(address indexed owner, uint256 amount)",
  "event Unstaked(address indexed owner, uint256 amount)"
];

export const profitDistributorABI = [
  "function distribute() returns (bool)",
  "function claimRewards() returns (uint256)",
  "function pendingRewards(address owner) view returns (uint256)",
  "function lastDistributionTimestamp() view returns (uint256)",
  "function totalDistributed() view returns (uint256)",
  
  // Events
  "event RewardsDistributed(uint256 amount, uint256 timestamp)",
  "event RewardsClaimed(address indexed owner, uint256 amount)"
];

// 6. Helper functions
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance, decimals = 18) => {
  if (!balance) return '0';
  return (Number(balance) / 10 ** decimals).toFixed(2);
};

export const getExplorerUrl = (txHash, chainId = 137) => {
  const baseUrl = chainId === 137 ? 'https://polygonscan.com' : 'https://mumbai.polygonscan.com';
  return `${baseUrl}/tx/${txHash}`;
};

export const getTokenExplorerUrl = (tokenAddress, chainId = 137) => {
  const baseUrl = chainId === 137 ? 'https://polygonscan.com' : 'https://mumbai.polygonscan.com';
  return `${baseUrl}/token/${tokenAddress}`;
};

