import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userCreation } from "../api/axios";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faGraduationCap,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("CSE");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await userCreation(
        name,
        email,
        password,
        role,
        department
      );
      console.log("Signup Success:", response.data);

      // Navigate based on role
      if (role === "student") navigate("/student/dashboard");
      else navigate("/faculty/dashboard");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(
        err.response?.data?.message || "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body className="p-5">
          <h2 className="text-center mb-4 fw-bold text-primary">
            VidyaVichar Sign Up
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </span>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                <Form.Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="CSE">CSE</option>
                  <option value="CSIS">CSIS</option>
                  <option value="PDM">PDM</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center">
              <p className="mb-0">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="text-primary text-decoration-none"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
