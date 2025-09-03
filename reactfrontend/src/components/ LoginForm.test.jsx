import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('renders login form inputs', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls submit function on login', () => {
    const mockLogin = vi.fn();

    render(
      <MemoryRouter>
        <LoginForm onLogin={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockLogin).toHaveBeenCalled();
  });
});
