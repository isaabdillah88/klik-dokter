import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  getProduct,
  addProduct,
  editProduct,
} from "../../store/actions/productAction";

const initialState = {
  sku: "",
  product_name: "",
  qty: "",
  price: "",
  unit: "",
  status: "",
};

const AddEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [item, setItem] = useState(initialState);
  const { sku, product_name, qty, price, unit, status } = item;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getProduct({ sku: id }));
    }
  }, [id, dispatch]);

  const { product, loading } = useSelector((state) => state.data);

  useEffect(() => {
    if (id) {
      setItem({ ...product[0] });
    } else {
      setItem({ ...initialState });
    }
  }, [id, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "qty":
        if (value === "" || parseInt(value) === +value) {
          setItem((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      case "price":
        if (value === "" || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setItem((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
        break;
      default:
        setItem((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sku || !product_name || !qty || !price || !unit || !status) {
      toast.warning("Please input all fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      if (id) {
        dispatch(editProduct(item, history));
      } else {
        dispatch(addProduct(item, history));
      }
    }
  };

  return (
    <>
      <Card>
        <Card.Header as="h5">{id ? "Edit Product" : "Add Product"}</Card.Header>
        <Card.Body>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                name="sku"
                placeholder="Input SKU"
                value={sku || ""}
                onChange={handleChange}
                readOnly={id}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="product_name"
                placeholder="Input Product Name"
                value={product_name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qty</Form.Label>
              <Form.Control
                type="text"
                name="qty"
                placeholder="Input Qty"
                value={qty || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                placeholder="Input Price"
                value={price || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit</Form.Label>
              <Form.Select
                name="unit"
                value={unit || ""}
                onChange={handleChange}
              >
                <option value="">- Select Unit -</option>
                <option value="Pcs">Pcs</option>
                <option value="Sachet">Sachet</option>
                <option value="Carton">Carton</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={status || ""}
                onChange={handleChange}
              >
                <option value="">- Select Status -</option>
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{float: "right"}}>
              <Button
                className="me-3"
                variant="outline-primary"
                type="button"
                onClick={() => history.push("/")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {id ? "Update" : "Add"}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddEdit;
