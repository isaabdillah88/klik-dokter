import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProduct, deleteProduct } from "../../store/actions/productAction";
import { Link } from "react-router-dom";
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";

const Product = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useSelector((state) => state.auth);
  const { product, loading } = useSelector((state) => state.data);
  const [search, setSearch] = useState({
    sku: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getProduct(search));
  };

  const handleDelete = (sku) => {
    if (window.confirm("Are you sure want to delete the product ?")) {
      dispatch(deleteProduct({sku}));
    }
  };

  return (
    <>
      <Card.Body>
        <Form noValidate autoComplete="off" onSubmit={handleSearch}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Control
                className="mb-2"
                id="sku"
                name="sku"
                placeholder="Input SKU"
                value={search.sku}
                onChange={(e) => setSearch({ ...search, sku: e.target.value })}
                disabled={!token}
              />
            </Col>
            <Col xs="auto">
              <Button variant="success" type="submit" className="mb-2" disabled={!token || loading}>
                Search
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                varitant="primary"
                type="button"
                className="mb-2"
                onClick={() => history.push("add")}
                disabled={!token || loading}
              >
                Add Product
              </Button>
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {token && product &&
              product.map((item) => (
                <tr key={item.id}>
                  <td>{item.sku}</td>
                  <td>{item.product_name}</td>
                  <td align="center">
                    <Link className="me-3" to={`/edit/${item.sku}`}>Edit</Link> |
                    <Link className="ms-3" to="" onClick={() => handleDelete(item.sku)}>Delete</Link>
                  </td>
                </tr>
              ))}
            {token && !product.length && (
              <tr>
                <td colSpan="3" align="center">Please input the correct SKU to get the product</td>
              </tr>
            )}
            {!token &&
              <tr>
                <td colSpan="3" align="center">Please login first to access the product</td>
              </tr>
            }
          </tbody>
        </Table>
      </Card.Body>
    </>
  );
};

export default Product;
