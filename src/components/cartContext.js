import { createContext,useState } from "react";

const CartContext = createContext();
export function CartProvider({ children }){
    const [cart, setCart] = useState([]);

   
      
        const  addProductToCart = (product) =>{
           
          var itemProduct = cart.find(item => item.name === product.name);
          if(itemProduct){
            itemProduct.quantity += 1
          }else{
            itemProduct = {...product, quantity : 1};
            cart.push(itemProduct);
          }
          setCart([...cart]);
          
        }
      
        const  removeProductToCart = (product) =>{
            var itemProduct = cart.find(item => item.name === product.name);
            if(itemProduct){
                if(itemProduct.quantity > 1){
                    itemProduct.quantity -= 1
                }else{
                    const index = cart.indexOf(itemProduct);
                    if (index > -1) { 
                        cart.splice(index, 1); 
                    }
                }
              
            }
            setCart([...cart]);
            
        }

    return (
        <CartContext.Provider value={{ cart, addProductToCart, removeProductToCart}}>  {children}  </CartContext.Provider>
    )
}
export default CartContext;