import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/actions/authAction";
import { Navbar, Container, Form, Button } from "react-bootstrap";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">KlikDokter</Navbar.Brand>
        <Form className="d-flex">
          {!token && (
            <>
              <Button
                className="me-3"
                variant="light"
                onClick={() => history.push("/register")}
              >
                Register
              </Button>
              <Button variant="primary" onClick={() => history.push("/login")}>
                Login
              </Button>
            </>
          )}
          {token && (
            <Button variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavBar;
