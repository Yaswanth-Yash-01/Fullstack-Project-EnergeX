

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/register', { name, email, password,role :isAdmin? 'admin': 'user' });
      alert('Registered! Please login.');
      navigate('/'); 
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  };

  const inputStyle = {
    padding: '10px 12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Register</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={inputStyle}
        data-testid="name-input"
      />
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={inputStyle}
        data-testid="email-input"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={inputStyle}
        data-testid="password-input"
      />
       <label>
        <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
        Register as Admin
      </label>
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        data-testid="register-button"
      >
        Register
      </button>


      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Have an account?{' '}
        <Link to="/" style={{ color: '#2980b9', textDecoration: 'none', fontWeight: 'bold' }}>
          Login
        </Link>
      </p>
    </form>
  );
}
