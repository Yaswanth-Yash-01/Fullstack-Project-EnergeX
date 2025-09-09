
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postApi from '../api/postApi';

export default function PostDetail() {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    postApi.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch post'));
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        ← Back
      </button>
      <h2 style={{ color: '#2c3e50' }}>{post.title}</h2>
      <p style={{ color: '#555' }}>{post.content}</p>
    </div>
  );
}
