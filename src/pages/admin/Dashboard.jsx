import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  BarChart, 
  Users, 
  CreditCard, 
  ArrowUpRight, 
  Calendar, 
  Clock 
} from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { settings } = useSettings();

  // Calcular dias restantes para o lançamento do casino
  const calculateDaysRemaining = () => {
    const launchDate = new Date(settings.casinoLaunchDate);
    const today = new Date();
    const diffTime = launchDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Determinar a fase atual da ICO
  const getCurrentPhase = () => {
    return settings.icoPhase;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t('admin.dashboard')}</h1>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Fase da ICO
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Fase {getCurrentPhase()}</div>
                <p className="text-xs text-muted-foreground">
                  {getCurrentPhase() === 1 ? '$0.02 por token' : '$0.10 por token'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dias para Lançamento
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateDaysRemaining()}</div>
                <p className="text-xs text-muted-foreground">
                  Lançamento em {new Date(settings.casinoLaunchDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Usuários
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +180
                  </span>{" "}
                  desde a última semana
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tokens Vendidos
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2M</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +19%
                  </span>{" "}
                  do total
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visão Geral</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-md">
                  <p className="text-muted-foreground">Gráfico de vendas de tokens</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>
                  Últimas 5 transações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Compra de Tokens
                        </p>
                        <p className="text-xs text-muted-foreground">
                          0x1a2...3b4c • {1000 * i} CFD
                        </p>
                      </div>
                      <div className="ml-auto text-xs text-muted-foreground">
                        {i}h atrás
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises</CardTitle>
              <CardDescription>
                Dados detalhados sobre vendas e usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border border-dashed border-border rounded-md m-6">
              <p className="text-muted-foreground">Conteúdo de análises será exibido aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>
                Relatórios detalhados sobre o desempenho do projeto
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border border-dashed border-border rounded-md m-6">
              <p className="text-muted-foreground">Conteúdo de relatórios será exibido aqui</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

