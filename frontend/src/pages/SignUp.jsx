import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCreation } from "../api/axios";
import AuthLayout from "./AuthLayout";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("CSE");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields are required");

    try {
      await userCreation(name, email, password, role, department);
      alert("Account created successfully!");
      if (role === "student") navigate("/student/dashboard");
      else navigate("/faculty/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <select
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="CSE">CSE</option>
          <option value="CSIS">CSIS</option>
          <option value="PDM">PDM</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
        >
          Sign Up
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
