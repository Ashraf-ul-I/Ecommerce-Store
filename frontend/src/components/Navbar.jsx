import React from 'react'
import {ShoppingCart, UserPlus,Lock, LogOut, LogIn} from "lucide-react"
import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
const Navbar = () => {

    const {user,logout}=useUserStore();
    const isAdmin= user?.role === 'admin';
  return (
   <header className='fixed top-0 w-full bg-gray-900 bg-opacity-900 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
    <div className='container mx-auto px-4 py-3 justify-between'>
        <div className='flex flex-wrap justify-between items-center'>
        <Link className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex'>
        Ecommerce
        </Link>
       <nav className='flex flex-wrap items-center gap-4'>
            <Link to={"/"} className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>Home</Link>
            {user && 
           ( <Link to={"/"} className='relative group'>
                <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400 ' size={20}></ShoppingCart>
                <span className='hidden sm:inline'>Cart</span>
                <span className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>3</span>
            </Link>)}

            {
                isAdmin && (
                    <Link className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration 300 ease-in-out flex items-center'
                    to={'/secret-dashboard'}>
                        <Lock className='inline-block mr-1' size={18}/>
                        <span className='hidden sm:inline'>Dashboard</span>
                    </Link>
                )
            }

            {user ?(
                <button 
                onClick={logout}
                className='bg-gray-700 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out '>
                <LogOut size={18}/>
                <span className='hidden sm:inline ml-2'>Log Out</span>
                </button>
            ):(<>
            <Link to={'/signup'} className='bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl flex items-center transition duration-300 ease-in-out '><UserPlus className='mr-2' size={18}></UserPlus>Sign Up</Link>
            <Link to={'/login'} className='bg-emerald-500 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl flex items-center transition duration-300 ease-in-out '>
            <LogIn className='mr-2' size={18}></LogIn>Login</Link>
            </>)}
        </nav>
       </div>
    </div>
   </header>
  )
}

export default Navbar