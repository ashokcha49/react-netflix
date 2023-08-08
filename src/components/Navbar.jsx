import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Navbar() {
    const {user,logOut} = UserAuth();   
    const navigate = useNavigate();

    const handleLogOut = async() =>{
        try{
            await logOut();
            navigate('/')
        }catch(error){
            console.log(error);
        }
    }
    
    return (
        <div className='flex justify-between items-center absolute p-4 w-full z-20'>
            <Link to='/'>
            <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETFLIX</h1>
            </Link>
            {user?.email ? 
                <div>
                      <Link to='/account'>
                       <button className='text-white px-6 py-2 rounded cursor-pointer'>Account</button>
                       </Link>
                       <button onClick={handleLogOut} className='text-white bg-red-600 px-6 py-2 rounded cursor-pointer'>Log Out</button>
                    </div>

                     :    
                       <div>
                       <Link to='/signin'>
                       <button className='text-white px-6 py-2 rounded cursor-pointer'>Sign In</button>
                       </Link>
                       <Link to='/signup'>
                       <button className='text-white bg-red-600 px-6 py-2 rounded cursor-pointer'>Sign Up</button>
                   </Link>
                   </div>
            } 
            </div>     
    )
}

export default Navbar;