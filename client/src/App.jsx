import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import Verify from "./pages/Verify";

function App() {

  return (
    <>
      <div >
        <ToastContainer />
        <NavBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/verify" element={<Verify />} />
          
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
