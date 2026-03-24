import React, { useEffect, useState } from 'react'
import axiosInstant from '../../Axios/AxiosInstant'
import { Link } from 'react-router-dom'
import logo from "../../Assert/logo/company.png"
import '../../Styles/AllCompanies.css'
function AllCompanies() {
  const [data,setData]=useState([])

  async function  fetchCompanies(){
    try{
    const res= await axiosInstant.get('company/company/')
    console.log(res)
    console.log(res.data)
    setData(res.data)
    }
    catch(err){
      console.log(err)
    }
   }

   useEffect(()=>{fetchCompanies()},[])
  return (
     <>
      <div className=' main-container'>
      {data.map((company) => (
        <Link to={`${company.id}`} key={company.id} className='company-card'>

          <div className='card-content'>
            {/* Logo on Left */}
            <div className='logo-box'>
              <img src={company.logo? company.logo : logo} alt="logo" />
            </div>

            {/* Info on Right */}
            <div className='text-box'>
              <h3 className='companyname'>{company.name}</h3>
              <p className='about'>{company.about}</p>
              <p className='address'>📍 {company.address}</p>
            </div>

          </div>

        </Link>
      ))}
    </div>
    </>
  )
}

export default AllCompanies