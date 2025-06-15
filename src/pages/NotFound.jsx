import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Página não encontrada</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild>
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>{t('header.home')}</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;

