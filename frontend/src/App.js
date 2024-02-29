import { Container } from "react-bootstrap"
import {Routes,Route} from 'react-router-dom'
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
 


function App() {
  return (
  <>
    <Header></Header>
    <main className="py-3">
      <Container>
        <Routes>
        <Route path="/" element={<HomeScreen/>} exact/>
        <Route path="/product/:id" element={<ProductScreen/>} />
        </Routes>
      </Container>
    </main>
    <Footer></Footer>

  </> 
  );
}

export default App;
