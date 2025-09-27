import { useState, useEffect } from "react";
import {userCreation} from "../api/axios";

const FacultyDashboard = () => {
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [stream, setStream] = useState("CSE");
  const [link, setLink] = useState("");
  const [meetings, setMeetings] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch faculty meetings from backend
    const fetchMeetings = async () => {
      try {
        const res = await userCreation.get("/faculty/meetings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeetings(res.data);
      } catch (err) {
        console.error("Error fetching meetings:", err);
      }
    };

    fetchMeetings();
  }, [token]);

  const handleCreateMeeting = async () => {
    if (!title || !datetime || !link) return alert("Please fill all fields");

    try {
      const res = await api.post(
        "/faculty/meetings",
        { title, datetime, stream, link },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Meeting created successfully!");
      setMeetings([...meetings, res.data]); // Add new meeting to list
      setTitle("");
      setDatetime("");
      setStream("CSE");
      setLink("");
    } catch (err) {
      console.error("Error creating meeting:", err);
      alert("Failed to create meeting");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Faculty Dashboard</h1>

      {/* Schedule a Meeting */}
      <div className="card bg-base-100 shadow-md p-4 space-y-2">
        <h2 className="text-xl font-semibold">Schedule Meeting</h2>

        <input
          type="text"
          placeholder="Meeting Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="datetime-local"
          className="input input-bordered w-full"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          value={stream}
          onChange={(e) => setStream(e.target.value)}
        >
          <option value="CSE">CSE</option>
          <option value="CSIS">CSIS</option>
          <option value="PDM">PDM</option>
        </select>

        <input
          type="text"
          placeholder="Meeting Link"
          className="input input-bordered w-full"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <button className="btn btn-primary w-full" onClick={handleCreateMeeting}>
          Create Meeting
        </button>
      </div>

      {/* List of Meetings */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-semibold mb-2">Your Meetings</h2>
        <ul className="list-disc list-inside space-y-1">
          {meetings.length > 0 ? (
            meetings.map((m) => (
              <li key={m._id} className="flex justify-between items-center">
                <span>{m.title} - {new Date(m.datetime).toLocaleString()} ({m.stream})</span>
                <a
                  href={m.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Join
                </a>
              </li>
            ))
          ) : (
            <li>No meetings scheduled</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FacultyDashboard;
