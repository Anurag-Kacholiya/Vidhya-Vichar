
const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section (Form + Logo) */}
      <div className="flex-1 flex flex-col justify-center px-10 bg-white relative">
        {/* Logo Top Left */}
        <div className="absolute top-6 left-10 flex items-center gap-2">
          <img
            src="/logo.png" 
            alt="VidyaVichar Logo"
            className="w-10 h-10"
          />
          <span className="text-2xl font-extrabold text-blue-700">
            VidyaVichar
          </span>
        </div>

        {/* Centered Form */}
        <div className="max-w-md w-full mx-auto">{children}</div>
      </div>

      {/* Right Section (Background Image) */}
      <div className="hidden md:flex flex-1">
        <img
          src="/auth-bg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
