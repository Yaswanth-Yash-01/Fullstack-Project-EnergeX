import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const token = localStorage.getItem('jwt');

  if (token) {
    
    return <Navigate to="/posts" replace />;
  }

  return children;
}
