import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Product from "./components/product/Product";
import AddEdit from "./components/product/AddEdit";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthRoute from "./components/redirect/AuthRoute";
import ProductRoute from "./components/redirect/ProductRoute";
import NotFound from "./components/NotFound";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavBar />
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Switch>
                <Route exact path="/" component={Product} />
                <ProductRoute exact path="/add" component={AddEdit} />
                <ProductRoute exact path="/edit/:id" component={AddEdit} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/register" component={Register} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Card>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
