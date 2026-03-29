import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbars from '../Components/Navbars'
import Footer from '../Pages/Footer'

function CompaniesLayouts() {
  return (
    <>
    <Navbars/>
     <div  style={{ paddingTop: "71px", 
                  background:'linear-gradient(150deg, #0a1628 0%, #112240 55%, #0f3460 100%)',
                  width:'100%',
                  minHeight:'100vh',
                  height:'100%',
                  }}>
    <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default CompaniesLayouts