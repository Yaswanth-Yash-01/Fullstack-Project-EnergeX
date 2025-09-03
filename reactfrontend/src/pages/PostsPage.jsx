import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch posts'));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#2c3e50' }}>Posts</h1>
        <button 
          onClick={() => navigate('/createpost')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Create Post
        </button>
        <button
  onClick={() => {
    localStorage.removeItem('jwt');
    navigate('/');
  }}
  style={{
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }}
>
  Logout
</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {posts.map(p => (
          <div key={p.id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '10px', color: '#34495e' }}>{p.title}</h3>
            <p style={{ color: '#555' }}>{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
