import React, { useState } from "react";
import data from "./feeds.json";
import CartContext from './cartContext';
import { useContext,useEffect } from "react";
import { useNavigate } from 'react-router-dom'


function FoodItems() {

  const {cart,addProductToCart, removeProductToCart }= useContext(CartContext);
  const isLoggedIn = JSON.parse(localStorage.getItem("userLoginData"))
    const navigate = useNavigate(); 
    useEffect(()=>{
      if(!isLoggedIn){
        navigate('/');
      }
    })

  const isAddedToCart = (product) => {
    return cart.find(item => item.name === product.name);
    
  }

 const findCost = (product)=>{
    const actuallCost = parseInt(product.price)
    const quantity = cart.find(item => item.name === product.name).quantity;
    return actuallCost * quantity;
 }
 const findTotal = (product)=>{
  return cart.find(item => item.name === product.name).quantity;
 }
  
  return (
    <div className="items-main">
      <div className="center-cards-main">
        <div className="items-center">
          {data.map((products, i) => 
            
              
                <div className="product-card" key={i}>
                  {/* <img src="/assets/burger.jpeg" /> */}
                  <img src={`/assets/${products.image}`} />
                  <div>
                    <p  className="pr-name">{products.name}</p>
                    <p>Price:{products.price}</p>
                    {
                      isAddedToCart(products)?
                      <>
                        <p>Total: {findTotal(products)}</p>
                        <p>Cost (INR): {findCost(products)}</p>
                      </>
                      :''
                    }
                  
                    <div className="card-buttons margi-bottom food-items">
                      <button onClick={()=>addProductToCart(products)} className="plus food-items">+</button>
                      {
                        isAddedToCart(products)
                         ?  <button onClick={()=>removeProductToCart(products)} className="minus food-items"  >-</button>
                        :  <button  className="minus food-items" disabled >-</button>

                      }
                     
                    </div>
                  </div>
                </div>
             
            
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItems;
