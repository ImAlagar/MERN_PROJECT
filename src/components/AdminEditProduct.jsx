import React,{useState} from 'react'
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'
import { IoClose } from "react-icons/io5";


const AdminEditProduct = ({
    onClose,
    productData,
    fetchData
}) => {
   
    const [data,setData] = useState({
        ...productData,
        productName:productData?.productName,
        brandName:productData?.brandName,
        category:productData?.category,
        productImage:productData?.productImage || [],
        description:productData?.description,
        price:productData?.price,
        sellingPrice:productData?.sellingPrice,

    })

    const [openFullScreenImage,setOpenFullScreenImage] = useState(false);

    const [fullScreenImage,setFullScreenImage,] = useState("");


    // const [uploadProductImageInput,setUploadProductImageInput] = useState("");


const handleOnChange = (e)=>{
  
  const {name,value} = e.target

  setData((preve)=>{
    return {
      ...preve,
      [name] : value
    }
  })

}

const handleUploadProduct = async(e)=>{
    const file = e.target.files[0]
    // setUploadProductImageInput(file.name)
    // console.log("file",file);
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return {
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url ]
      }
    })
    // console.log("upload Image",uploadImageCloudinary.url);
}

const handleDeleteProductImage = async(index)=>{
   
  // console.log("image index",index);

  const newProductImage = [...data.productImage]
  newProductImage.splice(index,1)

  setData((preve)=>{
    return {
      ...preve,
      productImage : [ ...newProductImage]
    }
  })

}


// Upload Prodcut 

const handleSubmit = async(e)=>{
  e.preventDefault()

  // console.log("data",data);

  const response = await fetch(SummaryApi.updateProduct.url,{
    method:SummaryApi.updateProduct.method,
    credentials:'include',
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(data)
  })

  const responseData = await response.json()

  if(responseData.success){
    toast.success(responseData?.message)
    onClose()
    fetchData()
  }
  
  if(responseData.error){
    toast.error(responseData?.message)
  }

}


  return (
    <div className=' fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center '>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
               <h2 className=' font-bold text-lg'>Edit product</h2>
               <div className='w-fit cursor-pointer ml-auto text-2xl hover:text-red-600' onClick={onClose}>
                 <IoClose />
               </div>
            </div>

            <form onSubmit={handleSubmit} className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
                <label htmlFor="productName">Product Name :</label>
                <input 
                  type="text" 
                  id='productName' 
                  name='productName'
                  placeholder='Enter product name ' 
                  value={data.productName} 
                  onChange={handleOnChange}
                  required
                  className='p-2 bg-slate-200 border rounded'
                />

                <label htmlFor="brandName" className='mt-3'>Brand Name :</label>
                <input 
                  type="text" 
                  id='brandName' 
                  name='brandName'
                  placeholder='Enter brand name ' 
                  value={data.brandName} 
                  onChange={handleOnChange}
                  required
                  className='p-2 bg-slate-200 border rounded'
                />

                <label htmlFor="category" className='mt-3'> Category :</label>

                <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-200 border rounded'>
                               <option value={""} >
                                      Select Category
                               </option>

                      {
                        productCategory.map((el,index)=>{
                            return (
                                <option value={el.value} key={el.value + index}>
                                      {el.label}
                               </option>
                            )
                        })
                      }
                    

                </select>

                <label htmlFor="productImage" className='mt-3'> Product Image :</label>

                <label htmlFor='uploadImageInput'>
                  <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                    
                       <div className='text-slate-500 flex flex-col justify-center items-center gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt /></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type="file" id='uploadImageInput' className='hidden'  onChange={handleUploadProduct}/>
                       </div>
                    
                   </div>
                </label>

                <div>
                  {
                    data?.productImage[0] ?(
                       <div className='flex items-center gap-2'>
                         {
                           data.productImage.map((el,index) =>{
                            return (

                              <div className='relative group'>
                                     <img 
                                       src={el} 
                                        alt={el}
                                       width={80} 
                                       height={80} 
                                       className='bg-slate-100 border cursor-pointer' 
                                       onClick={()=>{
                                       setOpenFullScreenImage(true)
                                       setFullScreenImage(el)
                                       }} 
                                      /> 
                                      <div className=' absolute bottom-0 right-0 p-1 cursor-pointer text-white bg-red-500 rounded-full hidden group-hover:block' onClick={()=>handleDeleteProductImage(index)}>
                                        <MdDelete />

                                      </div> 
                              </div>
                            
                            )
                          }) 
                         }
                       </div>           
                    ) : (
                      <p className='text-red-600 text-xs'>* Please Upload Product imgae</p>
                    )
                  }
                </div>   

                <label htmlFor="price" className='mt-3'> Price :</label>

                <input 
                  type="number" 
                  id='price' 
                  name='price'
                  placeholder='Enter price' 
                  value={data.price} 
                  onChange={handleOnChange}
                  required
                  className='p-2 bg-slate-200 border rounded'
                />

                  <label htmlFor="sellingPrice" className='mt-3'> Selling Price :</label>

                <input 
                  type="number" 
                  id='sellingPrice' 
                  name='sellingPrice'
                  placeholder='Enter selling price' 
                  value={data.sellingPrice} 
                  onChange={handleOnChange}
                  required
                  className='p-2 bg-slate-200 border rounded'
                />

               <label htmlFor="description" className='mt-3'> Description :</label>
               <textarea 
                 rows={3}  
                 className='h-28 bg-slate-200 border p-2'
                 placeholder='Enter product description' 
                 name='description'
                 value={data.description}
                 onChange={handleOnChange}  
                >
                  

               </textarea>



                <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 '>Update Product</button>          
            </form>
          

        </div>
         {/* display image full screen */}
         {
          openFullScreenImage && (
            <DisplayImage onclose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
          )
         }
       
    </div>
  )
}

export default AdminEditProduct