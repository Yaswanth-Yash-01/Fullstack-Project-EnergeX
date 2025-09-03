import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PostsPage from './pages/PostsPage';

import CreatePost from './pages/CreatePosts';
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import RegisterForm from './components/RegisterForm.JSX';



const App = () => {
  return (
     <Router>
      <Routes>

        <Route path="/" element={
          <PublicRoute>
            <LoginForm />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <RegisterForm />
          </PublicRoute>
        } />

        
        <Route path="/posts" element={
          <ProtectedRoute>
            <PostsPage />
          </ProtectedRoute>
        } />


        <Route path="/createpost" element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
