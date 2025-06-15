import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Whitepaper = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t('whitepaper.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-20">
            <Tabs defaultValue="introduction" orientation="vertical" className="w-full">
              <TabsList className="flex flex-col h-auto w-full bg-card p-0 border border-border rounded-md">
                <TabsTrigger value="introduction" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.introduction')}
                </TabsTrigger>
                <TabsTrigger value="token-overview" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.tokenOverview')}
                </TabsTrigger>
                <TabsTrigger value="token-distribution" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.tokenDistribution')}
                </TabsTrigger>
                <TabsTrigger value="profit-distribution" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.profitDistribution')}
                </TabsTrigger>
                <TabsTrigger value="eligibility" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.eligibility')}
                </TabsTrigger>
                <TabsTrigger value="technology" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.technology')}
                </TabsTrigger>
                <TabsTrigger value="smart-contracts" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.smartContracts')}
                </TabsTrigger>
                <TabsTrigger value="online-casino" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.onlineCasino')}
                </TabsTrigger>
                <TabsTrigger value="licensing" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.licensing')}
                </TabsTrigger>
                <TabsTrigger value="team" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.team')}
                </TabsTrigger>
                <TabsTrigger value="value-proposition" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.valueProposition')}
                </TabsTrigger>
                <TabsTrigger value="risks" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.risks')}
                </TabsTrigger>
                <TabsTrigger value="conclusion" className="justify-start px-4 py-3 data-[state=active]:bg-primary/10">
                  {t('whitepaper.conclusion')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="introduction" className="w-full">
                <TabsContent value="introduction" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.introduction')}</h2>
                  <p className="mb-4">
                    CasinoFound é uma criptomoeda baseada na rede Polygon (Matic), criada para financiar o lançamento e a operação de um casino online inovador. Através do token CFD, os detentores participam dos lucros do casino em polygon, recebendo dividendos proporcionais à quantidade de tokens que possuem em Stack.
                  </p>
                </TabsContent>
                
                <TabsContent value="token-overview" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.tokenOverview')}</h2>
                  <div className="space-y-2 mb-4">
                    <p><strong>Nome:</strong> CasinoFound</p>
                    <p><strong>Símbolo:</strong> CFD</p>
                    <p><strong>Total Supply:</strong> 21.000.000 tokens</p>
                    <p><strong>Rede:</strong> Polygon (Matic)</p>
                    <p><strong>Funcionalidade:</strong> Token de utilidade e participação nos lucros</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="token-distribution" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.tokenDistribution')}</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-primary/10">
                          <th className="border border-border p-2 text-left">Categoria</th>
                          <th className="border border-border p-2 text-left">Percentagem</th>
                          <th className="border border-border p-2 text-left">Quantidade</th>
                          <th className="border border-border p-2 text-left">Detalhes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-2">Airdrops</td>
                          <td className="border border-border p-2">6%</td>
                          <td className="border border-border p-2">1.260.000</td>
                          <td className="border border-border p-2">Promoções e recompensas à comunidade</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Doações sociais/ambientais</td>
                          <td className="border border-border p-2">1%</td>
                          <td className="border border-border p-2">210.000</td>
                          <td className="border border-border p-2">Responsabilidade social e ambiental</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">ICO Fase 1</td>
                          <td className="border border-border p-2">12%</td>
                          <td className="border border-border p-2">2.520.000</td>
                          <td className="border border-border p-2">$0,02 por token</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">ICO Fase 2</td>
                          <td className="border border-border p-2">14%</td>
                          <td className="border border-border p-2">2.940.000</td>
                          <td className="border border-border p-2">$0,10 por token</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Equipe & Desenvolvimento</td>
                          <td className="border border-border p-2">20%</td>
                          <td className="border border-border p-2">4.200.000</td>
                          <td className="border border-border p-2">Lock-up de 1 ano (manual no contrato)</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Marketing</td>
                          <td className="border border-border p-2">10%</td>
                          <td className="border border-border p-2">2.100.000</td>
                          <td className="border border-border p-2">Divulgação e campanhas</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Advisors</td>
                          <td className="border border-border p-2">5%</td>
                          <td className="border border-border p-2">1.050.000</td>
                          <td className="border border-border p-2">Consultores estratégicos</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Reserva Estratégica</td>
                          <td className="border border-border p-2">10%</td>
                          <td className="border border-border p-2">2.100.000</td>
                          <td className="border border-border p-2">Parcerias futuras, fundos de emergência</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Liquidez (DEX/CEX)</td>
                          <td className="border border-border p-2">22%</td>
                          <td className="border border-border p-2">4.620.000</td>
                          <td className="border border-border p-2">Listagens iniciais, pools e suporte de mercado</td>
                        </tr>
                        <tr className="bg-primary/10">
                          <td className="border border-border p-2 font-bold">TOTAL</td>
                          <td className="border border-border p-2 font-bold">100%</td>
                          <td className="border border-border p-2 font-bold">21.000.000</td>
                          <td className="border border-border p-2"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="profit-distribution" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.profitDistribution')}</h2>
                  <p className="mb-4">
                    O modelo de negócio do CasinoFound é baseado na distribuição dos lucros do casino online para os detentores de tokens que os coloquem em stack. A distribuição será feita da seguinte forma:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>70% dos lucros líquidos mensais do casino serão distribuídos aos detentores que colocarem os tokens em stack por pelo menos um período de 30 dias, receberam a cada dia 1 e dia 15 de cada mês o valor em polygon (matic)</li>
                    <li>10% dos lucros serão reinvestidos em liquidez para o token</li>
                    <li>20% dos lucros serão destinados à operação e expansão do casino (ex: licenças para operar em mais países)</li>
                    <li>10% dos lucros serão destinados ao marketing e aquisição de novos usuários</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="eligibility" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.eligibility')}</h2>
                  <p className="mb-4">
                    Para ser elegível para receber a distribuição mensal de lucros, os detentores devem:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Manter seus tokens em uma carteira não-custodial e fazer stack (não em exchanges)</li>
                    <li>Possuir no mínimo 100 tokens CFD</li>
                    <li>Manter os tokens por pelo menos 30 dias (só é possível fazer unstack ao final de 30 dias)</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="technology" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.technology')}</h2>
                  <p className="mb-4">
                    O CasinoFound é construído sobre a rede Polygon (Matic), escolhida por suas vantagens:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Baixas taxas de transação</li>
                    <li>Alta velocidade de processamento</li>
                    <li>Compatibilidade com Ethereum</li>
                    <li>Escalabilidade para suportar grande volume de transações</li>
                    <li>Segurança robusta</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="smart-contracts" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.smartContracts')}</h2>
                  <p className="mb-4">
                    O projeto utiliza dois contratos inteligentes principais:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>CasinoFoundToken:</strong> Implementa o padrão ERC-20 com funcionalidades adicionais para rastreamento de detentores elegíveis para distribuição de lucros e mecanismos de lock-up para tokens da equipe e advisors.</li>
                    <li><strong>CasinoFoundProfitDistributor:</strong> Gerencia a distribuição mensal de lucros em polygon (matic) para os detentores de tokens CFD que fizerem stack dos mesmos, calculando automaticamente os valores proporcionais com base na quantidade de tokens e período de detenção.</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="online-casino" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.onlineCasino')}</h2>
                  <p className="mb-4">
                    O casino online financiado pelo CasinoFound oferecerá:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Jogos de casino tradicionais (roleta, blackjack, poker, slots)</li>
                    <li>Apostas esportivas</li>
                    <li>Jogos exclusivos baseados em blockchain</li>
                    <li>Suporte a depósitos em criptomoedas e moedas fiat</li>
                    <li>Programa de fidelidade integrado com o ecossistema CFD</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="licensing" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.licensing')}</h2>
                  <p className="mb-4">
                    O casino operará com licenças de jogos de azar reconhecidas internacionalmente, garantindo:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Operação legal em múltiplas jurisdições</li>
                    <li>Jogos verificáveis e justos</li>
                    <li>Proteção ao jogador</li>
                    <li>Conformidade com regulamentações AML (Anti-Money Laundering) e KYC (Know Your Customer)</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="team" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.team')}</h2>
                  <p className="mb-4">
                    O CasinoFound é desenvolvido por uma equipe experiente com backgrounds em blockchain, desenvolvimento de software, operações de casino online, marketing e finanças. A equipe é composta por profissionais com experiência em projetos de criptomoedas bem-sucedidos e operações de jogos de azar online.
                  </p>
                </TabsContent>
                
                <TabsContent value="value-proposition" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.valueProposition')}</h2>
                  <p className="mb-4">
                    CasinoFound une o crescimento de um mercado tradicional (casinos online) com a inovação do ecossistema cripto, oferecendo uma oportunidade real de ganhos passivos e participação direta no sucesso do negócio.
                  </p>
                </TabsContent>
                
                <TabsContent value="risks" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.risks')}</h2>
                  <p className="mb-4">
                    Como qualquer investimento em criptomoedas e negócios, o CasinoFound apresenta riscos que devem ser considerados:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Riscos Regulatórios:</strong> Mudanças na regulamentação de jogos de azar online ou criptomoedas podem afetar o projeto. Mitigação: Operação em múltiplas jurisdições e adaptação contínua às mudanças regulatórias.</li>
                    <li><strong>Riscos de Mercado:</strong> Volatilidade do mercado de criptomoedas. Mitigação: Distribuição de lucros em matic, recomendado vender numa dex/cex logo após a distribuição devido à volatilidade do token.</li>
                    <li><strong>Riscos Operacionais:</strong> Desafios na operação do casino online. Mitigação: Equipe experiente e parcerias com provedores estabelecidos de jogos e soluções de pagamento.</li>
                    <li><strong>Riscos de Segurança:</strong> Vulnerabilidades em smart contracts ou na plataforma do casino. Mitigação: Auditorias regulares de segurança e implementação das melhores práticas de segurança cibernética.</li>
                  </ul>
                </TabsContent>
                
                <TabsContent value="conclusion" className="mt-0">
                  <h2 className="text-2xl font-bold mb-4">{t('whitepaper.conclusion')}</h2>
                  <p className="mb-4">
                    CasinoFound representa uma inovação na interseção entre o mercado de jogos de azar online e a tecnologia blockchain, oferecendo um modelo de negócio transparente e participativo. Ao permitir que os detentores de tokens participem diretamente dos lucros do casino, o projeto cria um alinhamento de interesses entre a plataforma e sua comunidade.
                  </p>
                  <p className="mb-4">
                    Com uma distribuição estratégica de tokens, um roadmap claro e uma proposta de valor única, o CasinoFound está posicionado para se tornar um caso de uso bem-sucedido de tokenização e participação nos lucros no ecossistema cripto.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;

