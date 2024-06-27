import React from 'react'
import { useContext } from 'react'
import CartContext from '../Store/CartContext'
import { currencyFormater } from '../utils/formatting'
import Button from './UI/Button'
import UserProgressContext from '../Store/UserProgressContext'
import Modal from './UI/Modal'
import CartItem from './CartItem'

const Cart = () => {
    const cartCtx =useContext(CartContext);
    const userProgressCtx =useContext(UserProgressContext);

    const cartTotal= cartCtx.items.reduce(
        (totalPrice, item)=> totalPrice + item.quantity*item.price
        , 0);

     function handleCloseCart(){
        userProgressCtx.hideCart();
     }   
     function handleGoToCheckout(){
        userProgressCtx.showCheckout();
     }

  return (
    <Modal className="cart" 
           open={userProgressCtx.progress === 'cart'} 
           onClose={userProgressCtx.progress === 'cart'? handleCloseCart:null}>
        <h2>Your Cart</h2>
        <ul>{cartCtx.items.map(item=>(
            <CartItem key={item.id} name={item.name} quantity={quantity} price={price}  
            onIncrease={()=>cartCtx.addItem(item)} 
            onDecrease={()=>cartCtx.removeItem(item.id)}/>
        // <li key={item.id}>{item.name}-{item.quantity}
        // </li>
        ))}
        </ul>
        <p className='cart-total'>
            {currencyFormater.format(cartTotal)}
        </p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length>0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            
        </p>

    </Modal>
    
  )
}

export default Cart