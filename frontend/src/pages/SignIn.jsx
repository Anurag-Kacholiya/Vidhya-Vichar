import { userLogin } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      const res = await userLogin(email, password);
      console.log("Login Success:", res.data);

      const { token, user } = res.data;

      // Store token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on role
      if (user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/faculty/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to sign in. Please check your credentials."
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
            VidyaVichar Sign In
          </h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
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

            <Form.Group className="mb-4">
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

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-4"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <p className="mb-0">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-primary text-decoration-none">
                  Sign Up
                </Link>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignIn;
