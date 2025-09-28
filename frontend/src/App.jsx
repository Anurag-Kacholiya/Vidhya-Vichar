import { Route, Routes } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/StudentDashboard";
import StudentMeetingBoard from "./pages/StudentMeetingboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyMeetingBoard from "./pages/FacultyMeetingBoard";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";

library.add(fas);

const App = () => {
  // Get the current pathname
  const pathname = window.location.pathname;
  const isAuthPage = pathname === '/' || pathname === '/signup';

  return (
    <div className="min-h-screen bg-light">
      {!isAuthPage && <NavBar />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/meeting/:meetingId/questions" element={<StudentMeetingBoard />} />
        <Route path="/student/profile" element={<ProfilePage />} />

        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/meeting/:meetingId/questions" element={<FacultyMeetingBoard />} />
        <Route path="/faculty/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
