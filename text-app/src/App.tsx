

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ApplicationList from './pages/ApplicationList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<ApplicationList />} />
      </Routes>
    </BrowserRouter>
  );
}
