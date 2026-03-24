import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstant from '../../Axios/AxiosInstant'
import '../../Styles/ApplicationReview.css'

function ApplicationReview() {
    const{id}=useParams()
    const[applications,setApplications]=useState([])
    async function applicationapi(){
      
      try{
      const res=await axiosInstant.get(`company/application/`,{
        params:{'job': id}
      })
      console.log(res.data,'application')
      setApplications(res.data)
      }
      catch(err){
        console.log(err.response)     }
    }
    useEffect(()=>{applicationapi()},[id])
  return (
    <>
        <div className="review-container">
  <h2 className="review-title">Applications count-{applications.length}</h2>

  {applications.map((application) => (
    <div className="card" key={application.id}>
      <div className="card-header">
        <h3>{application.user.name || "Name not added"}</h3>
      </div>

      <div className="card-body">
        {application.user.resume ? (
          <a
            href={application.user.resume}
            target="_blank"
            rel="noreferrer"
            className="resume-btn"
          >
            View Resume
          </a>
        ) : (
          <p className="no-resume">Resume not uploaded</p>
        )}

        <Link to='/user' className="profile-btn">View Profile</Link>
      </div>
    </div>
  ))}
</div>

    </>
    
  )
}

export default ApplicationReview