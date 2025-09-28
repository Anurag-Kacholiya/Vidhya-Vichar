import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge, Alert, ButtonGroup } from 'react-bootstrap';

const FacultyMeetingBoard = () => {
  const { meetingId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [meetingStatus, setMeetingStatus] = useState("active"); // default active
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/home/meetings/${meetingId}/questions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [token, meetingId]);

  const updateQuestionStatus = async (id, status) => {
    if (meetingStatus === "ended") {
      return alert("Cannot update questions. Meeting has ended.");
    }
    try {
      const res = await axios.put(
        `http://localhost:3000/home/meetings/${meetingId}/questions/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestions(questions.map(q => q._id === id ? res.data : q));
    } catch (err) {
      console.error("Error updating question status:", err);
      alert("Failed to update status");
    }
  };

  const handleEndMeeting = async () => {
    try {
      await axios.put(
        `http://localhost:3000/home/meetings/end/${meetingId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMeetingStatus("ended");
      alert("Meeting ended successfully");
    } catch (err) {
      console.error("Failed to end meeting", err);
      alert("Failed to end meeting");
    }
  };

  const filteredQuestions =
    filter === "all" ? questions : questions.filter(q => q.status === filter);

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col md={9}>
          <h1 className="display-6">Meeting Questions</h1>
          <Badge bg={meetingStatus === "active" ? "success" : "secondary"}>
            {meetingStatus === "active" ? "Active" : "Ended"}
          </Badge>
          <div className="text-muted mt-2">Welcome, {user?.name}</div>
        </Col>
        <Col md={3} className="text-end">
          {meetingStatus === "active" && (
            <Button variant="danger" onClick={handleEndMeeting}>
              End Meeting
            </Button>
          )}
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-3">
        <Col>
          <ButtonGroup>
            <Button variant={filter === "all" ? "primary" : "outline-primary"} onClick={() => setFilter("all")}>All</Button>
            <Button variant={filter === "unanswered" ? "secondary" : "outline-secondary"} onClick={() => setFilter("unanswered")}>Unanswered</Button>
            <Button variant={filter === "answered" ? "success" : "outline-success"} onClick={() => setFilter("answered")}>Answered</Button>
            <Button variant={filter === "important" ? "danger" : "outline-danger"} onClick={() => setFilter("important")}>Important</Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row className="g-4">
        <Col>
          {loading ? (
            <p className="text-center text-muted my-4">Loading questions...</p>
          ) : filteredQuestions.length === 0 ? (
            <p className="text-center text-muted my-4">No questions found</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {filteredQuestions.map((q) => (
                <Card key={q._id} bg="light" className="p-3 shadow-sm">
                  <div className="d-flex justify-content-between align-items-start">
                    <div><strong>{q.author}:</strong> {q.text}</div>
                    <Badge bg={
                      q.status === "unanswered" ? "secondary" :
                      q.status === "answered" ? "success" : "danger"
                    }>
                      {q.status}
                    </Badge>
                  </div>
                  <div className="mt-2 d-flex gap-2">
                    <Button
                      size="sm"
                      variant={q.status === "unanswered" ? "secondary" : "outline-secondary"}
                      onClick={() => updateQuestionStatus(q._id, "unanswered")}
                      disabled={meetingStatus === "ended"}
                    >
                      Unanswered
                    </Button>
                    <Button
                      size="sm"
                      variant={q.status === "answered" ? "success" : "outline-success"}
                      onClick={() => updateQuestionStatus(q._id, "answered")}
                      disabled={meetingStatus === "ended"}
                    >
                      Answered
                    </Button>
                    <Button
                      size="sm"
                      variant={q.status === "important" ? "danger" : "outline-danger"}
                      onClick={() => updateQuestionStatus(q._id, "important")}
                      disabled={meetingStatus === "ended"}
                    >
                      Important
                    </Button>
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

export default FacultyMeetingBoard;
