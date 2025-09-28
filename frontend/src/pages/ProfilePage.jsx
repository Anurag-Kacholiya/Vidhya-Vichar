import { useState, useEffect } from "react";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Example: Fetch user info on mount (replace with actual API call)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // or fetch from API
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleUpdate = () => {
    // TODO: Call API to update user info
    console.log("Updated:", { name, email });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">My Profile</h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
