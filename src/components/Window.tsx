import React from 'react';
import { FiX, FiMinus } from 'react-icons/fi';
import MainContent from './MainContent';
import '../styles/window.css';

interface WindowProps {
  id: string;
  title: string;
  component: string;
  module: string;
  isActive: boolean;
  onClose: () => void;
  onActivate: () => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  component,
  module,
  isActive,
  onClose,
  onActivate
}) => {
  const [isMinimized, setIsMinimized] = React.useState(false);

  return (
    <div
      className={`window ${isActive ? 'active' : ''} ${isMinimized ? 'minimized' : ''}`}
      onClick={onActivate}
    >
      <div className="window-header">
        <div className="window-title">
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button
            className="window-control"
            onClick={() => setIsMinimized(!isMinimized)}
            title="Minimize"
          >
            <FiMinus size={16} />
          </button>
          <button
            className="window-control close"
            onClick={onClose}
            title="Close"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="window-content">
          <MainContent module={module} component={component} />
        </div>
      )}
    </div>
  );
};

export default Window;
