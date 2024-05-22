import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import Loader from "../Component/Loader";
import { productListAction } from "../store/productList";
import axios from "axios";
import { productDeleteAction } from "../store/productDelete";
import { productCreateAction } from "../store/productCreate";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, error, loading } = useSelector(
    (state) => state.productList
  );
  const {loading:deleteLoading,error:deleteError,success}=useSelector((state)=>state.productDelete)
 
  const { userInfo } = useSelector((state) => state.userDetail);
  const {success:createSuccess,product:createdProduct,error:createError,loading:createLoading}=useSelector((state)=>state.productCreate)

  
  useEffect(() => {
    dispatch(productCreateAction.createReset())
    if (userInfo && userInfo.isAdmin) {
     fetchProducts()
    } else {
      navigate("/login");
    }
    if(createSuccess){
      navigate(`/admin/product/	${createdProduct._id}/edit`)
    }

  }, [dispatch, userInfo, navigate,success,createSuccess]);
  

  const fetchProducts = async () => {
    dispatch(productListAction.productListRequest()); 
    try {
      const { data } = await axios.get('/api/products');
      dispatch(productListAction.productListSuccess(data)); 
    } catch (error) {
      dispatch(productListAction.productListFail(error.message)); 
    }
  };

  const deleteHandler = async (id) => {
    try {
      dispatch(productDeleteAction.deleteRequest())
      const config={
        headers:{
          Authorization:`Bearer ${userInfo.token}`
        }
      }

      await axios.delete(`/api/products/	${id}`,config)
      dispatch(productDeleteAction.deleteSuccess())


    } catch (error) {
      dispatch(productDeleteAction.deleteFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
  };


async  function createProductHandler(e){
  e.preventDefault()
  try {
    dispatch(productCreateAction.createRequest())
    const config={
      headers:{
        Authorization:`Bearer ${userInfo.token}`
      }
    }
    const {data}=await axios.post(`/api/products`,{},config)
    dispatch(productCreateAction.createSuccess(data))

  } catch (error) {
    dispatch(productCreateAction.createFail(error.response && error.response.data.message ? error.response.data.message : error.message))
  }
  }

  return (<>
  <Row className="align-items-center">
    <Col><h1>Products</h1></Col>
    <Col className="text-right">
        <Button className="my-3" onClick={createProductHandler}>
          <i className="fas fa-plus"></i>  Create Product
        </Button>
    </Col>
  </Row>
  {success && <Message variant='success'>Product Deleted</Message>}
  {loading?<Loader/>:error?(<Message variant='danger'>{error}</Message>):(<Table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {products.map((product)=>(
            <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>	${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/	${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={(e)=>deleteHandler(product._id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
            </tr>
        ))}
    </tbody>
  </Table>)}
  </>);
};

export default ProductListScreen;
