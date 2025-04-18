import React, { useEffect, useState } from 'react'
import image1 from "../assest/banner/img1.webp"
import image2 from "../assest/banner/img2.webp"
import image3 from "../assest/banner/img3.jpg"
import image4 from "../assest/banner/img4.jpg"
import image5 from "../assest/banner/img5.webp"


import image1Mobile from "../assest/banner/img1_mobile.jpg"
import image2Mobile from "../assest/banner/img2_mobile.webp"
import image3Mobile from "../assest/banner/img3_mobile.jpg"
import image4Mobile from "../assest/banner/img4_mobile.jpg"
import image5Mobile from "../assest/banner/img5_mobile.png"

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";


const BannerProduct = () => {

  const[currentImgae,setCurrentImage] = useState(0)
  
  const desktopImages = [
    image1,
    image2, 
    image3,
    image4,
    image5

  ]
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,

  ]

  const nextImage = (() =>{

    if(desktopImages.length-1 > currentImgae){
      setCurrentImage(preve => preve + 1)

    }

  })

  const preveImage = (() =>{
    if(currentImgae !== 0){
      setCurrentImage(preve => preve - 1)

    }

  })


  useEffect(()=>{
    const intervel = setInterval(()=>{
      if(desktopImages.length-1 > currentImgae){
         nextImage()
      }else{
        setCurrentImage(0)
      }
         
    },5000)

    return ()=> clearInterval(intervel)

  },[currentImgae,desktopImages.length,nextImage]);

  return (
    <div className='container mx-auto px-4 rounded '>
       <div className='h-60 lg:h-72 w-full bg-slate-200 relative'>
           <div className='absolute z-10 w-full h-full md:flex items-center hidden  '>
               <div className=' flex justify-between w-full text-2xl'>
                  <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                  <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
               </div> 
           </div>

           {/* Desktop and tablet version images */}
            <div className='hidden md:flex h-full w-full overflow-hidden '>
                {
                    desktopImages.map((imageUrl,index)=>{
                      return(
                          <div className=' w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform : `translateX(-${currentImgae * 100}%)`}}>
                              <img src={imageUrl} alt="image1" className='w-full h-full' />
                          </div>
                      )
                    })
                  }
            </div>


             {/* mobile version images */}
             <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                    mobileImages.map((imageUrl,index)=>{
                      return(
                          <div className=' w-full h-full min-w-full min-h-full transition-all' key={imageUrl} style={{transform : `translateX(-${currentImgae * 100}%)`}}>
                              <img src={imageUrl} alt="image1" className=' w-full h-full object-cover' />
                          </div>
                      )
                    })
                  }
            </div>
       </div>
    </div>
  )
}

export default BannerProduct