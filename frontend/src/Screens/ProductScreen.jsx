import React,{useState,useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../Component/Rating'
import axios from 'axios'


const ProductScreen = () => {
    const { id } = useParams();
    const [product,setProduct]=useState([])

    useEffect(()=>{
      const findproduct=async ()=>{
        const {data}=await axios.get(`/api/products/${id}`)
        setProduct(data)
      }
      findproduct()
    },[])

    


  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>Go Back</Link>
      <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name}fluid></Image>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroupItem>
                  <Rating value={product.rating} text={`${product.numReviews}reviews`}></Rating>
                </ListGroupItem>
                <ListGroupItem>
                  Price:${product.price}
                </ListGroupItem>
                <ListGroupItem>
                  Description:{product.description}
                </ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
          <Card> 
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                  Price:
                  </Col>
                  <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                  Status:
                  </Col>
                  <Col>{product.countInStock>0?'In Stock':'Out Of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn-block' type='button' disabled={product.countInStock===0}>Add To Cart</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
