import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 2500);

    return () => clearTimeout(timer);
  }, [message.id, removeToast]);

  const iconVariations = {
    error: <FiAlertCircle size={24} />,
    info: <FiInfo size={24} />,
    success: <FiCheckCircle size={24} />,
  };

  return (
    <Container style={style} type={message.type} hasDescription={!!message.description}>
      {iconVariations[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
