import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyMeetingBoard from "./pages/FacultyMeetingBoard";
import PostLectureReview from "./pages/PostLectureReview";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/review/:meetingId" element={<PostLectureReview />} />
                <Route path="/student/profile" element={<ProfilePage />} />

                <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
                <Route path="/faculty/meeting/:meetingId" element={<FacultyMeetingBoard />} />
                <Route path="/faculty/profile" element={<ProfilePage />} />
            </Routes>
        </div>
    )
}

export default App;

