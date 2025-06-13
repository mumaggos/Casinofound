import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle2, Circle } from 'lucide-react';

const Roadmap = () => {
  const { t } = useTranslation();

  // Dados do roadmap
  const roadmapData = [
    {
      period: t('roadmap.q32025'),
      items: [
        { text: 'Concepção do projeto e formação da equipe', completed: true },
        { text: 'Desenvolvimento inicial do smart contract do token CFD na rede Polygon', completed: true },
        { text: 'Planejamento do white paper e estrutura da ICO', completed: true },
        { text: 'Desenvolvimento do website para pré-venda e divulgação', completed: true }
      ]
    },
    {
      period: t('roadmap.q42025'),
      items: [
        { text: 'Auditoria completa dos smart contracts', completed: false },
        { text: 'Implementação do sistema de distribuição de lucros via USDT', completed: false },
        { text: 'Início da pré-venda da ICO (8% dos tokens a $0,01)', completed: false },
        { text: 'Lançamento da Fase 1 da ICO (10% a $0,02)', completed: false },
        { text: 'Campanhas de marketing e AirDrops para aumentar a comunidade', completed: false }
      ]
    },
    {
      period: t('roadmap.q12026'),
      items: [
        { text: 'Lançamento da Fase 2 da ICO (18% a $0,20)', completed: false },
        { text: 'Continuação do marketing, parcerias e expansão da comunidade', completed: false },
        { text: 'Desenvolvimento da plataforma do casino online', completed: false },
        { text: 'Obtenção de licenças e cumprimento das exigências legais', completed: false }
      ]
    },
    {
      period: t('roadmap.jan2026'),
      items: [
        { text: 'Lançamento oficial do casino online com suporte a depósitos em dinheiro real e criptomoedas', completed: false },
        { text: 'Primeira distribuição oficial dos lucros em USDT aos detentores elegíveis', completed: false }
      ]
    },
    {
      period: t('roadmap.q22026'),
      items: [
        { text: 'Expansão internacional do casino para novos mercados', completed: false },
        { text: 'Auditorias regulares e transparência total dos resultados financeiros', completed: false },
        { text: 'Reinvestimento em marketing, melhorias e novas funcionalidades', completed: false },
        { text: 'Crescimento da liquidez do token e fortalecimento do ecossistema CasinoFound', completed: false }
      ]
    }
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t('roadmap.title')}</h1>
      
      <div className="relative">
        {/* Linha vertical do roadmap */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/30"></div>
        
        <div className="space-y-12">
          {roadmapData.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="relative">
              {/* Período do roadmap */}
              <div className="flex items-center mb-4">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -ml-2 md:ml-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <span className="text-primary-foreground font-bold text-sm">{phaseIndex + 1}</span>
                </div>
                <h2 className="ml-10 md:ml-0 text-2xl font-bold md:absolute md:left-1/2 md:transform md:translate-x-8 md:w-1/2 md:pl-8">
                  {phase.period}
                </h2>
              </div>
              
              {/* Conteúdo do período */}
              <div className="md:grid md:grid-cols-2 md:gap-8 ml-10 md:ml-0">
                <div className={`md:col-start-${phaseIndex % 2 === 0 ? '1' : '2'} md:col-end-${phaseIndex % 2 === 0 ? '2' : '3'} ${phaseIndex % 2 === 1 ? 'md:row-start-1' : ''}`}>
                  <Card className={`border-l-4 ${phaseIndex % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} border-l-primary`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg md:hidden">{phase.period}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            {item.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Circle className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={item.completed ? 'text-foreground' : 'text-muted-foreground'}>
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                {phaseIndex % 2 === 0 ? <div className="hidden md:block"></div> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 p-6 bg-card rounded-lg border border-border">
        <h2 className="text-xl font-bold mb-4">Progresso Atual</h2>
        <p className="text-muted-foreground mb-4">
          Atualmente, o projeto CasinoFound está na fase de desenvolvimento inicial. A equipe está trabalhando na criação dos smart contracts e na preparação para a pré-venda da ICO.
        </p>
        <div className="w-full bg-primary/10 rounded-full h-2.5 mb-2">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: '15%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Início</span>
          <span>15% Completo</span>
          <span>Lançamento</span>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;

