import React from 'react';
import { useTransition } from 'react-spring';
import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast/index';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });

  return (
    // <Container>
    //   {messages.map(message => {
    //     return <Toast key={message.id} message={message}></Toast>;
    //   })}
    // </Container>
    <Container>
      {messagesWithTransitions((props, item) => {
        return <Toast style={props} key={item.id} message={item}></Toast>;
      })}
    </Container>
  );
};

export default ToastContainer;
