import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../contexts/SettingsContext';

const Footer = () => {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 md:py-0 bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/favicon.svg" alt="CasinoFound Logo" className="h-8 w-8" />
              <span className="font-bold text-foreground">CasinoFound</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {settings.siteDescription}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">{t('header.home')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('header.home')}
                </Link>
              </li>
              <li>
                <Link to="/digital-vault" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('header.digitalVault')}
                </Link>
              </li>
              <li>
                <Link to="/whitepaper" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('header.whitepaper')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">{t('header.tokenomics')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/roadmap" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('header.roadmap')}
                </Link>
              </li>
              <li>
                <Link to="/tokenomics" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('header.tokenomics')}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-sm text-muted-foreground hover:text-foreground">
                  {t('header.team')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@casinofound.me" className="text-sm text-muted-foreground hover:text-foreground">
                  info@casinofound.me
                </a>
              </li>
              <li>
                <a href="https://t.me/casinofound" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/casinofound" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} CasinoFound. {t('footer.rights')}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

