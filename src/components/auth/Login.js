import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { login } from "../../store/actions/authAction";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [creds, setCreds] = useState(initialState);
  const { email, password } = creds;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please input all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      dispatch(login(creds, history));
      setCreds({
        email: "",
        password: "",
      });
    }
  };

  return (
    <>
      <Card.Header as="h5">Login</Card.Header>
      <Card.Body>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="text-right">
            <Button style={{ float: "right" }} variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </>
  );
};

export default Login;
