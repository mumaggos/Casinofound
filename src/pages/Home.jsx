import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Clock, TrendingUp, Shield, Coins, Mail, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [email, setEmail] = useState('');

  // Countdown para 1 de janeiro de 2026
  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00Z');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Obrigado por se inscrever com o email: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background"></div>
        <div className="container relative mx-auto px-4">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent animate-gradient">
              CasinoFound
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('home.about.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/digital-vault">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3 animate-pulse-glow hover-lift">
                  <Coins className="h-5 w-5 mr-2" />
                  {t('common.buyTokens')}
                </Button>
              </Link>
              <Link to="/whitepaper">
                <Button variant="outline" size="lg" className="px-8 py-3 hover-lift">
                  {t('common.learnMore')}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-pulse" />
              {t('home.countdown.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              { value: timeLeft.days, label: t('home.countdown.days') },
              { value: timeLeft.hours, label: t('home.countdown.hours') },
              { value: timeLeft.minutes, label: t('home.countdown.minutes') },
              { value: timeLeft.seconds, label: t('home.countdown.seconds') }
            ].map((item, index) => (
              <Card key={index} className="text-center p-4 sm:p-6 lg:p-8 glass hover-lift animate-zoom-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary mb-2 animate-pulse">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ICO Phase Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              {t('home.icoPhase.title')}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-6 sm:p-8 lg:p-12 glass hover-lift animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-lg font-semibold text-primary">FASE 1</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {t('home.icoPhase.phase1')}
                  </h3>
                  <div className="bg-background/50 rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Progresso</span>
                      <span className="text-sm font-semibold">40%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-gradient-to-r from-primary to-green-400 h-3 rounded-full animate-pulse" style={{ width: '40%' }}></div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                      <span>Termina em 31/12/2025</span>
                      <span>Preço: $0,02 por token</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Link to="/digital-vault">
                    <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-black font-semibold px-8 py-4 animate-pulse-glow hover-lift">
                      <Star className="h-5 w-5 mr-2" />
                      {t('home.icoPhase.buyNow')}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t('home.about.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.about.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'Segurança',
                description: 'Contratos inteligentes auditados na rede Polygon',
                delay: '0s'
              },
              {
                icon: TrendingUp,
                title: 'Dividendos',
                description: 'Receba lucros proporcionais aos seus tokens em stake',
                delay: '0.1s'
              },
              {
                icon: Coins,
                title: 'Utilidade',
                description: 'Token com utilidade real no ecossistema do casino',
                delay: '0.2s'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 sm:p-8 glass hover-lift animate-slide-up" style={{ animationDelay: feature.delay }}>
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base sm:text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Mail className="h-8 w-8 text-primary" />
              {t('home.newsletter.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('home.newsletter.subtitle')}
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('home.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-lg py-3"
                required
              />
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3 hover-lift">
                {t('home.newsletter.button')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

