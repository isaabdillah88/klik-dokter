import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { register } from "../../store/actions/authAction";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(initialState);
  const { email, password } = user;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please input all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      dispatch(register(user, history));
    }
  };

  return (
    <>
      <Card.Header as="h5">Register</Card.Header>
      <Card.Body>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Input email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Input Password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="text-right">
            <Button style={{ float: "right" }} variant="primary" type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </>
  );
};

export default Register;
