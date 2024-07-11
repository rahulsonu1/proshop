import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { productListAction } from '../store/productList'
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import Product from '../Component/Product'
import Loader from '../Component/Loader'
import Message from '../Component/Message'
import ProductCarousel from '../Component/ProductCarousel';




const HomeScreen = () => {
  const {keyword}=useParams()
  const dispatch = useDispatch(); 
  const {products,error,loading} = useSelector((state) => state.productList); 

  useEffect(() => {
    const fetchProducts = async (keyword="") => {
      dispatch(productListAction.productListRequest()); 
      try {
        const { data } = await axios.get(`/api/products/?keyword=${keyword}`);
        dispatch(productListAction.productListSuccess(data)); 
      } catch (error) {
        dispatch(productListAction.productListFail(error.message)); 
      }
    };

    fetchProducts(keyword);
  }, [dispatch,keyword]);

  return (
    <>
    {!keyword && <ProductCarousel></ProductCarousel>}
      <h1>Latest Products</h1>
      {loading?<Loader>{loading}</Loader>:error?(<Message variant='danger'>{error}</Message>):(<Row>
        {products.map((product)=>
        (<Col sm={12} md={16} lg={4} xl={3} >
          <Product key={product.id} product={product}></Product>
        </Col>))}
      </Row>)}
      
    </>
  )
}

export default HomeScreen
