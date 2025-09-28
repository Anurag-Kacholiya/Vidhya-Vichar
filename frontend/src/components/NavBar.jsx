import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser, faHome, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-primary fs-4"
          style={{ letterSpacing: "0.5px" }}
        >
          VidyaVichar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Left-side navigation */}
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to={user.role === "student" ? "/student/dashboard" : "/faculty/dashboard"}
              className="d-flex align-items-center gap-2"
            >
              <FontAwesomeIcon icon={faHome} />
              Dashboard
            </Nav.Link>

            {user.role === "faculty" && (
              <Nav.Link
                as={Link}
                to="/faculty/board"
                className="d-flex align-items-center gap-2"
              >
                <FontAwesomeIcon icon={faChalkboardTeacher} />
                Meeting Board
              </Nav.Link>
            )}
          </Nav>

          {/* Right-side: User menu */}
          <Nav className="align-items-center">
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {user.name || "Profile"}
                </span>
              }
              id="user-dropdown"
              align="end"
              className="fw-semibold"
            >
              {/* <NavDropdown.Item as={Link} to="/profile">
                My Profile
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

// import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import { useNavigate, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSignOutAlt, faHome, faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <Navbar bg="white" expand="lg" className="shadow-sm py-3">
//       <Container>
//         {/* Brand / Logo */}
//         <Navbar.Brand
//           as={Link}
//           to="/"
//           className="fw-bold text-primary fs-4"
//           style={{ letterSpacing: "0.5px" }}
//         >
//           VidyaVichar
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="navbar-nav" />
//         <Navbar.Collapse id="navbar-nav">
//           {/* Left-side navigation */}
//           <Nav className="me-auto">
//             <Nav.Link
//               as={Link}
//               to={user.role === "student" ? "/student/dashboard" : "/faculty/dashboard"}
//               className="d-flex align-items-center gap-2"
//             >
//               <FontAwesomeIcon icon={faHome} />
//               Dashboard
//             </Nav.Link>

//             {user.role === "faculty" && (
//               <Nav.Link
//                 as={Link}
//                 to="/faculty/board"
//                 className="d-flex align-items-center gap-2"
//               >
//                 <FontAwesomeIcon icon={faChalkboardTeacher} />
//                 Meeting Board
//               </Nav.Link>
//             )}
//           </Nav>

//           {/* Right-side: Logout button */}
//           <Button
//             variant="outline-danger"
//             onClick={handleLogout}
//             className="d-flex align-items-center gap-2 fw-semibold"
//           >
//             <FontAwesomeIcon icon={faSignOutAlt} />
//             Logout
//           </Button>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;

