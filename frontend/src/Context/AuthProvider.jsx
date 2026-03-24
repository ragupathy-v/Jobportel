import React, { createContext, useState } from 'react'

export const AuthContex =createContext()

function AuthProvider({children}) {
    const[isLoggedIn, setIsLoggedIn]=useState(
      !!localStorage.getItem('accesstoken')
    )
  return (
    <AuthContex.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </AuthContex.Provider>
    
    
  )
}

export default AuthProvider