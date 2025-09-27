const ProfilePage = () => {
  // TODO: Fetch user info and allow updates
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <input type="text" placeholder="Name" className="input input-bordered w-full mb-3" />
      <input type="email" placeholder="Email" className="input input-bordered w-full mb-3" />
      <button className="btn btn-primary w-full">Update Profile</button>
    </div>
  );
};

export default ProfilePage;
