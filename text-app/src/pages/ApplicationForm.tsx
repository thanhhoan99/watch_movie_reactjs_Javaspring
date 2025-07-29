// src/pages/ApplicationForm.tsx
import React, { useState, useEffect } from "react";
import type { Application } from "../types/Application";
import { createApp, updateApp } from "../api/applicationApi";

interface Props {
  selectedApp?: Application | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<Props> = ({ selectedApp, onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    candidateId: "",
    jobPostingId: "",
    coverLetter: "",
    status: "PENDING",
  });

  useEffect(() => {
    if (selectedApp) {
      setForm({
        candidateId: String(selectedApp.candidateId ?? ""),
        jobPostingId: String(selectedApp.jobPostingId ?? ""),
        coverLetter: selectedApp.coverLetter ?? "",
        status: selectedApp.status ?? "PENDING",
      });
    }
  }, [selectedApp]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      candidate: { id: Number(form.candidateId) },
      jobPosting: { id: Number(form.jobPostingId) },
      coverLetter: form.coverLetter,
      status: form.status,
      appliedAt: new Date().toISOString(),
    };

    try {
      if (selectedApp) {
        await updateApp(selectedApp.id, payload);
      } else {
        await createApp(payload);
      }
      onSuccess();
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {selectedApp ? "✏️ Sửa Application" : "➕ Thêm Application"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Candidate ID:</label>
            <input
              type="number"
              name="candidateId"
              value={form.candidateId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Job Posting ID:</label>
            <input
              type="number"
              name="jobPostingId"
              value={form.jobPostingId}
              onChange={handleChange}
              required // nếu đang sửa thì không cần
            //   disabled={!!selectedApp}
              className="w-full px-3 py-2 border rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Cover Letter:</label>
            <input
              type="text"
              name="coverLetter"
              value={form.coverLetter}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Status:</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="PENDING">PENDING</option>
              <option value="REVIEWED">REVIEWED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="ACCEPTED">ACCEPTED</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {selectedApp ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
