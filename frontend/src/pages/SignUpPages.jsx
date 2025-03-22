import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Mail, User,Lock, Loader, UserPlus,ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
const SignUpPages = () => {


  const loading=false;
  const [formData,setFormData]= useState({
      name:"",
      email:"",
      password:"",
      confirmPassword:""
  });
  const {signup}=useUserStore();
  const handleSubmit=(e)=>{
      e.preventDefault();
      signup(formData)
      
  }
return (
  <div className='flex flex-col justify-center py-12 sm:px-6 '>
    <motion.div 
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.8}}>
      <h2 className="text-center text-2xl font-bold text-white">
        Create Your Account
      </h2>
      
    </motion.div>
    <motion.div 
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.8}}
    className="w-full max-w-md mx-auto">
      <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
       <form onSubmit={handleSubmit} className='space-y-6'>
        <label htmlFor="" className='block text-sm font-medium text-gray-300'>
          Full Name
        </label>
        <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <User className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <input 
        id='name'
        type='text'
        required
        value={formData.name}
        onChange={(e)=>setFormData({...formData,name:e.target.value})}
        className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
        placeholder='John Doe'
        />
        </div>
                  {/* Email Field */}
    <div>
      <label className='block text-sm font-medium text-gray-300'>Email</label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <Mail className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <input 
          id='email'
          type='email'
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
          placeholder='you@example.com'
        />
      </div>
    </div>

    {/* Password Field */}
    <div>
      <label className='block text-sm font-medium text-gray-300'>Password</label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <input 
          id='password'
          type='password'
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
          placeholder='Enter password'
        />
      </div>
    </div>

    {/* Confirm Password Field */}
    <div>
      <label className='block text-sm font-medium text-gray-300'>Confirm Password</label>
      <div className='mt-1 relative rounded-md shadow-sm'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <Lock className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <input 
          id='confirmPassword'
          type='password'
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
          placeholder='Confirm password'
        />
      </div>
    </div>

    <button type='submit'
    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none foocus:ring-emerald-500 transition duration-300 ease-in-out disabled:opacity-50' disabled={loading}>
      {loading?(<>
      <Loader className='mr-2 h-5 w-5 animate-spin ' aria-hidden="true"/>
      Loading...
      </>):(<>
      <UserPlus className='mr-2 h-5 w-5' aria-hidden="true"/>
      SignUp
      </>)}
    </button>
       </form>
       <p className='mt-8 text-center text-sm text-gray-400'>
         Already have an acount?{" "}
         <Link to={'/login'} className='font-medium text-emerald-400 hover:text-emerald-300 cursor-pointer'>Login Here <ArrowRight className='inline h-4 w-4'/>
         </Link>
       </p>
      </div>

    
      
      
    </motion.div>
  </div>
)
}

export default SignUpPages