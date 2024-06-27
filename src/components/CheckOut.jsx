import React, { useContext } from 'react'
import CartContext from '../Store/CartContext'
import Modal from './UI/Modal';
import { currencyFormater } from '../utils/formatting';
import Button from './UI/Button';
import Input from './UI/Input'
import UserProgressContext from '../Store/UserProgressContext';


const CheckOut = () => {
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);

    const cartTotal =cartCtx.items.reduce((totalPrice ,item )=>
    totalPrice+item.quantity* item.price, 
    0)

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    function handleGoToCheckOut(){
        userProgressCtx.showCheckout();
    }

  return (
    <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
        <form>
            <h2>CheckOut</h2>
            <p>TotalAmount:{currencyFormater.format(cartTotal)}</p>
           <Input label="full Name" type='text' id="full-name"/>
           <Input label="E-Mail Address" type='text' id="email"/>
           <Input label="street" type='text' id="street"/>
           <div className='control-row'>
           <Input label="Postal Code" type='text' id="postal-code"/>
           <Input label="city" type='text' id="city"/>
           </div>
           <p className='modal-actions'>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button onClick={handleGoToCheckOut}>Submit Order</Button>
           </p>
        </form>
    </Modal>
  )
}

export default CheckOut