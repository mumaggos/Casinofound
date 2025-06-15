import { useTranslation } from 'react-i18next';
import { useWeb3 } from '../contexts/Web3Context';
import { Button } from './ui/button';
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const WalletButton = ({ className = '' }) => {
  const { t } = useTranslation();
  const { isConnected, address, balance, connect, disconnect } = useWeb3();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Endereço copiado!');
    }
  };

  const openExplorer = () => {
    if (address) {
      window.open(`https://polygonscan.com/address/${address}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <Button 
        onClick={connect} 
        className={`bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold ${className}`}
      >
        <Wallet className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">{t('common.connectWallet')}</span>
        <span className="sm:hidden">Conectar</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`${className}`}>
          <Wallet className="h-4 w-4 mr-2" />
          <div className="flex flex-col items-start">
            <span className="text-xs sm:text-sm font-medium">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Conectado'}
            </span>
            {balance && (
              <span className="text-xs text-muted-foreground hidden sm:block">
                {parseFloat(balance).toFixed(4)} MATIC
              </span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <div className="text-sm font-medium">Carteira Conectada</div>
          <div className="text-xs text-muted-foreground font-mono break-all">
            {address}
          </div>
          {balance && (
            <div className="text-xs text-muted-foreground mt-1">
              Saldo: {parseFloat(balance).toFixed(4)} MATIC
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-2" />
          Copiar Endereço
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openExplorer} className="cursor-pointer">
          <ExternalLink className="h-4 w-4 mr-2" />
          Ver no Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="cursor-pointer text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          {t('common.disconnectWallet')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletButton;

