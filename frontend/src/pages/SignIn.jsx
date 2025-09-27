import { userLogin } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "./AuthLayout";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin(email, password);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "student") navigate("/student/dashboard");
      else navigate("/faculty/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <input
          type="email"
          placeholder="Email address"
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-gray-600 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline font-medium">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignIn;
