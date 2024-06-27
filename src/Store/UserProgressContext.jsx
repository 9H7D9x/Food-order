import React, { useState } from 'react'
import { createContext ,useReducer} from 'react'

const UserProgressContext = createContext({
    progress:'',
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
})

export  const UserProgressContextProvider =({children})=>{
    const [userProgress , setUserProgress]=useState('');

    function showCart(){
        setUserProgress('cart')
    }
    function hideCart(){
        setUserProgress('')

    }
    function showCheckout(){
        setUserProgress('checkout')
    }
    function hideCheckout(){
        setUserProgress('')
    }

    const userProgressCntx= {
         progress: userProgress,
         showCart,
         hideCart,
         showCheckout,
         hideCheckout
    }

    return (
        <UserProgressContextProvider value={userProgressCntx}>{children}</UserProgressContextProvider>
    )

} 
 

export default UserProgressContext