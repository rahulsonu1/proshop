// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Carousel, Image } from "react-bootstrap";
// import Loader from "./Loader";
// import Message from "./Message";
// import { topProductsAction } from "../store/topProducts";
// import { useDispatch, useSelector } from "react-redux";

// import axios from "axios";

// const ProductCarousel = () => {
//   const dispatch = useDispatch();

//   const { loading, products, error } = useSelector((state) => state.topProduct);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         dispatch(topProductsAction.topProductRequest());

//         const { data } = await axios.get(`/api/products/top`);
//         dispatch(topProductsAction.topProductSuccess(data));
//       } catch (error) {
//         dispatch(
//           topProductsAction.topProductFail(
//             error.response && error.response.data.message
//               ? error.response.data.message
//               : error.message
//           )
//         );
//       }
//     }
//     fetchProduct();
//   });

//   return (
//     <div>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
//         <Carousel pause="hover" className="bg-dark">
//           {products.map((product) => {
//             <Carousel.Item key={product._id}>
//               <Link to={`/product/${product._id}`}>
//                 <Image src={product.image} alt={product.name} fluid></Image>
//                 <Carousel.Caption className="carousel-caption">
//                   <h2>{product.name} {product.price}</h2>
//                 </Carousel.Caption>
//               </Link>
//             </Carousel.Item>;
//           })}
//         </Carousel>
//       )}
//     </div>
//   );
// };

// export default ProductCarousel;



import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { topProductsAction } from "../store/topProducts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.topProduct);
  console.log(products)

  useEffect(() => {
    async function fetchProduct() {
      try {
        dispatch(topProductsAction.topProductRequest());

        const { data } = await axios.get(`/api/products/top`);
        dispatch(topProductsAction.topProductSuccess(data));
      } catch (error) {
        dispatch(
          topProductsAction.topProductFail(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      }
    }
    fetchProduct();
  }, [dispatch]); 

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/products/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} ({product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProductCarousel;
