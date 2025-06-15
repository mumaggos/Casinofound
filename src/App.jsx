import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AdminProvider } from './contexts/AdminContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import LoadingScreen from './components/LoadingScreen';

// Páginas públicas
import Home from './pages/Home';
import DigitalVault from './pages/DigitalVault';
import Whitepaper from './pages/Whitepaper';
import Roadmap from './pages/Roadmap';
import Tokenomics from './pages/Tokenomics';
import Team from './pages/Team';
import NotFound from './pages/NotFound';

// Páginas administrativas
import AdminLogin from './pages/admin/Login';
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const AdminContent = lazy(() => import('./pages/admin/Content'));
const AdminLanguages = lazy(() => import('./pages/admin/Languages'));

function App() {
  return (
    <AdminProvider>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="digital-vault" element={<DigitalVault />} />
          <Route path="whitepaper" element={<Whitepaper />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="tokenomics" element={<Tokenomics />} />
          <Route path="team" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Rotas administrativas */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminDashboard />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminSettings />
            </Suspense>
          } />
          <Route path="content" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminContent />
            </Suspense>
          } />
          <Route path="languages" element={
            <Suspense fallback={<LoadingScreen />}>
              <AdminLanguages />
            </Suspense>
          } />
        </Route>
      </Routes>
    </AdminProvider>
  );
}

export default App;

