import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBarComp from "./Components/NavBarComp/NavBarComp";
import Books from "./Components/Books/Books";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import Orders from "./Components/Orders/Orders";
import Home from "./Components/Home/Home";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    < div className="App">
      <header className="App-header">
        <NavBarComp />
      </header>
      <div className="App-Body">
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/book" element={<Books/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
