import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbars from '../Components/Navbars'
import Footer from '../Pages/Footer'
import useUser from '../hooks/UseUser'

function CompaniesLayouts() {
  const{useloading}=useUser()
  if(useloading) return null
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