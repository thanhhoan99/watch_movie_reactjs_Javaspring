import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { apiClient } from "../libraries/api-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Role {
  id: string | number;
  name: string;
}
interface User {
  id: number;
  username: string;
  isActive: boolean;
  roles: Role[];
}

// const AVAILABLE_ROLES = ["Administrators", "Users", "Managers"];

export default function User() {
  const { loggedInUser } = useAuthStore((state) => state);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const navigate = useNavigate();

  const isAdmin =
    Array.isArray(loggedInUser?.roles) &&
    loggedInUser.roles.some((role: Role) => role.name === "Administrators");

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/users") as User[];
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // Fetch danh sách roles từ backend
  const fetchRoles = async () => {
    try {
      const response = await apiClient.get("/roles") as Role[];
      // Chỉ lấy name để checkbox
      const roleNames = response.map((role) => role.name);
      setAvailableRoles(roleNames);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
  
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchRoles();
    }
  }, [isAdmin]);

  const openRoleModal = (user: User) => {
    setSelectedUser(user);
    const roleNames=user.roles.map((role) => role.name);
    setSelectedRoles(roleNames);
    setShowModal(true);
  };

  const handleCheckboxChange = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSaveRoles = async () => {
    if (!selectedUser) return;
    try {
      await apiClient.put(`/users/${selectedUser.id}/roles`, {
        roleNames: selectedRoles,
      });
      // alert("Cập nhật role thành công!");
      toast.success("Update successfully!");

      setShowModal(false);
      fetchUsers(); // Reload list
    } catch (error) {
      console.error("Lỗi cập nhật role:", error);
      toast.error("❌ Update failed!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý người dùng</h2>

      {!isAdmin && (
        <p className="text-red-600 font-semibold">Bạn không có quyền truy cập chức năng này.</p>
      )}

      {isAdmin && (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Username</th>
              <th className="border px-2 py-1">Roles</th>
              <th className="border px-2 py-1">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-2 py-1">{user.id}</td>
                <td className="border px-2 py-1">{user.username}</td>
                <td className="border px-2 py-1">{user.roles.map((role) => role.name).join(", ")}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => openRoleModal(user)}
                  >
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal popup */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Cập nhật vai trò cho <span className="text-blue-600">{selectedUser.username}</span>
            </h3>

            <div className="flex flex-col gap-2 mb-4">
              {availableRoles.map((role) => (
                <label key={role} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleCheckboxChange(role)}
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveRoles}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
