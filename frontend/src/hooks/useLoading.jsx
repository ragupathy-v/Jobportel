import React, { useState } from 'react'

import  '../Styles/Loading.css'

function useLoading() {

    const[loading,setLoading]=useState(false)
    const startLoading=()=>setLoading(true)
    const stopLoading=()=>setLoading(false)
  return {loading,startLoading,stopLoading}
}

export default useLoading


export const LoadingCom=({loading})=>{
  
  return (loading ?
   (
    <div className="pulse-loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  ):null

  )
}