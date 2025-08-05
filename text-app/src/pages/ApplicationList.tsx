/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/ApplicationList.tsx
import React, { useEffect, useState } from "react";


import ApplicationForm from "./ApplicationForm";
import type { Application } from "../types/Application";
import { deleteApp, getApps } from "../api/axiosInstance";


const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  const fetchData = async () => {
    try {
      const res = await getApps(page);
      setApplications(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Lỗi khi fetch apps:", err);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteApp(id);
    fetchData();
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingApp(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
  <h2 className="text-2xl font-semibold mb-4">📄 Danh sách Applications</h2>

  <button
    className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    onClick={() => {
      setShowForm(true);
      setEditingApp(null);
    }}
  >
    ➕ Thêm mới
  </button>

  {showForm && (
    <ApplicationForm
      selectedApp={editingApp}
      onSuccess={handleSuccess}
      onCancel={() => setShowForm(false)}
    />
  )}

  <table className="min-w-full border border-gray-300 rounded overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th className="border-b border-gray-300 px-4 py-2 text-left">ID</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">Candidate ID</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">Job ID</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">Cover Letter</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">Status</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">Applied At</th>
        <th className="border-b border-gray-300 px-4 py-2 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      {applications.map((app) => (
        <tr key={app.id} className="hover:bg-gray-50">
          <td className="border-b border-gray-300 px-4 py-2">{app.id}</td>
          <td className="border-b border-gray-300 px-4 py-2">{app.candidateId}</td>
          <td className="border-b border-gray-300 px-4 py-2">{app.jobPostingId}</td>
            <td className="border-b border-gray-300 px-4 py-2">{app.coverLetter}</td>
          <td className="border-b border-gray-300 px-4 py-2">{app.status}</td>
          <td className="border-b border-gray-300 px-4 py-2">{app.appliedAt}</td>
          <td className="border-b border-gray-300 px-4 py-2 space-x-2">
            <button
              className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
              onClick={() => handleEdit(app)}
            >
              ✏️ Sửa
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => handleDelete(app.id)}
            >
              🗑️ Xoá
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="mt-4 flex items-center space-x-4">
    <span>
      Trang: {page + 1} / {totalPages}
    </span>
    <button
      className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      onClick={() => setPage((p) => Math.max(p - 1, 0))}
      disabled={page === 0}
    >
      ← Trước
    </button>
    <button
      className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
      disabled={page + 1 >= totalPages}
    >
      Sau →
    </button>
  </div>
</div>
  );
};

export default ApplicationList;
