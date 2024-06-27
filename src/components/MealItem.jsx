import React from 'react'
import { currencyFormater } from '../utils/formatting'
import Button from './UI/Button'
import { useContext } from 'react'
import  CartContext  from '../Store/CartContext'

const MealItem = ({meal}) => {
    const cartCtx =useContext(CartContext);

    function handleAddMealIntoCart(){
         cartCtx.addItem(meal);
     }
  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}></img>
            <div className=''>
                <h3>
                   {meal.name}
                </h3>
                <p className='meal-item-price'>{currencyFormater.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-action'>
                <Button onClick={handleAddMealIntoCart}>Add to Cart</Button>
            </p>
        </article>

    </li>
  )
}

export default MealItem