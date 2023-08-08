import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignIn = () => {

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const { signIn } = UserAuth();
    const navigate = useNavigate();


    let handleSignInClick = async (e) => {
        e.preventDefault();
        try{
            await signIn(email,password);
            navigate('/');

        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className='w-full h-screen'>
    <img className='hidden sm:block absolute w-full h-full object-cover' 
    src="https://assets.nflxext.com/ffe/siteui/vlv3/b85863b0-0609-4dba-8fe8-d0370b25b9ee/a1f7d402-a554-442d-92e4-3e4be79ae155/US-en-20230731-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="image" />
<div className='bg-black/50 fixed top-0 left-0 w-full h-screen'> </div>
<div className='fixed w-full px-4 py-24 z-10'>
<div className='max-w-[450px] h-[500px] mx-auto bg-black/75 text-white'>
<div className="max-w-[320px] mx-auto py-16">
    <h1 className='text-3xl font-bold my-2'>Sign In</h1>
    <form className='flex flex-col'>
        <input className='p-2 my-2 bg-gray-700 rounded' onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'/>
        <input className='p-2 my-2 bg-gray-700 rounded' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
        <button onClick={handleSignInClick} className='bg-red-600 p-2 my-2 rounded'>Sign In</button>
    </form>
    <div className='flex justify-between items-center my-2'>
        <div className='flex gap-1 items-center justify-center'>
            <input type="checkbox" />
            <h3 className="text-gray-100/70 text-sm">Remember me</h3>
        </div>
    <h3 className='text-gray-100/70 text-sm'>Need help?</h3>
    </div>
    <p className='my-4 text-sm font-bold'><span className='text-gray-100/70 mr-2 font-normal'>New to Netflix?</span>
    <Link to='/signup'>
     SignUp
     </Link>
     </p>
</div>
</div>
</div>
</div>
  )
}

export default SignIn