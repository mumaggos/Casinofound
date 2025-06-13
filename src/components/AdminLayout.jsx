import { Outlet, Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { useWeb3 } from '../contexts/Web3Context';
import AdminHeader from './admin/AdminHeader';
import AdminSidebar from './admin/AdminSidebar';
import LoadingScreen from './LoadingScreen';

const AdminLayout = () => {
  const { isAdmin, isLoading } = useAdmin();
  const { isConnected } = useWeb3();
  
  // Se estiver carregando, mostrar tela de carregamento
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  // Se não estiver conectado ou não for admin, redirecionar para a página de login
  if (!isConnected || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

