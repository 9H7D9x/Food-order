import React, { useEffect, useState } from 'react'


async function sendHttpRequest(url ,config){
   const response= await fetch(url ,config)
   const responseData = await response.json();

   if(!response.ok){
    throw new error(responseData.message || "something went wrong failed to send Request");
   }

   return responseData;

}


const useHttp = (url,config ,intialData) => {
    const [data , setData]=useState(intialData);
    const [isLoading , setIsLoading]=useState(false);
    const [error , setError]=useState();

    const sendRequest=useCallback(
        async function sendRequest(){
        setIsLoading(true);
        try{
           const responseData= await sendHttpRequest(url,config);
           setData(responseData);
        }catch(error){
            setError(error.message || "something went wrong")
        }
        setIsLoading(false);
    },[url,config])

    useEffect(()=>{
        if((config && ( config.method==="GET"|| !config.method ))|| !config){
            sendRequest();
        }
       
    },[sendRequest, config])
        
  return (
   data,
   isLoading,
   error,
   sendRequest
  )
}

export default useHttp