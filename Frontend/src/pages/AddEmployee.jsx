import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function AddEmployee() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    designation: "",
    role: "employee",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (!data.password.trim()) newErrors.password = "Password is required";
    if (data.password && data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    try {
      setLoading(true);

      const res = await axios.post(
        `${backend_url}/employees`,
        data,
        { withCredentials: true }
      );

      toast.success("Employee added successfully");
      setData({
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        designation: "",
        role: "employee",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">

        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Add Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-neutral-800`}
              placeholder="Employee name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-neutral-800`}
              placeholder="Employee email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-neutral-800`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-neutral-800"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={data.department}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-neutral-800"
            >
              <option value="">Select department</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={data.designation}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-neutral-800"
              placeholder="Ex: Manager"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={data.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-neutral-800"
            >
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-neutral-900 text-white rounded-lg flex items-center justify-center hover:bg-neutral-800 disabled:bg-gray-300"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" size={20} />
            ) : (
              "Add Employee"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
