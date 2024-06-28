import React, { useContext } from 'react'
import CartContext from '../Store/CartContext'
import Modal from './UI/Modal';
import { currencyFormater } from '../utils/formatting';
import Button from './UI/Button';
import Input from './UI/Input'
import UserProgressContext from '../Store/UserProgressContext';
import useHttp from '../Hook/useHttp';

const  requestConfig={
    method:'Post' ,
            header:{
                'content-Type':'application/json'
            }
}


const CheckOut = () => {
    const cartCtx=useContext(CartContext);
    const userProgressCtx=useContext(UserProgressContext);

    const {
        data, 
        isLoading:isSending, 
        error, 
        sendRequest,
        clearData
    }=useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal =cartCtx.items.reduce((totalPrice ,item )=>
    totalPrice+item.quantity* item.price, 
    0)

    function handleClose(){
        userProgressCtx.hideCheckout();
    }
    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart()
        clearData();
    }

    function handleGoToCheckOut(){
        userProgressCtx.showCheckout();
    }
     function handleSubmit(event){
        event.preventDefault();

        const fd =new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(Json.stringfy({
            order:{
                items: cartCtx.items,
                customer:customerData
            },
        }));

        // fetch('http://localhost:3000', {
        //     method:'Post' ,
        //     header:{
        //         'content-Type':'application/json'
        //     },
        //     body: Json.stringfy({
        //         order:{
        //             items: cartCtx.items,
        //             customer:customerData
        //         },
        //     })

        // })
     }
      let actions=(
        <>
         <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button onClick={handleGoToCheckOut}>Submit Order</Button></>
       
      );

      if(isSending){
        actions=<span>Sending order data...</span>
      }

      if(data && !error){
        return(
            <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose}>
                <h2>Success</h2>
                <p>Order was submitted successfully</p>
                <p>We will get back in few minutes via email within few minute</p>
                <p className='odal-actions'>
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
      }
  return (
    <Modal open={userProgressCtx.progress==="checkout"} onClose={handleClose} >
        <form onSubmit={handleSubmit}>
            <h2>CheckOut</h2>
            <p>TotalAmount:{currencyFormater.format(cartTotal)}</p>
           <Input label="full Name" type='text' id="name"/>
           <Input label="E-Mail Address" type='text' id="email"/>
           <Input label="street" type='text' id="street"/>
           <div className='control-row'>
           <Input label="Postal Code" type='text' id="postal-code"/>
           <Input label="city" type='text' id="city"/>
           </div>
           {error && <Error title="Failed to submit order" message={error}/>}
           <p className='modal-actions'>
            {actions}
           </p>
        </form>
    </Modal>
  )
}

export default CheckOut