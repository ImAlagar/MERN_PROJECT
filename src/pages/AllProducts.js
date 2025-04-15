import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
const AllProducts = () => {
  
  const [openUploadProduct,setOpenUploadProduct] = useState(false);

  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async()=>{
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()

      console.log("product data",dataResponse);

      setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
        <div className='bg-white py-2 px-4 flex justify-between items-center'>
           <h2 className='font-bold text-lg'>All Products</h2>
           <button className='border-2 border-red-500  text-red-600 hover:bg-red-600 transition-all hover:text-white py-2 px-4 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Products</button>
        </div>
        
        {/* All Product */}

        <div className='flex flex-wrap items-center gap-5 py-4 h-[calc(100vh-190px)] overflow-y-auto'>
          {
            allProduct.map((product,index)=>{
               return (
                <AdminProductCard data={product} key={index+ "allproduct"} fetchData={fetchAllProduct}/>
               )
            })
          }

        </div>







        {/* upload product component */}

        {
          openUploadProduct && (
            <UploadProducts onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
          )
        }


        
    </div>
  )
}

export default AllProducts