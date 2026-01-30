import { useEffect, useState } from "react";
import { Pencil, Trash2, Eye, UserCheck, UserMinus } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${backend_url}/employees`, {
        withCredentials: true,
      });
      setEmployees(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleStatusChange = async (id, currentStatus) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Mark as ${currentStatus === "active" ? "Inactive" : "Active"}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#111827",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(
        `${backend_url}/employees/${id}/soft-delete`,
        {},
        { withCredentials: true }
      );
      fetchEmployees();
      Swal.fire("Updated!", "Employee status changed.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Employee?",
      text: "This action cannot be undone.",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${backend_url}/employees/${id}/hard-delete`, {
        withCredentials: true,
      });
      fetchEmployees();
      Swal.fire("Deleted!", "Employee removed.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to delete employee", "error");
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Employee Management
        </h2>

        <Link
          to="/employee/add"
          className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition"
        >
          Add Employee
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{emp.employeeId}</td>
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.department}</td>

                <td className="px-4 py-3">
                  {emp.status === "active" ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="px-4 py-3 flex items-center justify-center gap-4">

                  <button
                    onClick={() => navigate(`/employee/edit/${emp._id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={20} />
                  </button>

                  <button
                    onClick={() => handleStatusChange(emp._id, emp.status)}
                    className={
                      emp.status === "active"
                        ? "text-red-600 hover:text-red-800"
                        : "text-green-600 hover:text-green-800"
                    }
                  >
                    {emp.status === "active" ? (
                      <UserMinus size={20} />
                    ) : (
                      <UserCheck size={20} />
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="text-red-700 hover:text-red-900"
                  >
                    <Trash2 size={20} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
