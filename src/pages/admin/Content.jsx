import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Save, FileText, Home, Users, TrendingUp } from 'lucide-react';

const AdminContent = () => {
  const { t } = useTranslation();
  const [homeContent, setHomeContent] = useState({
    aboutTitle: 'Sobre o Token CFD',
    aboutDescription: 'CasinoFound é uma criptomoeda baseada na rede Polygon (Matic), criada para financiar o lançamento e a operação de um casino online inovador. Através do token CFD, os detentores participam dos lucros do casino, recebendo dividendos proporcionais à quantidade de tokens que possuem em Stack.',
  });
  
  const [whitepaperContent, setWhitepaperContent] = useState({
    introduction: 'CasinoFound é uma criptomoeda baseada na rede Polygon (Matic), criada para financiar o lançamento e a operação de um casino online inovador. Através do token CFD, os detentores participam dos lucros do casino em polygon, recebendo dividendos proporcionais à quantidade de tokens que possuem em Stack.',
  });

  const [teamContent, setTeamContent] = useState({
    ceoName: 'João Silva',
    ceoRole: 'CEO & Fundador',
    ceoBio: 'Especialista em blockchain com mais de 10 anos de experiência no setor de jogos online.',
    ctoName: 'Maria Santos',
    ctoRole: 'CTO',
    ctoBio: 'Desenvolvedora sênior especializada em contratos inteligentes e segurança blockchain.',
  });

  const handleSaveContent = (section) => {
    try {
      // Aqui seria implementada a lógica para salvar o conteúdo
      alert(`Conteúdo da seção ${section} salvo com sucesso!`);
    } catch (error) {
      alert(`Erro ao salvar conteúdo: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          Gerenciamento de Conteúdo
        </h1>
        <p className="text-muted-foreground">
          Edite o conteúdo das páginas do site
        </p>
      </div>

      <Tabs defaultValue="home" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Página Inicial</span>
          </TabsTrigger>
          <TabsTrigger value="whitepaper" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Whitepaper</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Equipe</span>
          </TabsTrigger>
          <TabsTrigger value="tokenomics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Tokenomics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo da Página Inicial</CardTitle>
              <CardDescription>
                Edite o conteúdo principal da página inicial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutTitle">Título da Seção Sobre</Label>
                <Input
                  id="aboutTitle"
                  value={homeContent.aboutTitle}
                  onChange={(e) => setHomeContent(prev => ({ ...prev, aboutTitle: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutDescription">Descrição da Seção Sobre</Label>
                <Textarea
                  id="aboutDescription"
                  rows={6}
                  value={homeContent.aboutDescription}
                  onChange={(e) => setHomeContent(prev => ({ ...prev, aboutDescription: e.target.value }))}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveContent('home')} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="whitepaper" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo do Whitepaper</CardTitle>
              <CardDescription>
                Edite o conteúdo do whitepaper do projeto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="introduction">Introdução</Label>
                <Textarea
                  id="introduction"
                  rows={8}
                  value={whitepaperContent.introduction}
                  onChange={(e) => setWhitepaperContent(prev => ({ ...prev, introduction: e.target.value }))}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveContent('whitepaper')} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Equipe</CardTitle>
              <CardDescription>
                Edite as informações dos membros da equipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">CEO</h3>
                  <div className="space-y-2">
                    <Label htmlFor="ceoName">Nome</Label>
                    <Input
                      id="ceoName"
                      value={teamContent.ceoName}
                      onChange={(e) => setTeamContent(prev => ({ ...prev, ceoName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ceoRole">Cargo</Label>
                    <Input
                      id="ceoRole"
                      value={teamContent.ceoRole}
                      onChange={(e) => setTeamContent(prev => ({ ...prev, ceoRole: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ceoBio">Biografia</Label>
                    <Textarea
                      id="ceoBio"
                      rows={4}
                      value={teamContent.ceoBio}
                      onChange={(e) => setTeamContent(prev => ({ ...prev, ceoBio: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">CTO</h3>
                  <div className="space-y-2">
                    <Label htmlFor="ctoName">Nome</Label>
                    <Input
                      id="ctoName"
                      value={teamContent.ctoName}
                      onChange={(e) => setTeamContent(prev => ({ ...prev, ctoName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctoRole">Cargo</Label>
                    <Input
                      id="ctoRole"
                      value={teamContent.ctoRole}
                      onChange={(e) => setTeamContent(prev => ({ ...prev, ctoRole: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ctoBio">Biografia</Label>
                    <Textarea
                      id="ctoBio"
                      rows={4}
                      value={teamContent.ctoBio}
                      onChange={(e) => setTeamContent(prev => ({ ...prev, ctoBio: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveContent('team')} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tokenomics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Tokenomics</CardTitle>
              <CardDescription>
                Edite as informações sobre a distribuição e economia do token
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <p>Seção de Tokenomics em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;

