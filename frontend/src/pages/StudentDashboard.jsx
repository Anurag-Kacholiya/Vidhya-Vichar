import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/home/meetings/fetch`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeetings(res.data);
      } catch (err) {
        console.error("Failed to fetch meetings", err);
      }
    };
    fetchMeetings();
  }, [token]);

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {user?.name}</h2>
          <p className="text-muted">Your upcoming meetings</p>
        </Col>
      </Row>

      <Row className="g-4">
        {meetings.length === 0 ? (
          <p className="text-center text-muted">No meetings available</p>
        ) : (
          meetings.map((meeting) => (
            <Col md={4} key={meeting._id}>
              <Card className="p-3 shadow-sm">
                <h5>{meeting.title}</h5>
                <p className="text-muted">{meeting.description}</p>
                <Button
                  variant="primary"
                  className="w-100"
                  disabled={meeting.status === "ended"}
                  onClick={() => navigate(`/student/meeting/${meeting._id}/questions`)}
                >
                  {meeting.status === "ended" ? "Meeting Ended" : "Join Meeting"}
                </Button>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default StudentDashboard;
