import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWeb3 } from '../contexts/Web3Context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Separator } from '../components/ui/separator';
import { 
  Wallet, 
  TrendingUp, 
  Lock, 
  Unlock, 
  Gift, 
  DollarSign, 
  Coins,
  PieChart,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { saveTransaction, saveStakingEvent, getUserTransactions, getUserStakingHistory } from '../lib/supabase';

const DigitalVault = () => {
  const { t } = useTranslation();
  const { 
    isConnected, 
    address, 
    balances, 
    stakingInfo, 
    icoInfo, 
    loading, 
    connectWallet, 
    buyTokens, 
    stake, 
    unstake, 
    claim,
    formatAddress,
    formatNumber,
    updateWalletData
  } = useWeb3();

  const [buyAmount, setBuyAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('usdt');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [stakingHistory, setStakingHistory] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  // Carregar histórico quando conectar
  useEffect(() => {
    if (isConnected && address) {
      loadUserHistory();
    }
  }, [isConnected, address]);

  const loadUserHistory = async () => {
    try {
      const [txHistory, stakingHist] = await Promise.all([
        getUserTransactions(address),
        getUserStakingHistory(address)
      ]);
      setTransactions(txHistory);
      setStakingHistory(stakingHist);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
  };

  const handleBuyTokens = async () => {
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      showAlert('error', 'Por favor, insira um valor válido');
      return;
    }

    try {
      const hash = await buyTokens(buyAmount, paymentMethod);
      
      // Salvar transação no banco
      await saveTransaction({
        wallet_address: address,
        type: 'buy',
        amount: buyAmount,
        payment_method: paymentMethod,
        transaction_hash: hash,
        status: 'completed'
      });

      showAlert('success', `Compra realizada com sucesso! Hash: ${hash.slice(0, 10)}...`);
      setBuyAmount('');
      await loadUserHistory();
    } catch (error) {
      console.error('Erro na compra:', error);
      showAlert('error', `Erro na compra: ${error.message}`);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      showAlert('error', 'Por favor, insira um valor válido para stake');
      return;
    }

    if (parseFloat(stakeAmount) < 100) {
      showAlert('error', 'Valor mínimo para stake é 100 CFD');
      return;
    }

    if (parseFloat(stakeAmount) > parseFloat(balances.cfd)) {
      showAlert('error', 'Saldo insuficiente');
      return;
    }

    try {
      const hash = await stake(stakeAmount);
      
      // Salvar evento de staking
      await saveStakingEvent({
        wallet_address: address,
        type: 'stake',
        amount: stakeAmount,
        transaction_hash: hash,
        status: 'completed'
      });

      showAlert('success', `Stake realizado com sucesso! Hash: ${hash.slice(0, 10)}...`);
      setStakeAmount('');
      await loadUserHistory();
    } catch (error) {
      console.error('Erro no stake:', error);
      showAlert('error', `Erro no stake: ${error.message}`);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) {
      showAlert('error', 'Por favor, insira um valor válido para unstake');
      return;
    }

    if (parseFloat(unstakeAmount) > parseFloat(balances.staked)) {
      showAlert('error', 'Valor maior que o saldo em stake');
      return;
    }

    if (!stakingInfo.canUnstake) {
      showAlert('error', 'Você deve aguardar 30 dias para fazer unstake');
      return;
    }

    try {
      const hash = await unstake(unstakeAmount);
      
      // Salvar evento de unstaking
      await saveStakingEvent({
        wallet_address: address,
        type: 'unstake',
        amount: unstakeAmount,
        transaction_hash: hash,
        status: 'completed'
      });

      showAlert('success', `Unstake realizado com sucesso! Hash: ${hash.slice(0, 10)}...`);
      setUnstakeAmount('');
      await loadUserHistory();
    } catch (error) {
      console.error('Erro no unstake:', error);
      showAlert('error', `Erro no unstake: ${error.message}`);
    }
  };

  const handleClaimRewards = async () => {
    if (parseFloat(stakingInfo.pendingRewards) <= 0) {
      showAlert('error', 'Não há recompensas para reivindicar');
      return;
    }

    try {
      const hash = await claim();
      
      // Salvar evento de claim
      await saveStakingEvent({
        wallet_address: address,
        type: 'claim',
        amount: stakingInfo.pendingRewards,
        transaction_hash: hash,
        status: 'completed'
      });

      showAlert('success', `Recompensas reivindicadas com sucesso! Hash: ${hash.slice(0, 10)}...`);
      await loadUserHistory();
    } catch (error) {
      console.error('Erro ao reivindicar:', error);
      showAlert('error', `Erro ao reivindicar: ${error.message}`);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl text-white">Cofre Digital</CardTitle>
            <CardDescription className="text-gray-400">
              Conecte sua carteira para acessar o cofre digital e gerenciar seus tokens CFD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={connectWallet} 
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Conectar Carteira
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cofre Digital</h1>
          <p className="text-gray-400">Gerencie seus tokens CFD e participe do staking</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Conectado: {formatAddress(address)}</span>
          </div>
        </div>

        {/* Alert */}
        {alert.show && (
          <Alert className={`mb-6 ${alert.type === 'error' ? 'border-red-500 bg-red-500/10' : 'border-green-500 bg-green-500/10'}`}>
            {alert.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            <AlertDescription className={alert.type === 'error' ? 'text-red-400' : 'text-green-400'}>
              {alert.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Saldos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400 flex items-center gap-2">
                <Coins className="w-4 h-4" />
                Tokens CFD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(balances.cfd)}</div>
              <p className="text-xs text-gray-400 mt-1">{stakingInfo.userPercentage}% do total</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-400 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Em Staking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(balances.staked)}</div>
              <p className="text-xs text-gray-400 mt-1">{stakingInfo.stakingPercentage}% do pool</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-400 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                USDT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(balances.usdt)}</div>
              <p className="text-xs text-gray-400 mt-1">Saldo disponível</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-400 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Recompensas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatNumber(stakingInfo.pendingRewards)}</div>
              <p className="text-xs text-gray-400 mt-1">MATIC pendente</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="buy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="buy" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
              Comprar
            </TabsTrigger>
            <TabsTrigger value="stake" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              Staking
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              Recompensas
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Comprar Tokens */}
          <TabsContent value="buy">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  Comprar Tokens CFD
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Fase {icoInfo.phase} da ICO - Preço: ${icoInfo.price} por token
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyAmount" className="text-white">Quantidade de Tokens</Label>
                    <Input
                      id="buyAmount"
                      type="number"
                      placeholder="Ex: 1000"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Método de Pagamento</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={paymentMethod === 'usdt' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('usdt')}
                        className="flex-1"
                      >
                        USDT
                      </Button>
                      <Button
                        variant={paymentMethod === 'matic' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('matic')}
                        className="flex-1"
                      >
                        MATIC
                      </Button>
                    </div>
                  </div>
                </div>
                
                {buyAmount && (
                  <div className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tokens:</span>
                      <span className="text-white">{formatNumber(buyAmount)} CFD</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Preço unitário:</span>
                      <span className="text-white">${icoInfo.price}</span>
                    </div>
                    <Separator className="my-2 bg-gray-600" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-400">Total:</span>
                      <span className="text-yellow-400">
                        {formatNumber(parseFloat(buyAmount || 0) * parseFloat(icoInfo.price))} {paymentMethod.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleBuyTokens} 
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold"
                  disabled={loading || !buyAmount}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    `Comprar ${buyAmount || '0'} CFD`
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staking */}
          <TabsContent value="stake">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fazer Stake */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-400" />
                    Fazer Stake
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Mínimo: 100 CFD | Período de lock: 30 dias
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stakeAmount" className="text-white">Quantidade para Stake</Label>
                    <Input
                      id="stakeAmount"
                      type="number"
                      placeholder="Mínimo 100 CFD"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Disponível: {formatNumber(balances.cfd)} CFD</span>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setStakeAmount(balances.cfd)}
                        className="h-auto p-0 text-yellow-400"
                      >
                        Usar máximo
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-700/50 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Benefícios do Staking:</span>
                    </div>
                    <ul className="text-xs text-gray-300 space-y-1 ml-6">
                      <li>• 70% dos lucros do casino distribuídos</li>
                      <li>• Pagamentos nos dias 1 e 15 de cada mês</li>
                      <li>• Recompensas em MATIC</li>
                      <li>• Participação proporcional aos tokens em stake</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleStake} 
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-semibold"
                    disabled={loading || !stakeAmount || parseFloat(stakeAmount) < 100}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      `Fazer Stake de ${stakeAmount || '0'} CFD`
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Fazer Unstake */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-red-400" />
                    Fazer Unstake
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {stakingInfo.canUnstake ? 'Disponível para unstake' : 'Aguarde 30 dias após o stake'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="unstakeAmount" className="text-white">Quantidade para Unstake</Label>
                    <Input
                      id="unstakeAmount"
                      type="number"
                      placeholder="Quantidade a retirar"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      disabled={!stakingInfo.canUnstake}
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Em stake: {formatNumber(balances.staked)} CFD</span>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setUnstakeAmount(balances.staked)}
                        className="h-auto p-0 text-yellow-400"
                        disabled={!stakingInfo.canUnstake}
                      >
                        Usar máximo
                      </Button>
                    </div>
                  </div>

                  {!stakingInfo.canUnstake && (
                    <Alert className="border-yellow-500 bg-yellow-500/10">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <AlertDescription className="text-yellow-400">
                        Você deve aguardar 30 dias após fazer stake para poder fazer unstake.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    onClick={handleUnstake} 
                    className="w-full bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold"
                    disabled={loading || !unstakeAmount || !stakingInfo.canUnstake}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      `Fazer Unstake de ${unstakeAmount || '0'} CFD`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Recompensas */}
          <TabsContent value="rewards">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-400" />
                  Recompensas de Staking
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Reivindique suas recompensas em MATIC dos lucros do casino
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{formatNumber(stakingInfo.pendingRewards)}</div>
                    <div className="text-sm text-gray-400">MATIC Pendente</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{stakingInfo.stakingPercentage}%</div>
                    <div className="text-sm text-gray-400">Do Pool Total</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">{formatNumber(balances.staked)}</div>
                    <div className="text-sm text-gray-400">CFD em Stake</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <PieChart className="w-4 h-4" />
                    Como Funcionam as Recompensas
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 70% dos lucros líquidos do casino são distribuídos</li>
                    <li>• Distribuição proporcional aos tokens em stake</li>
                    <li>• Pagamentos automáticos nos dias 1 e 15 de cada mês</li>
                    <li>• Recompensas pagas em MATIC (Polygon)</li>
                    <li>• Mínimo de 30 dias de stake para ser elegível</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleClaimRewards} 
                  className="w-full bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-semibold"
                  disabled={loading || parseFloat(stakingInfo.pendingRewards) <= 0}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    `Reivindicar ${formatNumber(stakingInfo.pendingRewards)} MATIC`
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Histórico */}
          <TabsContent value="history">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Histórico de Transações */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Histórico de Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {transactions.length > 0 ? (
                      transactions.map((tx, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div>
                              <div className="text-white font-medium">Compra de Tokens</div>
                              <div className="text-xs text-gray-400">
                                {new Date(tx.created_at).toLocaleDateString('pt-PT')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">+{formatNumber(tx.amount)} CFD</div>
                            <div className="text-xs text-gray-400">{tx.payment_method.toUpperCase()}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        Nenhuma transação encontrada
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Histórico de Staking */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Histórico de Staking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {stakingHistory.length > 0 ? (
                      stakingHistory.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              event.type === 'stake' ? 'bg-green-500/20' : 
                              event.type === 'unstake' ? 'bg-red-500/20' : 'bg-purple-500/20'
                            }`}>
                              {event.type === 'stake' ? (
                                <Lock className="w-4 h-4 text-green-400" />
                              ) : event.type === 'unstake' ? (
                                <Unlock className="w-4 h-4 text-red-400" />
                              ) : (
                                <Gift className="w-4 h-4 text-purple-400" />
                              )}
                            </div>
                            <div>
                              <div className="text-white font-medium capitalize">{event.type}</div>
                              <div className="text-xs text-gray-400">
                                {new Date(event.created_at).toLocaleDateString('pt-PT')}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${
                              event.type === 'stake' ? 'text-green-400' : 
                              event.type === 'unstake' ? 'text-red-400' : 'text-purple-400'
                            }`}>
                              {event.type === 'stake' ? '+' : event.type === 'unstake' ? '-' : '+'}
                              {formatNumber(event.amount)} {event.type === 'claim' ? 'MATIC' : 'CFD'}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        Nenhum evento de staking encontrado
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DigitalVault;

