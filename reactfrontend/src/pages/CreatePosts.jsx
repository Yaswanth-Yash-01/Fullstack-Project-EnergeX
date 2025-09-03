import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await api.post('/posts', { title, content });
      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.errors?.content?.[0] || 'Failed to create post');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <button 
        onClick={() => navigate('/posts')}
        style={{
          padding: '8px 16px',
          backgroundColor: '#bdc3c7',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back to Posts
      </button>

      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Create Post</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Content:</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              resize: 'vertical'
            }}
          ></textarea>
        </div>

        <button 
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#0c9300ff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
