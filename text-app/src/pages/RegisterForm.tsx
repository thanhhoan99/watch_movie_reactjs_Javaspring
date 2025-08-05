/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Role {
  id: number;
  name: string;
}

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState<number>(4); // Mặc định USER
  const [roles, setRoles] = useState<Role[]>([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    // Gọi API để lấy danh sách role
    axios.get('http://localhost:8080/api/roles')
      .then(res => setRoles(res.data))
      .catch(() => console.error('Không thể lấy danh sách vai trò'));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/auth/register', {
        fullName,
        username,
        password,
        roleIds: [roleId]
      });

      localStorage.setItem('access_token', res.data.access_token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(res.data.loggedInUser));

      setMsg('✅ Đăng ký thành công!');
      window.location.href = '/';
    } catch (err: any) {
      setMsg('❌ Tài khoản đã tồn tại hoặc lỗi hệ thống!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Đăng ký</h2>
        <p className="text-center text-sm text-red-500">{msg}</p>

        <div>
          <label className="block font-medium">Họ tên</label>
          <input
            className="w-full px-3 py-2 border rounded"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Tài khoản</label>
          <input
            className="w-full px-3 py-2 border rounded"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Mật khẩu</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Vai trò</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={roleId}
            onChange={e => setRoleId(Number(e.target.value))}
            required
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
