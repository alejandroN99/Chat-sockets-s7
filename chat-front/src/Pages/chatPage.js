import React, { useEffect } from 'react';
import io from 'socket.io-client';

const ChatPage = ({ match }) => {
  const chatId = match.params.id;
  const token = localStorage.getItem('CU_Token');

  useEffect(() => {
    // Conecta el socket y envía el token en la consulta
     io("http://localhost:8080", {
      query: {
        token: token,
      },
    });

    // Resto de la lógica para manejar la comunicación del chat
  }, [chatId, token]);

  return (
    <div>
      Chat Page
    </div>
  );
};

export default ChatPage;