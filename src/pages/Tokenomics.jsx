import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Tokenomics = () => {
  const { t } = useTranslation();

  // Dados da distribuição de tokens
  const tokenDistribution = [
    { name: t('tokenomics.distribution.airdrops'), value: 6, color: '#8884d8' },
    { name: t('tokenomics.distribution.donations'), value: 1, color: '#82ca9d' },
    { name: t('tokenomics.distribution.icoPhase1'), value: 12, color: '#ffc658' },
    { name: t('tokenomics.distribution.icoPhase2'), value: 14, color: '#ff8042' },
    { name: t('tokenomics.distribution.team'), value: 20, color: '#0088fe' },
    { name: t('tokenomics.distribution.marketing'), value: 10, color: '#00c49f' },
    { name: t('tokenomics.distribution.advisors'), value: 5, color: '#ffbb28' },
    { name: t('tokenomics.distribution.strategicReserve'), value: 10, color: '#ff8042' },
    { name: t('tokenomics.distribution.liquidity'), value: 22, color: '#a4de6c' },
  ];

  // Dados da distribuição de lucros
  const profitDistribution = [
    { name: 'Holders (Stack)', value: 70, color: '#00FFC8' },
    { name: 'Liquidez', value: 10, color: '#4000FF' },
    { name: 'Operação e Expansão', value: 20, color: '#FFD700' },
    { name: 'Marketing', value: 10, color: '#FF8042' },
  ];

  // Formatador para o tooltip
  const formatTooltip = (value) => `${value}%`;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t('tokenomics.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('tokenomics.tokenInfo.title')}</CardTitle>
            <CardDescription>
              Informações básicas sobre o token CFD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('tokenomics.tokenInfo.name')}</p>
                  <p className="font-semibold">CasinoFound</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('tokenomics.tokenInfo.symbol')}</p>
                  <p className="font-semibold">CFD</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('tokenomics.tokenInfo.totalSupply')}</p>
                  <p className="font-semibold">21.000.000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('tokenomics.tokenInfo.network')}</p>
                  <p className="font-semibold">Polygon (Matic)</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium mb-2">Funcionalidade</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Token de utilidade e participação nos lucros</li>
                  <li>Staking para receber dividendos do casino</li>
                  <li>Governança para decisões futuras do projeto</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Características do Token</CardTitle>
            <CardDescription>
              Principais características e benefícios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold mb-2">Distribuição de Lucros</h3>
                <p className="text-sm text-muted-foreground">
                  70% dos lucros líquidos mensais do casino são distribuídos aos detentores de tokens em stack.
                </p>
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold mb-2">Período de Lock</h3>
                <p className="text-sm text-muted-foreground">
                  Tokens em stack ficam bloqueados por um período mínimo de 30 dias.
                </p>
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold mb-2">Requisitos Mínimos</h3>
                <p className="text-sm text-muted-foreground">
                  Mínimo de 100 tokens CFD para participar da distribuição de lucros.
                </p>
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-semibold mb-2">Pagamentos</h3>
                <p className="text-sm text-muted-foreground">
                  Distribuição de lucros nos dias 1 e 15 de cada mês, em MATIC.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('tokenomics.distribution.title')}</CardTitle>
            <CardDescription>
              Distribuição total de 21.000.000 tokens CFD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tokenDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {tokenDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={formatTooltip} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="border border-border p-2 text-left">Categoria</th>
                      <th className="border border-border p-2 text-left">Percentagem</th>
                      <th className="border border-border p-2 text-left">Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">Airdrops</td>
                      <td className="border border-border p-2">6%</td>
                      <td className="border border-border p-2">1.260.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Doações sociais/ambientais</td>
                      <td className="border border-border p-2">1%</td>
                      <td className="border border-border p-2">210.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">ICO Fase 1</td>
                      <td className="border border-border p-2">12%</td>
                      <td className="border border-border p-2">2.520.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">ICO Fase 2</td>
                      <td className="border border-border p-2">14%</td>
                      <td className="border border-border p-2">2.940.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Equipe & Desenvolvimento</td>
                      <td className="border border-border p-2">20%</td>
                      <td className="border border-border p-2">4.200.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Marketing</td>
                      <td className="border border-border p-2">10%</td>
                      <td className="border border-border p-2">2.100.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Advisors</td>
                      <td className="border border-border p-2">5%</td>
                      <td className="border border-border p-2">1.050.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Reserva Estratégica</td>
                      <td className="border border-border p-2">10%</td>
                      <td className="border border-border p-2">2.100.000</td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Liquidez (DEX/CEX)</td>
                      <td className="border border-border p-2">22%</td>
                      <td className="border border-border p-2">4.620.000</td>
                    </tr>
                    <tr className="bg-primary/10">
                      <td className="border border-border p-2 font-bold">TOTAL</td>
                      <td className="border border-border p-2 font-bold">100%</td>
                      <td className="border border-border p-2 font-bold">21.000.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Lucros</CardTitle>
            <CardDescription>
              Como os lucros do casino são distribuídos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={profitDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {profitDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatTooltip} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm">
                <span className="inline-block w-3 h-3 bg-[#00FFC8] mr-2"></span>
                <strong>70%</strong> - Distribuído aos detentores de tokens em stack
              </p>
              <p className="text-sm">
                <span className="inline-block w-3 h-3 bg-[#4000FF] mr-2"></span>
                <strong>10%</strong> - Reinvestido em liquidez para o token
              </p>
              <p className="text-sm">
                <span className="inline-block w-3 h-3 bg-[#FFD700] mr-2"></span>
                <strong>20%</strong> - Destinado à operação e expansão do casino
              </p>
              <p className="text-sm">
                <span className="inline-block w-3 h-3 bg-[#FF8042] mr-2"></span>
                <strong>10%</strong> - Destinado ao marketing e aquisição de usuários
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vantagens do Staking</CardTitle>
            <CardDescription>
              Benefícios de fazer stack dos tokens CFD
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Renda Passiva</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba dividendos proporcionais à sua participação nos lucros do casino, pagos em MATIC.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pagamentos Regulares</h3>
                  <p className="text-sm text-muted-foreground">
                    Distribuições de lucros nos dias 1 e 15 de cada mês, garantindo fluxo constante de rendimentos.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Valorização do Token</h3>
                  <p className="text-sm text-muted-foreground">
                    À medida que o casino cresce, a demanda pelo token tende a aumentar, potencialmente valorizando o CFD.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-primary font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Participação no Ecossistema</h3>
                  <p className="text-sm text-muted-foreground">
                    Torne-se parte ativa do ecossistema CasinoFound, com direito a voz em decisões futuras.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tokenomics;

