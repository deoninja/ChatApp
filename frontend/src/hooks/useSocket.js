import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../stores/authStore';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const newSocket = io('http://localhost:5001', {
        auth: {
          token
        }
      });
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [token]);

  return { socket };
};