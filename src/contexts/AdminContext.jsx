import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from './Web3Context';
import { useSettings } from './SettingsContext';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { isConnected, address } = useWeb3();
  const { settings } = useSettings();
  const navigate = useNavigate();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Verificar se o endereço conectado é o administrador
  useEffect(() => {
    const checkAdmin = () => {
      setIsLoading(true);
      
      if (!isConnected || !address) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      // Comparar com o endereço do administrador nas configurações
      const isAdminWallet = address.toLowerCase() === settings.adminWallet.toLowerCase();
      setIsAdmin(isAdminWallet);
      
      if (!isAdminWallet) {
        // Se não for admin e estiver na rota de admin, redirecionar
        const path = window.location.pathname;
        if (path.startsWith('/admin')) {
          alert('Acesso negado. Você não tem permissão para acessar o painel administrativo.');
          navigate('/');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAdmin();
  }, [isConnected, address, settings.adminWallet, navigate]);
  
  // Função para acessar o painel administrativo
  const accessAdmin = () => {
    if (!isConnected) {
      alert('Conecte sua carteira para acessar o painel administrativo.');
      return false;
    }
    
    if (!isAdmin) {
      alert('Acesso negado. Você não tem permissão para acessar o painel administrativo.');
      return false;
    }
    
    navigate('/admin/dashboard');
    return true;
  };
  
  const value = {
    isAdmin,
    isLoading,
    accessAdmin
  };
  
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

