import React, { useState } from "react"
import loginImg from "../assest/signin.gif"
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import {Link, useNavigate,} from 'react-router-dom'
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";


const SignUp = () => {
   
    const [showPassword, setShowpassword] = useState(false);
    const [showConfirmPassword, setShowConfirpassword] = useState(false);

    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        profilePic:"",
    })

    const navigate = useNavigate();

    const handleOnChange = (e) => {

        const { name, value} = e.target;

        setData((preve)=>{
            return {
                ...preve,
                [name]:value
            }
        })
    }
    
    const handleUploadPic = async(e) =>{
      const file = e.target.files[0]
      
      const imagePic = await imageTobase64(file)
      
      setData((preve)=>{
        return{
          ...preve,
          profilePic : imagePic
        }
      })
  
    }
  

     const handleSubmit = async(e) =>{
      e.preventDefault()

      if(data.password === data.confirmPassword){
        const dataResponse = await fetch(SummaryApi.signUp.url,{
            method : SummaryApi.signUp.method,
            credentials: 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })
    
          const dataApi = await dataResponse.json()

          if(dataApi.success){
            toast.success(dataApi.message)
            navigate("/login")
          } 

          if(dataApi.error){
            toast.error(dataApi.message);
          }

   
    
      }else{
        toast.error("Please check password and confirm password");
      
      }

  }
     
            
    return (
        <section id="signup">
    
            <div className="mx-auto container p-5">
                
                 <div className="bg-gray-900 p-5 w-full max-w-sm mx-auto rounded-md" >
                      <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                          <div>
                          <img src={data.profilePic || loginImg} alt="login icon" />
                          </div>
                          <form>
                            <label>
                              <div className="text-xs bg-opacity-80 bg-slate-200 py-4 text-center absolute bottom-0 w-full cursor-pointer">
                               Upload photo
                              </div>
                                <input type="file" className="hidden"  onChange={handleUploadPic}/>
                            </label>
                          </form>
                      </div>
                      
                       <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
                       
                       <div className="grid ">
                             <label className="text-white">User Name</label>
                           <div className="bg-slate-100 rounded-lg  p-2 ">
                             <input
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={data.name}
                                onChange={handleOnChange}
                                required
                                className=" w-full h-full outline-none bg-transparent "
                  
                             />
                           </div>
                        </div>

                        <div className="grid">
                             <label className="text-white">Email</label>
                           <div className="bg-slate-100 rounded-lg  p-2 ">
                             <input
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                required
                                className=" w-full h-full outline-none bg-transparent "
                  
                             />
                           </div>
                        </div>
    
                      <div >
                           <label className="text-white">Password</label>
                           <div className=" bg-slate-100 p-2 flex rounded-lg">
                             <input
                                type={showPassword ?  "text":"password"}
                                placeholder="Enter password"
                                name="password"
                                value={data.password}
                                onChange={handleOnChange}
                                required
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

                      <div>
                           <label className="text-white">Confirm Password</label>
                           <div className=" bg-slate-100 p-2 flex rounded-lg">
                             <input
                                type={showConfirmPassword ?  "text":"Password"}
                                placeholder="Enter confirm password"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleOnChange}
                                required
                               className=" w-full h-full outline-none bg-transparent"
                             />
                           <div className="cursor-pointer text-xl " onClick={() => setShowConfirpassword((preve) => !preve)}>
                              <span >
    
                                {
                                    showConfirmPassword ? ( 
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
                                 Signup
                              </button>
                       </div>
                        </form>
    
                    <p className="text-white my-5 ">Already have an account? <Link to={"/login"} className="text-red-500 hover:text-red-600 hover:underline">Login</Link></p>
    
    
                 </div>
    
            </div>
             
        </section>
      )
}

export default SignUp