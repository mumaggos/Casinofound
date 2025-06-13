import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Linkedin, Twitter, Globe } from 'lucide-react';

const Team = () => {
  const { t } = useTranslation();

  // Dados da equipe
  const teamMembers = [
    {
      name: 'João Silva',
      position: t('team.ceo'),
      bio: 'Empreendedor em série com mais de 15 anos de experiência em tecnologia e finanças. Fundou três startups de sucesso e tem ampla experiência em blockchain desde 2016.',
      photo: '/team/ceo.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/joaosilva',
        twitter: 'https://twitter.com/joaosilva',
        website: 'https://joaosilva.com'
      }
    },
    {
      name: 'Maria Oliveira',
      position: t('team.cto'),
      bio: 'Desenvolvedora blockchain com experiência em Ethereum, Polygon e outras redes. Anteriormente, trabalhou em projetos de DeFi e NFTs de grande sucesso.',
      photo: '/team/cto.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/mariaoliveira',
        twitter: 'https://twitter.com/mariaoliveira',
        website: null
      }
    },
    {
      name: 'Pedro Santos',
      position: t('team.cfo'),
      bio: 'Ex-executivo de finanças com passagens por grandes instituições financeiras. Especialista em regulamentação de criptomoedas e compliance para jogos de azar online.',
      photo: '/team/cfo.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/pedrosantos',
        twitter: null,
        website: null
      }
    },
    {
      name: 'Ana Costa',
      position: t('team.cmo'),
      bio: 'Especialista em marketing digital com foco em criptomoedas e iGaming. Liderou campanhas de marketing para várias ICOs bem-sucedidas e plataformas de jogos online.',
      photo: '/team/cmo.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/anacosta',
        twitter: 'https://twitter.com/anacosta',
        website: null
      }
    },
    {
      name: 'Carlos Mendes',
      position: t('team.developer'),
      bio: 'Desenvolvedor full-stack com especialização em smart contracts e aplicações descentralizadas. Contribuiu para vários projetos de código aberto no ecossistema Ethereum.',
      photo: '/team/dev1.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/carlosmendes',
        twitter: 'https://twitter.com/carlosmendes',
        website: 'https://carlosmendes.dev'
      }
    },
    {
      name: 'Sofia Almeida',
      position: t('team.designer'),
      bio: 'Designer de UX/UI com experiência em plataformas de jogos e aplicações financeiras. Especialista em criar interfaces intuitivas e visualmente atraentes.',
      photo: '/team/designer.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/sofiaalmeida',
        twitter: null,
        website: 'https://sofiaalmeida.design'
      }
    },
    {
      name: 'Ricardo Ferreira',
      position: t('team.advisor'),
      bio: 'Consultor de iGaming com mais de 20 anos de experiência na indústria. Ajudou a lançar e operar vários casinos online de sucesso em diferentes jurisdições.',
      photo: '/team/advisor1.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/ricardoferreira',
        twitter: null,
        website: null
      }
    },
    {
      name: 'Luísa Martins',
      position: t('team.advisor'),
      bio: 'Especialista em regulamentação de blockchain e criptomoedas. Advogada com experiência em várias jurisdições e consultora para projetos de tecnologia financeira.',
      photo: '/team/advisor2.jpg',
      social: {
        linkedin: 'https://linkedin.com/in/luisamartins',
        twitter: 'https://twitter.com/luisamartins',
        website: null
      }
    }
  ];

  // Função para gerar imagens de perfil (fallback)
  const generateProfileImage = (name, position) => {
    // Fallback para imagens não encontradas
    return `/team/${name.toLowerCase().replace(' ', '')}.jpg`;
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">{t('team.title')}</h1>
      
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground">
          O CasinoFound é desenvolvido por uma equipe experiente com backgrounds em blockchain, desenvolvimento de software, operações de casino online, marketing e finanças.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-square overflow-hidden bg-primary/10">
              <img
                src={member.photo || generateProfileImage(member.name, member.position)}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300?text=Team+Member';
                }}
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.position}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-4">
                {member.bio}
              </p>
            </CardContent>
            <CardFooter className="flex justify-start gap-2">
              {member.social.linkedin && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              )}
              {member.social.twitter && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
              )}
              {member.social.website && (
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Website</span>
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Junte-se à Nossa Equipe</CardTitle>
            <CardDescription>
              Estamos sempre à procura de talentos para expandir nossa equipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Se você é apaixonado por blockchain, desenvolvimento de software, iGaming ou marketing, e quer fazer parte de um projeto inovador, entre em contato conosco.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Desenvolvimento</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Desenvolvedores Blockchain</li>
                  <li>Desenvolvedores Frontend</li>
                  <li>Desenvolvedores Backend</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Marketing</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Gerentes de Comunidade</li>
                  <li>Especialistas em Marketing Digital</li>
                  <li>Designers Gráficos</li>
                </ul>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">Operações</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Gerentes de Produto</li>
                  <li>Especialistas em Compliance</li>
                  <li>Suporte ao Cliente</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <a href="mailto:careers@casinofound.me">
                Entre em Contato
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Team;

