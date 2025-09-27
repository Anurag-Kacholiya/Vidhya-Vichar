import { useState, useEffect } from "react";
import { userCreation } from "../api/axios";

const StudentDashboard = () => {
  const [meetings, setMeetings] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    // Fetch meetings (replace with actual backend endpoint)
    const fetchMeetings = async () => {
      try {
        const res = await userCreation.get("/student/meetings", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMeetings(res.data);
      } catch (err) {
        console.error("Error fetching meetings:", err);
      }
    };

    fetchMeetings();
  }, []);

  const handleQuestionSubmit = async () => {
    if (!question) return alert("Please type a question");
    try {
      const res = await api.post(
        "/questions/create",
        { text: question, author: JSON.parse(localStorage.getItem("user")).name, role: "student" },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Question submitted!");
      setQuestion("");
    } catch (err) {
      console.error("Error submitting question:", err);
      alert("Failed to submit question");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>

      {/* Upcoming Meetings */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Upcoming Meetings</h2>
        <ul className="list-disc list-inside">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <li key={meeting._id} className="flex justify-between items-center">
                <span>{meeting.title}</span>
                <a
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Join
                </a>
              </li>
            ))
          ) : (
            <li>No upcoming meetings</li>
          )}
        </ul>
      </div>

      {/* Post a Question */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Ask a Question</h2>
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Type your question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
        <button className="btn btn-primary mt-3" onClick={handleQuestionSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
