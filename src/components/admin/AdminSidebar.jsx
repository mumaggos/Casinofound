import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Users, 
  BarChart, 
  Wallet, 
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/images/logo.png';

const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const navItems = [
    {
      title: t('admin.dashboard'),
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: t('admin.content'),
      href: '/admin/content',
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: t('admin.users'),
      href: '/admin/users',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: t('admin.analytics'),
      href: '/admin/analytics',
      icon: <BarChart className="h-5 w-5" />
    },
    {
      title: t('admin.wallets'),
      href: '/admin/wallets',
      icon: <Wallet className="h-5 w-5" />
    },
    {
      title: t('admin.settings'),
      href: '/admin/settings',
      icon: <Settings className="h-5 w-5" />
    },
    {
      title: t('admin.languages'),
      href: '/admin/languages',
      icon: <Globe className="h-5 w-5" />
    }
  ];
  
  return (
    <div className={cn(
      "relative flex flex-col border-r border-border/40 bg-background",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-16 items-center border-b border-border/40 px-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <img src={logo} alt="CasinoFound Logo" className="h-8 w-8" />
          {!collapsed && <span className="font-bold">Admin Panel</span>}
        </Link>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-3 top-20 z-10 h-6 w-6 rounded-full border border-border bg-background"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>
      
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                location.pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground",
                collapsed ? "justify-center" : ""
              )}
            >
              {item.icon}
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="mt-auto border-t border-border/40 p-4">
        <div className={cn(
          "flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2",
          collapsed ? "justify-center" : ""
        )}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            A
          </div>
          {!collapsed && (
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Admin</p>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

