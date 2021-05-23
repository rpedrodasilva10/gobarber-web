import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}
interface ToastContextData {
  removeToast(id: string): void;
  addToast(message: Omit<ToastMessage, 'id'>): void;
}
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
    const id = v4();
    const toastMessage = {
      id,
      type,
      title,
      description,
    };

    setMessages(oldState => [...oldState, toastMessage]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children} <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error('Context must be used within an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
