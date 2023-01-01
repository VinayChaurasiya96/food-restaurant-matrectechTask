import React, {useEffect, useState} from "react";

const Header = () => {
  const [cartChange, setCartChange] = useState(0);
  const [cartPopUp,setCartPopUp] = useState(false);
  window.addEventListener("storage", () => {
    setCartChange(cartChange + 1);
  });
  const cartData = JSON.parse(localStorage.getItem("cart"));
 
  const products = {};
  const reducedProducts = [];
  if(cartData)
  {
    cartData.forEach((p, i) => {
      p["quantity"] = 1;
    });
  
   
    cartData.forEach((prd, idx) => {
      if (products[prd.name]) {
        prd.quantity += products[prd.name].quantity;
        products[prd.name].quantit = prd.quantity;
        reducedProducts[products[prd.name].index] = prd;
      } else {
        products[prd.name] = {index: idx, quantity: prd.quantity};
        reducedProducts.push(prd);
      }
    });
  }

  // add product
  const addProduct = (product) => {
    window.dispatchEvent(new Event("storage"));
    const previousProducts = JSON.parse(localStorage.getItem("cart"));
    if (previousProducts) {
      localStorage.setItem(
        "cart",
        JSON.stringify([...previousProducts, product])
      );
    } else {
      localStorage.setItem("cart", JSON.stringify([product]));
    }
  };
  /* delete product */
  const deleteProduct = (product) => {
    window.dispatchEvent(new Event("storage"));
    const allProducts = JSON.parse(localStorage.getItem("cart"));
    if (allProducts.length > 0) {
      const dltProduct = allProducts.find((item) => item.name === product.name);
      const index = allProducts.indexOf(dltProduct);
      if (index > -1) {
        allProducts.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(allProducts));
    } else {
      alert("cart is empty");
    }
  };

  const showCartItems = () => {
    setCartPopUp(true)
  };

  return (
    <>
      <div className="header-main">
        <div className="left-content">
          <img src="/assets/restaurant_48px.svg" alt="logo" />
          <p>Food's Restaurant</p>
          {cartData?.length > 0 && (
            <span className="cartIcon" onClick={showCartItems}>
              {cartData.length}
            </span>
          )}
        </div>
      </div>
      
       
        <>
          <div onClick={()=>setCartPopUp(false)} className="backDrop" ></div>
          <div className="cartItems">
            <ul>
              {reducedProducts.map((product, i) => (
                <li key={i}>
                  {product.name}
                  <p>{product.quantity}</p>
                  <div className="card-buttons">
                    <button
                      onClick={() => addProduct(product)}
                      className="plus"
                    >
                      +
                    </button>
                    <button
                      onClick={() => deleteProduct(product)}
                      className="minus"
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      
    </>
  );
};

export default Header;
