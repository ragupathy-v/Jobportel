
import{ useEffect,useContext } from 'react'
import axiosInstant from '../Axios/AxiosInstant'
import{useNavigate} from 'react-router-dom'
import { AuthContex } from '../Context/AuthProvider'

import '../Styles/Home.css'

function Home() {

  const navigate=useNavigate()
  const{setIsLoggedIn}=useContext(AuthContex)
//logout function
const logout=()=>{
  localStorage.removeItem('accesstoken')
  localStorage.removeItem('refreshtoken')
  setIsLoggedIn(false)
  navigate('/')
  console.log('user logedout')
}

  const jobdata=async()=>{
    try{
    const res=await axiosInstant.get('company/jobs/')
    console.log(res.data)
    console.log('data recived')
    
  }
  catch(error){
    console.log(error.response?.data)
  
  }
  }

  useEffect(()=>{
    jobdata() 
  },[])
  return ( 
    <>
  
    <div>
       <h1>home</h1>
      <button onClick={logout} >logout</button>
    </div>
    
    
    </>
    
  )
}

export default Home