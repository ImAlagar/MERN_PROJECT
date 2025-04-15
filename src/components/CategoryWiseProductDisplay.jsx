import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
const CategoryWiseProductDisplay = (
    {
    category,
    heading
    }
)=> {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id) =>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }


  
    const fetchData = async ()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
         setLoading(false)
        //  console.log("vertical data",categoryProduct.data);
         setData(categoryProduct?.data)
    } 
    useEffect(()=>{
        fetchData()
    },[])

  

  return (
    <div className='container mx-auto px-4 my-6 relative'>
            
            <h2 className='text-2xl font-semibold py-4 '>{heading}</h2>

          <div className=' grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between scrollbar-none md:gap-6 overflow-scroll scrllobar-none transition-all' >

               
              {
                
                loading ? (
                    loadingList.map((product,index)=>{
                        return (
     
                             <div className=' w-full  min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px]  bg-white rounded-sm shadow-md '>
                                 <div className='bg-slate-200 h-56 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>                                     
                                 </div>
                                 <div className='p-3 grid gap-3'>
                                     <h2 className=' font-medium text-base md:text-md text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                     <p className=' capitalize text-slate-500 p-1 py-2 animate-pulse rounded-full bg-slate-200'></p>
                                     <div className='flex gap-5'>
                                         <p className='text-red-500 font-medium p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                         <p className='text-slate-500 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                                     </div>
                                     <button className='  text-sm  items-center pb-2 px-2 py-0.8 py-2  rounded-full bg-slate-200'></button>
                                 </div>
                             </div>
                        )
                     })
                ) : (
                    data.map((product,index)=>{
                        return (
     
                             <Link to={"product/"+product?._id}  className=' w-full  min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px]  bg-white rounded-sm shadow-md '>
                                 <div className='bg-slate-200 h-56 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                     <img src={product?.productImage[0]} alt="" className= ' mix-blend-multiply object-scale-down  h-full hover:scale-110 transition-all cursor-pointer' />
                                     
                                 </div>
                                 <div className='p-3 grid gap-3'>
                                     <h2 className=' font-medium text-base md:text-md text-ellipsis line-clamp-1 text-black '>{product?.productName}</h2>
                                     <p className=' capitalize text-slate-500'>{product?.category}</p>
                                     <div className='flex gap-2'>
                                         <p className='text-red-500 font-medium'>{displayINRCurrency( product?.sellingPrice)}</p>
                                         <p className='text-slate-500 line-through'>{displayINRCurrency( product?.price)}</p>
                                     </div>
                                     <button className='bg-red-500 hover:bg-gradient-to-t from-cyan-500 to-blue-500 text-sm text-white items-center pb-2 px-2 py-0.8  rounded-full'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to cart</button>
                                 </div>
                             </Link>
                        )
                     })
                )

             
            }
          </div>

       
    </div>
  )
}

export default CategoryWiseProductDisplay