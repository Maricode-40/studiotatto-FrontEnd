import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import "./Header.css";
import { getUserData, logout } from "../../pages/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const location = useLocation();

  const dispatch = useDispatch();

  const myPassport = useSelector(getUserData);
  const token = myPassport?.token;
  //console.log(myPassport);

  const logMeOut = () => {
    dispatch(logout());
  };

  //console.log(location.pathname, "here you are!");
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          My First App 🕸️ Tatoo Studio 🕸️ {myPassport.vecesLogeado}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/superappointments">
                SuperAdmin Appointments
              </NavDropdown.Item>
              <NavDropdown.Item href="/clientappointments">
                Client Appointments
              </NavDropdown.Item>
              <NavDropdown.Item href="/profiles">Profiles</NavDropdown.Item>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown.Divider />
              {token ? (
                <NavDropdown.Item onClick={() => logMeOut()}>
                  Logout
                </NavDropdown.Item>
              ) : (
                <p>there is no token </p>
              )}
              <NavDropdown.Item
                href="/login"
                className={location.pathname === "/login" ? "elementTest" : ""}
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/register"
                className={
                  location.pathname === "/register" ? "elementTest" : ""
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
