import React from 'react'
import { useState,useEffect } from 'react'
import axiosInstant from '../Axios/AxiosInstant'

function useUser() {

    const[user,setUser]=useState([])
    
    useEffect(()=>{
        const userapi=async()=>{
      try{
        const res= await axiosInstant.get('account/user/')
        console.log(res.data,'user details')
        setUser(res.data)
      }
      catch(err){ 
        console.log(err)
      }
    };
    userapi()
    },[])
  return  user
}

export default useUser