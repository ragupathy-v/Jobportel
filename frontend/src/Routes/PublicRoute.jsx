import React, { useContext } from 'react'
import { AuthContex } from '../Context/AuthProvider'
import { Navigate } from 'react-router-dom'

function PublicRoute({children}) {
    const{isLoggedIn}=useContext(AuthContex)
  return (
    <>
    {!isLoggedIn?children:<Navigate to='home'/>}
    </>
  )
}

export default PublicRoute