import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import FormContainer from "../Component/FormContainer";
import { productDetailAction } from "../store/productDetail";
import { productUpdateAction } from "../store/productUpdate";
import axios from "axios";
import Loader from "../Component/Loader";

const ProductEditScreen = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userDetail);
  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(productUpdateAction.updateReset());
      navigate("/admin/productlist");
    } else {
      if (!product.name || !product.id === id) {
        fetchProduct();
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
        setCountInStock(product.countInStock);
      }
    }
  }, [id, product, navigate, dispatch, updateSuccess]);

  const fetchProduct = async () => {
    dispatch(productDetailAction.productDetailRequest());
    try {
      const { data } = await axios.get(`/api/products/	${id}`);
      dispatch(productDetailAction.productDetailSuccess(data));
    } catch (error) {
      dispatch(productDetailAction.productDetailFail(error.message));
    }
  };

  async function productUpdater() {
    try {
      dispatch(productUpdateAction.updateRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/	${id}`,
        { id, name, price, image, brand, category, countInStock, description },
        config
      );
      dispatch(productUpdateAction.updateSuccess(data));
    } catch (error) {
      dispatch(
        productUpdateAction.updateFail(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    productUpdater();
  }

  async function uploadFileHandler(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  return (
    <>
      <Link to="/admin/productlist" ClassName="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateSuccess && (
          <Message variant="success">Product Updated !</Message>
        )}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="catgeory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>countInStock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button onClick={submitHandler} type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
