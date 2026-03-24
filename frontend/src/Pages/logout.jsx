import React, { useContext } from 'react'
import { AuthContex } from '../Context/AuthProvider'

function Logout() {
    const{setIsLoggedIn}=useContext(AuthContex)
    const handelLogout=()=>{
  localStorage.removeItem('accesstoken')
  localStorage.removeItem('refreshtoken')
  setIsLoggedIn(false)
  navigate('/')
  console.log('user logedout')
}
  return (
   <>
   <button onClick={handelLogout} style={{color:'black', border:'none'}}>logout</button>
   </>
  )
}

export default Logout