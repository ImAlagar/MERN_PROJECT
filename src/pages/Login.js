import React, { useContext, useState } from "react"
import loginImg from "../assest/signin.gif"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  
    const [showPassword, setShowpassword] = useState(false);

    const [data,setData] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()

    const {fetchUserDetails,fetchUserAddToCart} = useContext(Context)


    const handleOnChange = (e) => {

        const {name,value} = e.target;

        setData((preve)=>{
            return {
                ...preve,
                [name]:value
            }
        })
    }
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
          const dataResponse = await fetch(SummaryApi.signIn.url,{
            method:SummaryApi.signIn.method,
            credentials:'include',
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify(data)
          })

          const dataAPi = await dataResponse.json();

          if(dataAPi.success){
            toast.success(dataAPi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()

          }

          if(dataAPi.error){
            toast.error(dataAPi.message);
          }
    }



  return (
    <section id="login">

        <div className="mx-auto container p-10">
            
             <div className="bg-gray-900 p-5 w-full max-w-sm mx-auto rounded-md" >
                  <div className="w-20 h-20 mx-auto">
                    <img src={loginImg} alt="login icon" />
                  </div>
                  
                   <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="grid">
                         <label className="text-white">Email</label>
                       <div className="bg-slate-100 rounded-lg  p-2 ">
                         <input
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            className=" w-full h-full outline-none bg-transparent "
              
                         />
                       </div>
                    </div>

                  <div className="py-4 ">
                       <label className="text-white">Password</label>
                       <div className=" bg-slate-100 p-2 flex rounded-lg">
                         <input
                            type={showPassword ?  "text":"password"}
                            placeholder="Enter password"
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                           className=" w-full h-full outline-none bg-transparent"
                         />
                       <div className="cursor-pointer text-xl " onClick={() => setShowpassword((preve) => !preve)}>
                          <span >

                            {
                                showPassword ? ( 
                                    <FaEyeSlash />
                                ) 
                                : 
                                (
                                    <FaEye />
                                )
                            }
                            
                            
                          </span>
                      </div>
                   </div>
                  </div>

                    <div className="flex justify-center">
                          <button className=" mt-6 w-full max-w-[150px] bg-red-500  hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition-all px-6 py-2 shadow-lg rounded-full   text-white">
                             Login
                          </button>
                   </div>
                    </form>

                <p className="text-white my-4 ">Don't have an account? <Link to={"/signup"} className="text-red-500 hover:text-red-600 hover:underline">Sign up</Link></p>


             </div>

        </div>
         
    </section>
  )
}

export default Login