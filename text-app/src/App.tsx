

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ApplicationList from './pages/ApplicationList';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<ApplicationList />} />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
