import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import Home from "./components/home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Welcome from "./components/got-to-menu";
import FoodItems from "./components/food-items";
import Checkout from "./checkout";
import { CartProvider } from "./components/cartContext";



function App() {



  return (
    <CartProvider >
      <div>
        <Router>
          <Header />
          {/* <Home/> */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/menu" element={<FoodItems />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
