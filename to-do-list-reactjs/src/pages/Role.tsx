import { useEffect, useState } from "react";
import apiClient from "../libraries/api-client-advanced";

interface Role {
  id: number;
  name: string;
}

export default function Role() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await apiClient.get("/roles") as Role[];
      console.log("Fetched roles:", response);
      setRoles(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Role Management</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Role Name</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="border px-2 py-1">{role.id}</td>
                <td className="border px-2 py-1">{role.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
