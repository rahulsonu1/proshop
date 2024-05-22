import { Container } from "react-bootstrap"
import {Routes,Route} from 'react-router-dom'
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";



function App() {
  return (
  <>
    <Header></Header>
    <main className="py-3">
      <Container>
        <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/search/:keyword"   Route/>
        <Route path="/product/:id" element={<ProductScreen/>} />
        <Route path="/cart/:id?" element={<CartScreen/>}></Route>
        <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
        <Route path="/register" element={<RegisterScreen></RegisterScreen>}></Route>
        <Route path="/profile" element={<ProfileScreen></ProfileScreen>}></Route>
        <Route path="/shipping" element={<ShippingScreen/>}></Route>
        <Route path="/payment"  element={<PaymentScreen></PaymentScreen>}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen></PlaceOrderScreen>}></Route>
        <Route path="/order/:id" element={<OrderScreen></OrderScreen>}></Route>
        <Route path='/admin/userlist' element={<UserListScreen></UserListScreen>}></Route>
        <Route path="/admin/user/:id/edit" element={<UserEditScreen></UserEditScreen>}></Route>
        <Route path="/admin/productlist" element={<ProductListScreen></ProductListScreen>}></Route>
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen></ProductEditScreen>}></Route>
        <Route path="/admin/orderlist" element={<OrderListScreen></OrderListScreen>}></Route>
      
      
        </Routes>
      </Container>
    </main>
    <Footer></Footer>

  </> 
  );
}

export default App;
