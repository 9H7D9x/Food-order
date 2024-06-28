import React, { useState ,useEffect} from 'react'
import MealItem from './MealItem';
import useHttp from '../Hook/useHttp';

const requestConfig={};

const Meals = () => {
    // const [loadedMeals , setloadedMeals]=useState([]);
   const {
    isLoading ,
    data :loadedMeals,
    error
    }= useHttp('http://localhost:3000/meals', requestConfig ,[]);

    if(isLoading){
       return <p className='center'>fetching meals....</p>
    }

    if(error){
        return <Error title="Failed to fetch meals" message={error}/>
    }

    // if(!data){
    //    return <p>No Meals Found</p>
    // }


    // useEffect(()=>{

    //    async function fetchMeals(){
        
    //         const response= await fetch('http://localhost:3000/meals');

    //         if(!response.ok){

    //         }
    //         const meals =await response.json();
    //         console.log(meals);
    //         setloadedMeals(meals);
        
           
    //     }
    //     fetchMeals();
       
       
       

    // },[]);
  return (
    <ul id="meals">{loadedMeals.map((meal)=>(
         <MealItem key={meal.id} meal={meal}/>
        ))}</ul>
  )
}

export default Meals