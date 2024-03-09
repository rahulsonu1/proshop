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
 


function App() {
  return (
  <>
    <Header></Header>
    <main className="py-3">
      <Container>
        <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/product/:id" element={<ProductScreen/>} />
        <Route path="/cart/:id?" element={<CartScreen/>}></Route>
        <Route path="/login" element={<LoginScreen></LoginScreen>}></Route>
        <Route path="/register" element={<RegisterScreen></RegisterScreen>}></Route>
        <Route path="/profile" element={<ProfileScreen></ProfileScreen>}></Route>
      
        </Routes>
      </Container>
    </main>
    <Footer></Footer>

  </> 
  );
}

export default App;
