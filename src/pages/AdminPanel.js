import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {

    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[navigate, user?.role])

  return (
    <div className=" min-h-[calc(100vh-120px)] md:flex hidden">
        <aside className='bg-gray-900 text-white  w-full min-h-full max-w-60 rounded-md'>
                <div className=' h-32 flex justify-center items-center flex-col'>
                  <div className="text-5xl relative flex justify-center cursor-pointer ">
                 {
                  user?.profilePic ? (
                    <img src={user?.profilePic} className="w-20 h-20 rounded-full" alt={user.name} />
                  ) : (
                    <FaRegCircleUser />
                  )
                 }
                  </div>
                  <p className=' capitalize text-lg font-semibold'>{user?.name}</p>
                  <p className='text-sm'>{user?.role}</p>
                </div>

                {/* -------- Navigation ---- */}

                <div>
                    <nav className='grid'>
                        <Link to={"all-users"} className='px-4 py-1 hover:bg-gray-500'>All User</Link>
                        <Link to={"all-products"} className='px-4 py-1 hover:bg-gray-500'>All Products</Link>
                    </nav>
                </div>
        </aside>
        <main className='w-full h-full p-4'>
           <Outlet />
        </main>
    </div>
  )
}

export default AdminPanel