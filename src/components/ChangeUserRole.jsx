import React, { useState } from 'react'
import ROLE from '../common/role'
import { MdClose } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = (
    {
        name,
        email,
        role,
        userId,
        onclose,
        callFunc
    }
) => {

 const [userRole, setUserRole] = useState(role);

 const handleOnChangeSelect = (e) =>{
    setUserRole(e.target.value) 

    console.log("userRole",e.target.value);
 }

 const updateUserRole = async ()=>{
     const fetchResponse = await fetch(SummaryApi.updateUser.url,{
        method:SummaryApi.updateUser.method,
        credentials:'include',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            userId:userId,
            role : userRole
        })
     })
   
     const responseData = await fetchResponse.json()

     if(responseData.success){
        toast.success(responseData.message)
        onclose()
        callFunc()
     }

     console.log("role update",responseData);


   
 }

  return (
    <div className=' fixed top-0 bottom-0 left-20 w-full h-full z-10 flex  items-center bg-gray-800 bg-opacity-50 '>
        <div className='w-full mx-auto pl-5 shadow-md p-4 max-w-sm bg-white rounded-md'>
           
            <button className='block ml-auto 'onClick={onclose}>
                <MdClose />
            </button>

           <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
           <p>Name : {name}</p>
           <p>Email : {email}</p>
           <div className='flex items-center justify-between my-4'>
           <p>Role :</p>
           <select className='border px-4 py-1' value={userRole } onChange={handleOnChangeSelect}>

            {
                Object.values(ROLE).map(el =>{
                    return (
                        <option value={el} key={el}>
                              {el}
                        </option>
                    )
                })
            }
           
           </select>
           </div>
           <button className='w-fit mx-auto block border py-1 rounded-full px-3 bg-red-500 text-white hover:bg-gradient-to-t from-cyan-500 to-blue-500 ' onClick={()=>updateUserRole()}>Change Role</button>
        </div>
    </div>
  )
}

export default ChangeUserRole