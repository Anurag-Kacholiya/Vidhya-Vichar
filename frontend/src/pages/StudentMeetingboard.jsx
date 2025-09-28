import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from "react-bootstrap";

const StudentMeetingBoard = () => {
  const { meetingId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [meeting, setMeeting] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMeetingAndQuestions = async () => {
      try {
        setLoading(true);

        // Fetch meeting details
        const meetingRes = await axios.get(`http://localhost:3000/home/meetings/${meetingId}/questions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeeting(meetingRes.data);

        // Fetch questions
        const res = await axios.get(`http://localhost:3000/home/meetings/${meetingId}/questions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching meeting/questions:", err);
        setError("Failed to fetch meeting or questions");
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingAndQuestions();
  }, [token, meetingId]);

  const handlePostQuestion = async () => {
    if (!newQuestion.trim()) return alert("Question cannot be empty");
    if (meeting?.status === "ended") return alert("Meeting has ended. Cannot post new questions.");

    try {
      const res = await axios.post(
        `http://localhost:3000/home/meetings/${meetingId}/questions/create`,
        { text: newQuestion, author: user?.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuestions([...questions, res.data]);
      setNewQuestion("");
    } catch (err) {
      console.error("Error posting question:", err);
      setError("Failed to post question");
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Meeting Q&A</h2>
          <div className="text-muted">Welcome, {user?.name}</div>
          {meeting && (
            <Badge bg={meeting.status === "active" ? "success" : "secondary"} className="mt-2">
              {meeting.status === "active" ? "Active" : "Ended"}
            </Badge>
          )}
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {/* Post a new question */}
      <Row className="mb-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder={meeting?.status === "ended" ? "Meeting ended. Cannot post questions." : "Type your question here..."}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            disabled={meeting?.status === "ended"}
          />
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            className="w-100"
            onClick={handlePostQuestion}
            disabled={meeting?.status === "ended"}
          >
            Post Question
          </Button>
        </Col>
      </Row>

      {/* List of questions */}
      <Row className="g-4">
        <Col>
          {questions.length === 0 ? (
            <p className="text-center text-muted my-4">No questions posted yet.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {questions.map((q) => (
                <Card key={q._id} bg="light" className="p-3 shadow-sm">
                  <div className="d-flex justify-content-between align-items-start">
                    <div><strong>{q.author}:</strong> {q.text}</div>
                    <Badge bg={q.status === "unanswered" ? "secondary" : q.status === "answered" ? "success" : "danger"}>
                      {q.status || "unanswered"}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentMeetingBoard;
