import React, { useContext, useState } from "react"
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import {toast} from 'react-toastify'

import {setUserDetails} from '../store/userSlice'
import ROLE from "../common/role";
import Context from "../context";
 
const Header = () => {

  const user = useSelector(state => state?.user?.user)
  // console.log("userheader",user);

  const dispatch = useDispatch()

 
  const [menuDisplay, setMenuDisplay] = useState(false);

  const context = useContext(Context)
  const navigate = useNavigate()


  const handleLogout = async()=>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method: SummaryApi.logout_user.method,
      credentials:"include",
    })

  const data = await fetchData.json()

  if(data.success){
    toast.success(data.message)
    dispatch(setUserDetails(null))
    navigate("/")
  }

  if(data.error){
    toast.error(data.message)
  }

  }

  console.log("header add to cart count", context);

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
        <div className= " h-full container  mx-auto flex items-center px-4 justify-between">
           <div>  
              <Link to={"/"}>
                MERN
              </Link>
           </div>

           <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
             <input type="text" placeholder="search product here..."  className="w-full outline-none "/>     
                <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center text-white rounded-r-full cursor-pointer">
                 <GrSearch />
                </div>
           </div>
  
           <div className="flex items-center gap-8">

             <div className="relative  flex justify-center"onClick={()=>setMenuDisplay(preve => !preve)} >
               
               {
                user?._id &&(
                  <div className="text-3xl relative flex justify-center cursor-pointer ">
                  {
                   user?.profilePic ? (
                     <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user.name} />
                   ) : (
                     <FaRegCircleUser />
                   )
                  }
               </div>
                )
               }

          
                 
                 {
                  menuDisplay && (


                    <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded-md  ">
                      <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"admin-panel/all-products"} className=" whitespace-nowrap hidden  md:block hover:bg-cyan-500 hover:rounded-md p-2" onClick={()=>setMenuDisplay(preve => preve)}>Admin Panel</Link>
                            )
                          }
                      </nav>
                   </div> 
                  )
                 }

             

             </div>

            {
               user?._id && (
                <Link to={"/cart"} className='text-2xl relative'>
                    <span><FaCartShopping/></span>

                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-sm'>{context?.cartProductCount}</p>
                    </div>
                </Link>
                )
            }

              <div>
                
                {
                  user?._id ?(
                    <Link to={"/"} onClick={handleLogout} className="px-3 py-1 bg-red-600 rounded-full text-white cursor-pointer hover:bg-gradient-to-r from-cyan-600 to-blue-500">Logout</Link>
                  )
                  :(
                    <Link to={"/login"} className="px-3 py-1 bg-red-600 rounded-full text-white cursor-pointer hover:bg-gradient-to-r from-cyan-600 to-blue-500">Login</Link>
                  )
                }

              </div>


           </div>

          

        </div>
    </header>
  )
}

export default Header