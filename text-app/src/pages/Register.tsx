import React, { useState } from 'react';
import api from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', email: '', roleId: 1 });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', form);
      alert('Đăng ký thành công');
      navigate('/login');
    } catch {
      alert('Đăng ký thất bại');
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <input placeholder="Tên đăng nhập" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Mật khẩu" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, roleId: +e.target.value })}>
        <option value={1}>Ứng viên</option>
        <option value={2}>Nhà tuyển dụng</option>
      </select>
      <button onClick={handleRegister}>Đăng ký</button>
    </div>
  );
}