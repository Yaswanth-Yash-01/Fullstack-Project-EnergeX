
import { useState } from 'react';
import api from '../api/axios'; 
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (onLogin) {
      onLogin({ email, password });
      return;
    }

    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('jwt', response.data.token);
    localStorage.setItem('role', response.data.user.role);
      console.log('JWT Token:', localStorage.getItem('jwt'));
      alert('Login successful!');
      navigate('/posts');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f6fa',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <form 
        onSubmit={handleLogin} 
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Login</h2>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="email" 
            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
          >
            Email:
          </label>
          <input 
            id="email"                
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0c9300ff',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#2980b9'}
          onMouseOut={e => e.target.style.backgroundColor = '#0c9300ff'}
        >
          Login
        </button>

      
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2980b9', textDecoration: 'none', fontWeight: 'bold' }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

