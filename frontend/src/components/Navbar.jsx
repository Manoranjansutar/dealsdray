import React from 'react'
import logo from './../assets/logo-vertical.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Navbar = ({token , setIsAuthenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () =>{
       localStorage.removeItem('token');
       localStorage.removeItem('username');
       setIsAuthenticated(false)
       navigate('/')
    }
  return (
    <div className='bg-black md:px-[5vw] py-5 flex justify-between items-center  fixed top-0 w-full z-40 px-[2vw]'>
      <div className='flex flex-col gap-4 md:gap-10 md:flex-row'>
        <img src={logo} alt="" className='object-contain object-center w-32 md:w-48'/>
        {
          token ? <Link to='/dashboard'><p className='text-2xl text-white capitalize rounded-md'>Dashboard</p></Link> : ""
        }
      </div>
     { 
      location.pathname === '/login' ? 
      <></> : (
        !token ? 
      <div>
        <Link to='/login'>
            <button className='px-2 py-2 font-semibold text-black bg-white rounded-md md:px-4 hover:opacity-75'>
                LOGIN
            </button>
        </Link>
      </div> : 
      <div className='flex items-center gap-5 text-xl text-white'>
        
        <p className='hidden capitalize md:block'>Welcome, {localStorage.getItem('username')}</p>
        <button className='px-4 py-2 font-semibold text-black bg-white rounded-md hover:opacity-75' onClick={handleLogout}>LOGOUT</button>
      </div>
      )
    }
    </div>
  )
}

export default Navbar
