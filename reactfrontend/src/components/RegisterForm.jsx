import { useState } from 'react';
import api from '../api/axios';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/register', { name, email, password });
    alert('Registered! Please login.');
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
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
        data-testid="register-button"
      >
        Register
      </button>
    </form>
  );
}
