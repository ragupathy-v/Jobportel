import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContex } from '../Context/AuthProvider'
import '../Styles/Login.css'
import logo from "../Assert/logo/PortelLogo.png"
import useLoading, { LoadingCom } from '../hooks/useLoading'


export default function Login() {
     const [username,setUsername]=useState('')
     const [password,setPassword]=useState('')
     const [error,setError]=useState('')
     const navigate=useNavigate()
     const {setIsLoggedIn}=useContext(AuthContex)
    const{loading,startLoading,stopLoading}=useLoading()

     const loginfunction=async(e)=>{
      e.preventDefault()
       const Base_url=import.meta.env.VITE_BACKEND_BASE_URL
       startLoading() 
      try{ 
        const res=await axios.post(`${Base_url}account/login/`,{username,password})
        console.log(res.data)
        localStorage.setItem('accesstoken',res.data.access)
        localStorage.setItem('refreshtoken',res.data.refresh)
        setIsLoggedIn(true)
        navigate('/home')
      }
      catch(error){
        console.log(error.response)
        // setError(error.response?.data?.detail)
        // setTimeout(()=>setError(''),5000)
        setError('invailed credential')
      }
      finally{
        stopLoading()
      }
      
     }
  return (
    loading? <LoadingCom loading={loading}/>:(
     <div className="login-main container">
     
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={loginfunction}>
              <input type="text" placeholder="Username" name="Username" onChange={(e) => setUsername(e.target.value)}/>
              <div className="pass-input-div">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* <div className="login-center-options">
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div> */}
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
               
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
    )
    
  )
}
