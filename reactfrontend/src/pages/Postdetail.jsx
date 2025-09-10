import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [role, setRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
      const storedRole = localStorage.getItem('role');
  if (storedRole) setRole(storedRole.trim().toLowerCase());
   

    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to fetch post'));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      alert('Post deleted successfully');
      navigate('/posts');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete post');
    }
  };

 const handleEdit = async () => {
  try {
    const res = await api.put(
      `/posts/${id}`,
      { title: post.title, content: post.content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    setPost(res.data.post);
    setIsEditing(false);
    alert('Post updated successfully');
  } catch (err) {
    console.error(err.response?.data);
    alert(err.response?.data?.error || 'Failed to update post');
  }
};


  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← Back</button>
      <h2 style={{ color: '#2c3e50' }}>{post.title}</h2>
      <p style={{ color: '#555' }}>{post.content}</p>

     
      {role === 'admin' && (
        <div style={{ marginTop: '20px' }}>
         <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px', padding: '5px 10px' }}>
  Edit
</button>{isEditing && (
  <div style={{ marginTop: '20px' }}>
    <input
      type="text"
      value={post.title}
      onChange={(e) => setPost({ ...post, title: e.target.value })}
      style={{ display: 'block', marginBottom: '10px', width: '100%' }}
    />
    <textarea
      value={post.content}
      onChange={(e) => setPost({ ...post, content: e.target.value })}
      style={{ display: 'block', marginBottom: '10px', width: '100%', height: '100px' }}
    />
    <button onClick={handleEdit} style={{ marginRight: '10px', padding: '5px 10px' }}>
      Save
    </button>
    <button onClick={() => setIsEditing(false)} style={{ padding: '5px 10px' }}>
      Cancel
    </button>
  </div>
)}

          <button onClick={handleDelete} style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white' }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}


