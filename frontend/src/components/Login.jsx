import React, { useState } from "react";
import background from "./../assets/background-1.png";
import login from "./../assets/Secure login.svg";
import admin from "./../assets/clipart2630577.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const Login = ({isAuthenticated, setIsAuthenticated}) => {
  const [toggleLogin, setToggleLogin] = useState("login");//toggle login and register
  const [formData , setFormData] = useState({
      username :"",
      email:"",
      password:"",
  })
  const navigate = useNavigate();//for redirecting

  //handle form submit login/register form data
  const handleSubmit = async(e) =>{
     e.preventDefault();
     console.log(formData)
     const endpoint = toggleLogin === 'login' ?
        'http://localhost:5000/api/user/login' :
        'http://localhost:5000/api/user/register'
     try {
        await axios.post(endpoint,formData)
        .then((res)=>{
            console.log(res)
            console.log(res.data)
            if(res.data.success){
                localStorage.setItem('token',res.data.token);
                setIsAuthenticated(true)
                localStorage.setItem('username',res.data.username)
                console.log("Toast should be triggered");
                  navigate('/dashboard');
                toast.success("Login Successfully!!!")
                console.log("Toast should be triggered2");
            } else {
        toast.error("Invalid Email password")
              
            }
        })
     } catch (error) {
      console.log("Error block reached");
        console.log(error)
        console.log("something went wrong")
     }
  }
  return (
    <div
      className="flex flex-col items-center justify-center md:flex-col lg:flex-row"
      style={{
        width: "100vw",
        height: "90vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Toaster position="top-center"/>
      
      <div className="md:w-[50%] w-[100%] lg:w-[30%]">
        <img src={login} alt="" />
      </div>
      <div className="md:w-[50%]  w-[90%] lg:w-[20%]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
            <img src={admin} alt="" className="w-40" />
            {toggleLogin === "sign up" ? (
              <input
                type="text"
                className="w-full mt-5 bg-transparent border-b border-gray-500 outline-none"
                placeholder="Enter Username"
                name="username"
                value={formData.username}
                onChange={(e) => setFormData({...formData , username : e.target.value})}
              />
            ) : (
              ""
            )}
            <input
              type="text"
              className="w-full mt-5 bg-transparent border-b border-gray-500 outline-none"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={(e)=>setFormData({...formData , email :e.target.value})}
            />
            <input
              type="password"
              className="w-full mt-5 bg-transparent border-b border-gray-500 outline-none"
              placeholder="Enter Password"
              name='password'
              value={formData.password}
              onChange={(e)=>setFormData({...formData , password : e.target.value})}
            />
            {toggleLogin === "login" ? (
              <p className="mt-5">
                Dont have a account ?{" "}
                <span
                  onClick={() => setToggleLogin("sign up")}
                  className="pointer-events-auto hover:underline"
                >
                  Register
                </span>
              </p>
            ) : (
              <p className="mt-5">
                Already have an account ?{" "}
                <span
                  onClick={() => setToggleLogin("login")}
                  className="pointer-events-auto hover:underline"
                >
                  Login
                </span>
              </p>
            )}
            <button className="w-full py-2 mt-5 text-xl text-white uppercase bg-black rounded-md" type="submit">
              {toggleLogin}
            </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
