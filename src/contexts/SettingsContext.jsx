import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

// Valores padrão para as configurações
const defaultSettings = {
  // Configurações gerais
  siteName: 'CasinoFound',
  siteDescription: 'Token CFD na rede Polygon para financiar um casino online inovador',
  casinoLaunchDate: '2026-01-01T00:00:00',
  
  // Configurações da ICO
  icoPhase: 1,
  icoPhase1Price: 0.02,
  icoPhase2Price: 0.10,
  icoPhase1End: '2025-12-31T23:59:59',
  icoPhase2End: '2026-01-31T23:59:59',
  
  // Configurações de blockchain
  contractAddress: '0x1234567890123456789012345678901234567890', // Endereço fictício
  profitDistributorAddress: '0x0987654321098765432109876543210987654321', // Endereço fictício
  adminWallet: '0x5555555555555555555555555555555555555555', // Endereço fictício
  walletConnectProjectId: 'YOUR_PROJECT_ID',
  
  // Configurações de idioma
  defaultLanguage: 'pt',
  supportedLanguages: ['pt', 'en', 'fr', 'zh'],
  
  // Configurações de tema
  darkMode: true,
  primaryColor: '#FFD700', // Dourado
  accentColor: '#00FFC8', // Verde neon
};

export const SettingsProvider = ({ children }) => {
  // Carregar configurações do localStorage, se disponíveis
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('casinofound-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  // Salvar configurações no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('casinofound-settings', JSON.stringify(settings));
  }, [settings]);
  
  // Função para atualizar as configurações
  const updateSettings = (newSettings) => {
    try {
      setSettings(prev => ({ ...prev, ...newSettings }));
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  };
  
  // Função para resetar as configurações para os valores padrão
  const resetSettings = () => {
    try {
      setSettings(defaultSettings);
      return true;
    } catch (error) {
      console.error('Error resetting settings:', error);
      return false;
    }
  };
  
  const value = {
    settings,
    updateSettings,
    resetSettings
  };
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);

