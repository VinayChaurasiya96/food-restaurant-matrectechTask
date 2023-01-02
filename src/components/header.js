import React, {useEffect, useState} from "react";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useNavigate} from "react-router-dom";

import CartContext from './cartContext';
import { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = () => {
   
   const isLoggedIn = JSON.parse(localStorage.getItem("userLoginData"))
    const navigate = useNavigate(); 
   

  // const [cartChange, setCartChange] = useState(0);
  const [cartPopUp, setCartPopUp] = useState(false);
  const {cart,addProductToCart, removeProductToCart }= useContext(CartContext);


  // window.addEventListener("storage", () => {
  //   setCartChange(cartChange + 1);
  // });
  // const cartData = JSON.parse(localStorage.getItem("cart"));
  // let totalCartPrice  = 0;
  //  cartData.map((product)=>
  //     totalCartPrice = totalCartPrice+Number(product.price)

  //  )
 


  const showCartItems = () => {
    setCartPopUp(true);
  };

  const hideCartItem = ()=>{
    setCartPopUp(false);
  }

  const gotToCheckout = ()=>{

    navigate('/checkout')
    setCartPopUp(false);
  }
  const  cartQuantity = () => {
    var totalQuantity = 0;
    cart.forEach((item, i)=>{
      totalQuantity += item.quantity
    });
    return totalQuantity;
  }

  const findTotalPrice = ()=> {
    var totalPrice = 0;
    cart.forEach((item,i)=>{
      totalPrice += (item.quantity * parseInt(item.price))
    })
    return totalPrice
  }

  const logout = ()=>{
    localStorage.removeItem("userLoginData")
    navigate('/')
  }

  return (
    <>
      <div className="header-main">
        <div className="left-content">
          <img src="/assets/restaurant_48px.svg" alt="logo" />
          <p>Food's Restaurant</p>
        </div>
        <div className="right-content">
          
           {
            isLoggedIn ?
             <>
             <button onClick={logout}>Logout</button>
             <span className="cartIcon" onClick={showCartItems}>
             <i className="fa-solid fa-cart-shopping"></i>
             </span>
             <span className="item-counts"  onClick={showCartItems}>{cartQuantity()}</span>
             </>
             : ''
           }
          
        </div>
      </div>

      {cartPopUp && (
        <>
          <div onClick={() => setCartPopUp(false)} className="backDrop"></div>
          <div className="cartItems">
            <ul>
              {cart.map((product, i) => (
                <li key={i}>
                 
                    <div className="items-details">
                      <div className="item-flex">
                        <p>{product.name}:</p>
                        <p>{product.quantity}</p>
                        
                        <div className="card-buttons checkout">
                          <button
                              onClick={() => addProductToCart(product)}
                              className="plus checkout"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeProductToCart(product)}
                              className="minus  color-danger checkout"
                            >
                              -
                            </button>
                       </div>
                      </div>
                     
                    </div>
                    
                    
                  
                </li>
              ))}
               <div className="total-price-cart">
                  <p>Total(INR): {findTotalPrice()} </p>
                </div>
              <div className="checkout-block ">
                <button onClick={gotToCheckout}>SAVE AND CHECKOUT</button>
                <a onClick={hideCartItem} href="#">Cancel</a>
              </div>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
