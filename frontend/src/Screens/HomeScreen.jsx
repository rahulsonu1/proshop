import React,{useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import Product from '../Component/Product'


const HomeScreen = () => {
  const [products,setProducts]=useState([])
  useEffect(()=>{
    const fetchProducts=async function(){
      const {data}=await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  },[])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product)=>
        (<Col sm={12} md={16} lg={4} xl={3}>
          <Product  product={product}></Product>
        </Col>))}
      </Row>
    </>
  )
}

export default HomeScreen
