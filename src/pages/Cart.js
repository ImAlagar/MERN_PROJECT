import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'

const Cart = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)

 const fetchData = async() =>{
  setLoading(true)
   const response = await fetch(SummaryApi.addToCartProductView.url,
     {
      method : SummaryApi.addToCartProductView.method,
      credentials : 'include',
      headers : {
        "content-type" : 'application/json'
      },
      
     })
   
     const responseData = await response.json()

     if (responseData.success){
      setData(responseData.data)
     }

 }


 useEffect(()=>{
   fetchData()
 },[])

 console.log("cart data", data);
 
  return (
    <div className=' container mx-auto'>
      
      <div className='text-center text-lg my-3'>
      {
        data.length === 0 && !loading && (
          <p className='bg-white py-5'>No data</p>
        )
       }
      </div>
      <div>
        {/* View product */}
          <div>
              {
                loading ? (
                    <div className=' w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse'>

                    </div>
                ) : (
                   <div></div>
                )
              }
          </div>
      </div>

    </div>
  )
}

export default Cart