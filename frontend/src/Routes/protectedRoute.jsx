import React, {  useContext } from 'react'
import  { AuthContex } from '../Context/AuthProvider'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const{isLoggedIn}=useContext(AuthContex)
   
  return (
    <>
    {isLoggedIn ? 
     children : <Navigate to='/'/>}
    </>
  )
}

export default ProtectedRoute