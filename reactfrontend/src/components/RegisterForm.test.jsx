import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import RegisterForm from './RegisterForm';
import api from '../api/axios';


import '@testing-library/jest-dom';

vi.mock('../api/axios');

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders register form inputs', () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('calls API on submit', async () => {
    api.post.mockResolvedValue({ data: { message: 'Registered!' } });

    render(<RegisterForm />);

    fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/register', {
        name: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
