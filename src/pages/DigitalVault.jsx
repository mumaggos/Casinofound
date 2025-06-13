import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWeb3 } from '../contexts/Web3Context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Wallet, Coins, TrendingUp, Lock, Unlock, Info, DollarSign } from 'lucide-react';
import WalletButton from '../components/WalletButton';

const DigitalVault = () => {
  const { t } = useTranslation();
  const { isConnected, address, balance, tokenBalance, stakedBalance } = useWeb3();
  const [buyAmount, setBuyAmount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('usdt');

  const handleBuyTokens = async () => {
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      alert('Por favor, insira uma quantidade válida');
      return;
    }
    
    try {
      // Aqui seria implementada a lógica de compra
      alert(`Comprando ${buyAmount} tokens CFD com ${selectedPayment.toUpperCase()}`);
    } catch (error) {
      console.error('Erro ao comprar tokens:', error);
      alert('Erro ao comprar tokens. Tente novamente.');
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Por favor, insira uma quantidade válida para stake');
      return;
    }
    
    try {
      // Aqui seria implementada a lógica de stake
      alert(`Fazendo stake de ${stakeAmount} tokens CFD`);
    } catch (error) {
      console.error('Erro ao fazer stake:', error);
      alert('Erro ao fazer stake. Tente novamente.');
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      alert('Por favor, insira uma quantidade válida para unstake');
      return;
    }
    
    try {
      // Aqui seria implementada a lógica de unstake
      alert(`Fazendo unstake de ${unstakeAmount} tokens CFD`);
    } catch (error) {
      console.error('Erro ao fazer unstake:', error);
      alert('Erro ao fazer unstake. Tente novamente.');
    }
  };

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-6 sm:p-8 lg:p-12">
            <div className="mb-6">
              <Wallet className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-primary mb-4" />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{t('digitalVault.title')}</h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                {t('digitalVault.connectFirst')}
              </p>
            </div>
            <WalletButton className="w-full sm:w-auto mx-auto" />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Wallet className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            {t('digitalVault.title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Gerencie seus tokens CFD, faça stake e acompanhe seus dividendos
          </p>
        </div>

        {/* Wallet Info */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              {t('digitalVault.walletInfo.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card/50 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground mb-1">{t('digitalVault.walletInfo.address')}</div>
                <div className="text-sm font-mono break-all">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
                </div>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground mb-1">MATIC {t('digitalVault.walletInfo.balance')}</div>
                <div className="text-lg font-semibold">{balance || '0.00'}</div>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground mb-1">Tokens CFD</div>
                <div className="text-lg font-semibold text-primary">{tokenBalance || '0.00'}</div>
              </div>
              <div className="bg-card/50 p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground mb-1">Em Stake</div>
                <div className="text-lg font-semibold text-green-500">{stakedBalance || '0.00'}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Buy Tokens Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                {t('digitalVault.buyTokens.title')}
              </CardTitle>
              <CardDescription>
                Compre tokens CFD com USDT ou MATIC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedPayment === 'usdt' ? 'default' : 'outline'}
                  onClick={() => setSelectedPayment('usdt')}
                  className="w-full"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  USDT
                </Button>
                <Button
                  variant={selectedPayment === 'matic' ? 'default' : 'outline'}
                  onClick={() => setSelectedPayment('matic')}
                  className="w-full"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  MATIC
                </Button>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('digitalVault.buyTokens.amount')}</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Price Info */}
              <div className="bg-card/50 p-3 rounded-lg border space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('digitalVault.buyTokens.price')}:</span>
                  <span className="font-semibold">$0.02 por CFD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('digitalVault.buyTokens.total')}:</span>
                  <span className="font-semibold">
                    {buyAmount ? (parseFloat(buyAmount) * 0.02).toFixed(2) : '0.00'} {selectedPayment.toUpperCase()}
                  </span>
                </div>
              </div>

              <Button onClick={handleBuyTokens} className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold">
                <Coins className="h-4 w-4 mr-2" />
                {t('digitalVault.buyTokens.buy')}
              </Button>
            </CardContent>
          </Card>

          {/* Staking Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                {t('digitalVault.stackArea.title')}
              </CardTitle>
              <CardDescription>
                {t('digitalVault.stackArea.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stake" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Stake
                  </TabsTrigger>
                  <TabsTrigger value="unstake" className="flex items-center gap-2">
                    <Unlock className="h-4 w-4" />
                    Unstake
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="stake" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('digitalVault.stackArea.amountToStack')}</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Tokens em stake ficam bloqueados por 30 dias e geram dividendos proporcionais.
                    </AlertDescription>
                  </Alert>
                  
                  <Button onClick={handleStake} className="w-full bg-[#00FFC8] hover:bg-[#00FFC8]/90 text-black font-semibold">
                    <Lock className="h-4 w-4 mr-2" />
                    {t('digitalVault.stackArea.stackButton')}
                  </Button>
                </TabsContent>
                
                <TabsContent value="unstake" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('digitalVault.stackArea.amountToUnstack')}</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      Apenas tokens que completaram o período de 30 dias podem ser retirados.
                    </AlertDescription>
                  </Alert>
                  
                  <Button onClick={handleUnstake} variant="outline" className="w-full">
                    <Unlock className="h-4 w-4 mr-2" />
                    {t('digitalVault.stackArea.unstackButton')}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Token Info */}
        <Card className="mt-6 sm:mt-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('digitalVault.tokenInfo.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-card/50 rounded-lg border">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                  {stakedBalance && tokenBalance ? 
                    ((parseFloat(stakedBalance) / parseFloat(tokenBalance)) * 100).toFixed(1) : '0.0'}%
                </div>
                <div className="text-sm text-muted-foreground">{t('digitalVault.tokenInfo.stackPercentage')}</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg border">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                  {tokenBalance ? ((parseFloat(tokenBalance) / 21000000) * 100).toFixed(4) : '0.0000'}%
                </div>
                <div className="text-sm text-muted-foreground">{t('digitalVault.tokenInfo.totalPercentage')}</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg border">
                <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-2">$0.00</div>
                <div className="text-sm text-muted-foreground">Dividendos Acumulados</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg border">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2">5.2%</div>
                <div className="text-sm text-muted-foreground">APY Estimado</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalVault;

