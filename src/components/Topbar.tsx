import React from 'react';
import { FiFile, FiPhone, FiImage, FiTrendingUp, FiAward, FiZap, FiBarChart3, FiCreditCard, FiSettings, FiLock } from 'react-icons/fi';
import '../styles/topbar.css';

interface TopbarProps {
  onOpenWindow: (module: string, component: string, title: string) => void;
}

const Topbar: React.FC<TopbarProps> = ({ onOpenWindow }) => {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const menuItems = [
    { label: 'File', icon: FiFile, module: 'file', id: 'file' },
    { label: 'Reception', icon: FiPhone, module: 'reception', id: 'reception' },
    { label: 'Media', icon: FiImage, module: 'media', id: 'media' },
    { label: 'Sales', icon: FiTrendingUp, module: 'sales', id: 'sales' },
    { label: 'Campaigns', icon: FiAward, module: 'campaigns', id: 'campaigns' },
    { label: 'Operations', icon: FiZap, module: 'operations', id: 'operations' },
    { label: 'Reports', icon: FiBarChart3, module: 'reports', id: 'reports' },
    { label: 'Accounts', icon: FiCreditCard, module: 'accounts', id: 'accounts' },
    { label: 'Masters', icon: FiSettings, module: 'masters', id: 'masters' },
    { label: 'Administration', icon: FiLock, module: 'administration', id: 'administration' }
  ];

  const handleMenuClick = (id: string, label: string, module: string) => {
    setActiveMenu(activeMenu === id ? null : id);
    onOpenWindow(module, label, label);
  };

  return (
    <div className="topbar">
      <div className="topbar-logo">
        <h1>SYNC</h1>
      </div>
      <nav className="topbar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="menu-item">
              <button
                className={`menu-button ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id, item.label, item.module)}
                title={item.label}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            </div>
          );
        })}
      </nav>
      <div className="topbar-right">
        <button className="icon-button" title="Settings">
          <FiSettings size={20} />
        </button>
        <button className="icon-button" title="User">
          <FiLock size={20} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
