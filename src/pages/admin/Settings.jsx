import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Save, Settings, Wallet, Database, RefreshCw } from 'lucide-react';

const AdminSettings = () => {
  const { t } = useTranslation();
  const { settings, updateSettings, resetSettings } = useSettings();
  const [formData, setFormData] = useState({ ...settings });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    try {
      updateSettings(formData);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      alert('Erro ao salvar configurações: ' + error.message);
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todas as configurações?')) {
      resetSettings();
      setFormData({ ...settings });
      alert('Configurações resetadas com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Configurações do Sistema
        </h1>
        <p className="text-muted-foreground">
          Configure os parâmetros do site e integração com blockchain
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">Blockchain</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Banco de Dados</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas do site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={formData.siteName || ''}
                    onChange={handleChange}
                    placeholder="CasinoFound"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">URL do Site</Label>
                  <Input
                    id="siteUrl"
                    name="siteUrl"
                    value={formData.siteUrl || ''}
                    onChange={handleChange}
                    placeholder="https://casinofound.com"
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="adminWallet">Carteira do Administrador</Label>
                <Input
                  id="adminWallet"
                  name="adminWallet"
                  value={formData.adminWallet || ''}
                  onChange={handleChange}
                  placeholder="0x..."
                />
                <p className="text-sm text-muted-foreground">
                  Apenas esta carteira terá acesso ao painel administrativo
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Blockchain</CardTitle>
              <CardDescription>
                Configure os contratos inteligentes e parâmetros da blockchain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tokenContract">Endereço do Contrato do Token</Label>
                <Input
                  id="tokenContract"
                  name="tokenContract"
                  value={formData.tokenContract || ''}
                  onChange={handleChange}
                  placeholder="0x..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="stakingContract">Endereço do Contrato de Staking</Label>
                <Input
                  id="stakingContract"
                  name="stakingContract"
                  value={formData.stakingContract || ''}
                  onChange={handleChange}
                  placeholder="0x..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="usdtContract">Endereço do USDT</Label>
                  <Input
                    id="usdtContract"
                    name="usdtContract"
                    value={formData.usdtContract || ''}
                    onChange={handleChange}
                    placeholder="0x..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maticContract">Endereço do MATIC</Label>
                  <Input
                    id="maticContract"
                    name="maticContract"
                    value={formData.maticContract || ''}
                    onChange={handleChange}
                    placeholder="0x..."
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenPrice">Preço do Token (USD)</Label>
                  <Input
                    id="tokenPrice"
                    name="tokenPrice"
                    type="number"
                    step="0.001"
                    value={formData.tokenPrice || ''}
                    onChange={handleChange}
                    placeholder="0.02"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minPurchase">Compra Mínima</Label>
                  <Input
                    id="minPurchase"
                    name="minPurchase"
                    type="number"
                    value={formData.minPurchase || ''}
                    onChange={handleChange}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxPurchase">Compra Máxima</Label>
                  <Input
                    id="maxPurchase"
                    name="maxPurchase"
                    type="number"
                    value={formData.maxPurchase || ''}
                    onChange={handleChange}
                    placeholder="100000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Banco de Dados</CardTitle>
              <CardDescription>
                Configure a conexão com o banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dbHost">Host do Banco</Label>
                  <Input
                    id="dbHost"
                    name="dbHost"
                    value={formData.dbHost || ''}
                    onChange={handleChange}
                    placeholder="localhost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbPort">Porta</Label>
                  <Input
                    id="dbPort"
                    name="dbPort"
                    type="number"
                    value={formData.dbPort || ''}
                    onChange={handleChange}
                    placeholder="5432"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dbName">Nome do Banco</Label>
                  <Input
                    id="dbName"
                    name="dbName"
                    value={formData.dbName || ''}
                    onChange={handleChange}
                    placeholder="casinofound"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbUser">Usuário</Label>
                  <Input
                    id="dbUser"
                    name="dbUser"
                    value={formData.dbUser || ''}
                    onChange={handleChange}
                    placeholder="admin"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dbPassword">Senha</Label>
                <Input
                  id="dbPassword"
                  name="dbPassword"
                  type="password"
                  value={formData.dbPassword || ''}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleSave} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1">
          <RefreshCw className="h-4 w-4 mr-2" />
          Resetar Configurações
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;

