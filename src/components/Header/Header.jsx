import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  //console.log(location)
  console.log(location.pathname, "here you are!");
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">My First App 🕸️ Studio Tatoo </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Service/Appointments
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/login"
                className={location.pathname === "/login" ? "elementNew" : ""}
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/profile">
                Profile or User
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="/register"
                className={
                  location.pathname === "/register" ? "elementNew" : ""
                }
              >
                Register Now!
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
