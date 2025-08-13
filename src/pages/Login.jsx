import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const { login, guestLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message || '';

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      setError('');
      navigate(location.state?.from?.pathname || '/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGuest = () => {
    guestLogin();
    navigate(location.state?.from?.pathname || '/');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGuest}>Continue as Guest</button>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Login;
