import React from 'react'
import { useContext } from 'react'
import { AuthContex } from '../Context/AuthProvider'


function useUser() {

   
  return  useContext(AuthContex)
}

export default useUser