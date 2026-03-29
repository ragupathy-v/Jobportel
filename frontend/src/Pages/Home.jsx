
import{ useEffect,useContext } from 'react'
import axiosInstant from '../Axios/AxiosInstant'
import{useNavigate} from 'react-router-dom'
import { AuthContex } from '../Context/AuthProvider'

import '../Styles/Home.css'

import Hero from './Hero'
import useUser from '../hooks/UseUser'
import CompanyHome from './Company/CompanyHome'


function Home() {
  const user=useUser()

  const navigate=useNavigate()
  const{setIsLoggedIn}=useContext(AuthContex)
//logout function
// const logout=()=>{
//   localStorage.removeItem('accesstoken')
//   localStorage.removeItem('refreshtoken')
//   setIsLoggedIn(false)
//   navigate('/')
//   console.log('user logedout')
// }

  const jobs= async()=>{
  try{
    const res= await axiosInstant.get('company/jobs/',{})
    console.log(res.data)
    // const indianjob=res.data.jobs.filter((jobs)=>(jobs.companyName.lowercase==='tcs'))
    // console.log(indianjob)
  }
  catch(err){
    console.log(err)
  }
 }

 useEffect(()=>{jobs()},[])
  return ( 
    <>
    {user?.user_type==='employee'?<Hero/>:<CompanyHome/>}
  

    </>
    
  )
}

export default Home