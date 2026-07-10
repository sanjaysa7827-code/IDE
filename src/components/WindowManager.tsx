import React from 'react';
import Window from './Window';
import '../styles/window-manager.css';

interface WindowData {
  id: string;
  title: string;
  module: string;
  component: string;
  isActive: boolean;
}

interface WindowManagerProps {
  windows: WindowData[];
  activeModule: string;
  onCloseWindow: (id: string) => void;
  onSetActive: (id: string) => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  activeModule,
  onCloseWindow,
  onSetActive
}) => {
  return (
    <div className="window-manager">
      <div className="windows-container">
        {windows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            component={window.component}
            module={window.module}
            isActive={window.isActive}
            onClose={() => onCloseWindow(window.id)}
            onActivate={() => onSetActive(window.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WindowManager;
