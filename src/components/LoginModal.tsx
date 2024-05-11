import React, { useState } from 'react';
// imports for redux
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { login } from '../store/AuthSlice';
// import styles
import '../styles/LoginModal.css';

interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      dispatch(login('admin'));
    } else {
      setError('Invalid username or password');
    }
    closeModal();
  };

  return (
    <div className="login__modal">
      <div className="login__modal-content">
        <h2>Login</h2>
        <div className='login__modal-inputs'>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Login</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
