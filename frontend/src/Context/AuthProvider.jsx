import React, { createContext, useState, useEffect } from 'react'
import axiosInstant from '../Axios/AxiosInstant'

export const AuthContex = createContext()

function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [userloading, setUserLoading] = useState(true)

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('accesstoken')
  )

  const fetchUser = async () => {
    try {
      const res = await axiosInstant.get('account/user/')
      console.log(res.data, 'user details')
      setUser(res.data)
    }
    catch (err) {
      console.log(err)
    }
    finally{
      setUserLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn && userloading) {
      fetchUser()
    }
  }, [isLoggedIn,userloading])

  return (
    <AuthContex.Provider 
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        refreshUser: fetchUser,
        setUserLoading,
        userloading
      }}
    >
      {children}
    </AuthContex.Provider>
  )
}

export default AuthProvider