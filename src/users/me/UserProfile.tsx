import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setName(response.data.name);
    } catch (err: any) {
      console.error('Erro ao carregar perfil:', err);
      setMessage('Erro ao carregar perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/users/${user?.id}`, {
        name,
        password: password || undefined, // evita enviar string vazia
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Perfil atualizado com sucesso!');
      setPassword('');
    } catch (err: any) {
      console.error('Erro ao atualizar perfil:', err);
      setMessage('Erro ao atualizar perfil.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p>Carregando perfil...</p>;
  if (!user) return <p>Perfil não encontrado.</p>;

  return (
    <div>
      <h2>Meu Perfil</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Data de criação:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

      <div>
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Nova senha:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleUpdate}>Atualizar Perfil</button>
      {message && <p>{message}</p>}
    </div>
  );
};