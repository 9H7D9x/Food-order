import React ,{children}from 'react'
import { createContext ,useReducer} from 'react'

const CartContext =createContext({
   items:[],
   addItem:(item)=>{},
   removeItem:(id)=>{}
});


function CartReducer(state, action){
    if(action.type =="ADD_ITEM"){
        //update the state to add a meal item
        const existingCartItemindex=state.items.findIndex(
            (item)=>item.id===action.item.id
        );


        const updatedItems=[...state.items];


        if(existingCartItemindex>-1){
            const existingCartItem=state.items[existingCartItemindex];
             const updatedItem={
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
             }
             updatedItems[existingCartItemindex]=updatedItem;
        }else{
             updatedItems.push({...action.item, quantity:1})
        }

        return{...state , items:updatedItems};
    }


    if(action.type =="REMOVE_ITEM"){
        //removed item from the state

        const existingCartItemindex=state.items.findIndex(
            (item)=>item.id===action.id
        );

        const existingCartItem= state.items[existingCartItemindex];

        const updatedItems=[...state.items];

        if(existingCartItem.quantity===1){
           updatedItems.splice(existingCartItemindex , 1);
        }else{
            const updatedItem ={
                ...existingCartItem,
                quantity: existingCartItem.quantity-1
            }
            updatedItems[existingCartItemindex]=updatedItem;
        }
        return{...state , items:updatedItems};

    }
    return state;
}



export const CartContextProvider = ({children})=>{
    const [cart, dispatchCartAction] =useReducer(CartReducer , { items:[] });

    
    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM' , item})
    }

    function removeItem(id){
        dispatchCartAction({type:'REMOVE_ITEM' , id})
    }

    const cartContext ={
        items:cart.items,
        addItem,
        removeItem,
    }
    console.log(cartContext);

    return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    )
}

export default CartContext;