import { useTranslation } from 'react-i18next';
import LanguageSettings from '../../components/admin/LanguageSettings';

const Languages = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('admin.language')}</h1>
        <p className="text-muted-foreground">
          {t('admin.languagePageDescription')}
        </p>
      </div>
      
      <div className="space-y-6">
        <LanguageSettings />
      </div>
    </div>
  );
};

export default Languages;

