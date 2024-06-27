import React from 'react'
import logoImg from "../assets/logo.jpg"
import Button from './UI/Button'
import { useContext } from 'react'
import CartContext from '../Store/CartContext'
import UserProgressContext from '../Store/UserProgressContext'

const Header = () => {
    const cartCntx=useContext(CartContext);
    const userProgressCtx =useContext(UserProgressContext);

    
    const totalCartItems= cartCntx.items.reduce((totalNumberItems ,item)=>{
         return totalNumberItems+ item.quantity;
    },0);

    const handleShowCart=()=>{
        userProgressCtx.showCart();
    }

  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A resturtant"/>
            <h1>SliceFood</h1>
        </div>
        <nav>
        <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
        </nav>
        
    </header>
  )
}

export default Header