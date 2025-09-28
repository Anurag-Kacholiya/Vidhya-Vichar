import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/home/meetings/fetch", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeetings(res.data);
    } catch (err) {
      console.error("Failed to fetch meetings", err);
    }
  };

  const handleCreateMeeting = async () => {
    if (!title.trim()) return alert("Title is required");
    try {
      const res = await axios.post(
        "http://localhost:3000/home/meetings/create",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMeetings([...meetings, { ...res.data, status: "active" }]);
      setShowModal(false);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create meeting", err);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2>Hey Professor, {user?.name}</h2>
          <p className="text-muted">Manage your meetings below.</p>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Button
            variant="primary"
            className="w-100 mb-3"
            onClick={() => setShowModal(true)}
          >
            Create Meeting
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="outline-secondary"
            className="w-100 mb-3"
            onClick={fetchMeetings}
          >
            Refresh
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        {meetings.length === 0 ? (
          <p className="text-muted text-center">No meetings created yet.</p>
        ) : (
          meetings.map((meeting) => (
            <Col md={4} key={meeting._id}>
              <Card className="p-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5>{meeting.title}</h5>
                  <Badge bg={meeting.status === "active" ? "success" : "secondary"}>
                    {meeting.status === "active" ? "Active" : "Ended"}
                  </Badge>
                </div>
                <p className="text-muted">{meeting.description}</p>
                <Button
                  variant={meeting.status === "active" ? "success" : "secondary"}
                  className="w-100 mb-2"
                  onClick={() => navigate(`/faculty/meeting/${meeting._id}/questions`)}
                >
                  Join as Host
                </Button>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Meeting Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter meeting title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateMeeting}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FacultyDashboard;
