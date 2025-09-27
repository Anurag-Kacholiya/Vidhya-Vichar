import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCreation } from "../api/axios";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [department, setStream] = useState("CSE");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) return alert("All fields are required");

        try {
            const response = await userCreation(name, email, password, role, department);

            console.log("Signup Success:", response.data);
            alert("Account created successfully!");

            // Navigate based on role
            if (role === "student") navigate("/student/dashboard");
            else navigate("/faculty/dashboard");
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.response?.data?.message || "Failed to create account");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <form
                onSubmit={handleSubmit}
                className="card bg-base-100 p-6 shadow-lg w-96 space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <select
                    className="select select-bordered w-full"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>

                <select
                    className="select select-bordered w-full"
                    value={department}
                    onChange={(e) => setStream(e.target.value)}
                >
                    <option value="CSE">CSE</option>
                    <option value="CSIS">CSIS</option>
                    <option value="PDM">PDM</option>
                </select>

                <button type="submit" className="btn btn-primary w-full">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
