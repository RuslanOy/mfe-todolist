import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from '@/shared/chakra/ui/provider.tsx';
import './index.css';

const ToDoListApp: React.FC = () => {
  return (
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<ToDoListApp />);
