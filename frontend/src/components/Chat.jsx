import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../stores/authStore';
import ChatSidebar from './ChatSidebar';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function Chat() {
  const [activeChat, setActiveChat] = useState('public');
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on('private_message', (message) => {
        if (activeChat === message.from) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }
  }, [socket, activeChat]);

  const sendMessage = (content) => {
    if (activeChat === 'public') {
      socket.emit('send_message', {
        content,
        sender: user.username,
        room: 'public',
        timestamp: new Date(),
      });
    } else {
      socket.emit('private_message', {
        content,
        from: user.username,
        to: activeChat,
        timestamp: new Date(),
      });
    }
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <div className="flex-1 flex flex-col">
        <MessageList messages={messages} />
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}