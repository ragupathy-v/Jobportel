import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbars from '../Components/Navbars'

function CompaniesLayouts() {
  return (
    <>
    <Navbars/>
     <div  style={{ paddingTop: "71px", 
                  background:'#f7f8f9',
                  width:'100%',
                  minHeight:'100vh'
                  }}>
    <Outlet/>
    </div>
    </>
  )
}

export default CompaniesLayouts