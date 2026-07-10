import React, { useState } from 'react';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import WindowManager from './components/WindowManager';
import './styles/app.css';

interface Window {
  id: string;
  title: string;
  module: string;
  component: string;
  isActive: boolean;
}

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [openWindows, setOpenWindows] = useState<Window[]>([
    {
      id: '1',
      title: 'Dashboard',
      module: 'dashboard',
      component: 'Dashboard',
      isActive: true
    }
  ]);

  const openNewWindow = (module: string, component: string, title: string) => {
    const newWindow: Window = {
      id: Date.now().toString(),
      title,
      module,
      component,
      isActive: true
    };
    setOpenWindows([...openWindows, newWindow]);
    setActiveModule(module);
  };

  const closeWindow = (id: string) => {
    const remaining = openWindows.filter(w => w.id !== id);
    setOpenWindows(remaining);
    if (remaining.length > 0) {
      setActiveModule(remaining[remaining.length - 1].module);
    }
  };

  const setActiveWindow = (id: string) => {
    setOpenWindows(openWindows.map(w => ({
      ...w,
      isActive: w.id === id
    })));
    const activeWindow = openWindows.find(w => w.id === id);
    if (activeWindow) {
      setActiveModule(activeWindow.module);
    }
  };

  return (
    <div className="app-container">
      <Topbar onOpenWindow={openNewWindow} />
      <div className="main-layout">
        <Sidebar onOpenWindow={openNewWindow} />
        <WindowManager 
          windows={openWindows}
          activeModule={activeModule}
          onCloseWindow={closeWindow}
          onSetActive={setActiveWindow}
        />
      </div>
    </div>
  );
};

export default App;
