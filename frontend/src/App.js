 import { Container } from "react-bootstrap"
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import HomeScreen from "./Screens/HomeScreen";


function App() {
  return (
  <>
    <Header></Header>
    <main className="py-3">
      <Container>
        <HomeScreen></HomeScreen>
      </Container>
    </main>
    <Footer></Footer>

  </>
 
  
    
  );
}

export default App;
