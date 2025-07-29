import React, { useState } from 'react';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data.token; // { token: "Bearer ..." }

      localStorage.setItem('token', token);
      alert('Đăng nhập thành công');
      navigate('/jobs');
    } catch (err) {
      alert('Đăng nhập thất bại');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <input placeholder="Tên đăng nhập" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Mật khẩu" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}
