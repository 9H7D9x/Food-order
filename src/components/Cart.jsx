import React from 'react'
import { useContext } from 'react'
import CartContext from '../Store/CartContext'
import { currencyFormater } from '../utils/formatting'
import Button from './UI/Button'
import UserProgressContext from '../Store/UserProgressContext'

const Cart = () => {
    const cartctx =useContext(CartContext);
    const userProgressCntx =useContext(UserProgressContext);

    const cartTotal= cartctx.items.reduce(
        (totalPrice ,item)=> totalPrice + item.quantity*item.price
        , 0);

     function handleClose(){
        userProgressCntx.hideCart();
     }   

  return (
    <Modal className="cart" open={userProgressCntx.progress==='cart'}>
        <h2>Your Cart</h2>
        <ul>{cartctx.items.map(item=>(
        <li key={item.id}>{item.name}-{item.quantity}
        </li>
        ))}
        </ul>
        <p className='cart-total'>
            {currencyFormater.format(cartTotal)}
        </p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleClose}>Close</Button>
            <Button>Go to Checkout</Button>
        </p>

    </Modal>
    
  )
}

export default Cart