import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../contexts/SettingsContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, Globe, Edit3 } from 'lucide-react';

const LanguageSettings = () => {
  const { t, i18n } = useTranslation();
  const { settings, updateSettings } = useSettings();
  const [isEditing, setIsEditing] = useState(false);
  const [editingLang, setEditingLang] = useState('pt');
  const [translations, setTranslations] = useState({
    pt: {
      'common.loading': 'Carregando...',
      'common.error': 'Erro',
      'common.success': 'Sucesso',
      'header.home': 'Início',
      'header.digitalVault': 'Cofre Digital',
    },
    en: {
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'header.home': 'Home',
      'header.digitalVault': 'Digital Vault',
    }
  });

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const handleSaveTranslations = () => {
    try {
      // Aqui seria implementada a lógica para salvar as traduções
      alert('Traduções salvas com sucesso!');
      setIsEditing(false);
    } catch (error) {
      alert('Erro ao salvar traduções: ' + error.message);
    }
  };

  const handleTranslationChange = (key, value) => {
    setTranslations(prev => ({
      ...prev,
      [editingLang]: {
        ...prev[editingLang],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Configurações de Idioma
          </h2>
          <p className="text-muted-foreground">
            Gerencie as traduções e idiomas suportados pelo site
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          <Edit3 className="h-4 w-4 mr-2" />
          {isEditing ? 'Cancelar' : 'Editar Traduções'}
        </Button>
      </div>

      <Tabs value={editingLang} onValueChange={setEditingLang}>
        <TabsList className="grid w-full grid-cols-4">
          {languages.map((lang) => (
            <TabsTrigger key={lang.code} value={lang.code} className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span className="hidden sm:inline">{lang.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang) => (
          <TabsContent key={lang.code} value={lang.code} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  Traduções em {lang.name}
                </CardTitle>
                <CardDescription>
                  Configure as traduções para o idioma {lang.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(translations[lang.code] || {}).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={`${lang.code}-${key}`}>
                      {key}
                    </Label>
                    {isEditing ? (
                      <Input
                        id={`${lang.code}-${key}`}
                        value={value}
                        onChange={(e) => handleTranslationChange(key, e.target.value)}
                        placeholder={`Tradução para ${key}`}
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-md">
                        {value}
                      </div>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <div className="pt-4 border-t">
                    <Button onClick={handleSaveTranslations} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Traduções
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default LanguageSettings;

