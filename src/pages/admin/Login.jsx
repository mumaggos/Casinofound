import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWeb3 } from '../../contexts/Web3Context';
import { useAdmin } from '../../contexts/AdminContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import WalletButton from '../../components/WalletButton';

const AdminLogin = () => {
  const { t } = useTranslation();
  const { isConnected, address, formatAddress } = useWeb3();
  const { isAdmin, isLoading, accessAdmin } = useAdmin();
  const navigate = useNavigate();
  
  // Se já estiver autenticado como admin, redirecionar para o dashboard
  useEffect(() => {
    if (isConnected && isAdmin && !isLoading) {
      navigate('/admin/dashboard');
    }
  }, [isConnected, isAdmin, isLoading, navigate]);
  
  const handleAccessAdmin = () => {
    accessAdmin();
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t('admin.login.title')}</CardTitle>
          <CardDescription>
            {t('admin.login.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-4">
              <p className="mb-4 text-muted-foreground">
                {t('admin.login.connectWallet')}
              </p>
              <WalletButton size="lg" className="w-full" />
            </div>
          ) : !isAdmin ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t('admin.login.accessDenied')}</AlertTitle>
              <AlertDescription>
                {t('admin.login.notAdmin', { address: formatAddress(address) })}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-primary/10 border-primary">
              <Shield className="h-4 w-4 text-primary" />
              <AlertTitle>{t('admin.login.accessGranted')}</AlertTitle>
              <AlertDescription>
                {t('admin.login.welcomeAdmin')}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          {isConnected && (
            <div className="w-full space-y-2">
              <Button 
                className="w-full" 
                onClick={handleAccessAdmin}
                disabled={!isAdmin}
              >
                {t('admin.login.accessPanel')}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/')}
              >
                {t('common.backToHome')}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;

