import React, { useEffect, useState } from 'react'
import axiosInstant from '../../Axios/AxiosInstant'
import '../../Styles/CompanyRegister.css'

function CompanyRegister() {
    const[name,setName]=useState('')
    const[about,setAbout]=useState('')
    const[address,setAddress]=useState('')
    const[website,setWebsite]=useState('')
    const[logo,setLogo]=useState(null)

    const[createCompany,setcreateCompany]=useState([])


    async function companyfetch() {
        try{
        const res=await axiosInstant.get('company/companyregister/')
        console.log(res.data[0])
      
        setcreateCompany(res.data[0])
        }
        catch(err){
            console.log(err)
        }
        
    }
    async function handelRegister(e){
          e.preventDefault()
        try{
            const res= await axiosInstant.post('company/companyregister/',{name,about,address,website})
            console.log(res.data,'succes')
            
            
        }
        catch (err) {
                console.log(err.response.data)
        }
    }
    useEffect(()=>{companyfetch()},[])
  return (

    <>
        <div className="company-container">
  {!createCompany?.have_company ? (
    <div className="company-card">
      <h2>Register Your Company</h2>

      <form onSubmit={handelRegister} className="company-form">

        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <textarea
          placeholder="About Company"
          value={about}
          onChange={(e)=>setAbout(e.target.value)}
          required
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Website (optional)"
          value={website}
          onChange={(e)=>setWebsite(e.target.value)}
        />

        <button type="submit">Register Company</button>
      </form>
    </div>
  ) : (
    <div className="company-card">
      <h2>Company Details</h2>

      <div className="company-details">
        <p><strong>Name:</strong> {createCompany.name}</p>
        <p><strong>About:</strong> {createCompany.about}</p>
        <p><strong>Address:</strong> {createCompany.address}</p>
        {createCompany.website && (
          <p>
            <strong>Website:</strong>{" "}
            <a href={createCompany.website} target="_blank" rel="noreferrer">
              {createCompany.website}
            </a>
          </p>
        )}
      </div>
    </div>
  )}
</div>
    </>
  )
}

export default CompanyRegister