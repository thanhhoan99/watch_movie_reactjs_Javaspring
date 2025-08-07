

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true; 
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { username, password });

      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(res.data.loggedInUser));

      setMsg('Đăng nhập thành công!');
      window.location.href = '/';
    } catch (err: any) {
      setMsg('Sai tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>
      <p>{msg}</p>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Tài khoản" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Mật khẩu" />
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default LoginForm;
