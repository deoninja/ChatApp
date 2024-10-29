import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../stores/authStore';

export default function ChatSidebar({ activeChat, setActiveChat }) {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <div 
        className={`p-2 cursor-pointer rounded ${activeChat === 'public' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        onClick={() => setActiveChat('public')}
      >
        Public Chat
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-400">Direct Messages</h3>
        {users.map(user => (
          <div
            key={user.id}
            className={`p-2 cursor-pointer rounded mt-1 ${activeChat === user.username ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveChat(user.username)}
          >
            {user.username}
          </div>
        ))}
      </div>
    </div>
  );
}