import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstant from '../Axios/AxiosInstant'
import { Link } from "react-router-dom";


import { CiLocationOn } from "react-icons/ci";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TfiBag } from "react-icons/tfi";

function JobInformation() {
    const{id}=useParams()
    const [job,setJob]=useState([])

    async function application(){
      
      try{
      const res=await axiosInstant.post(`company/application/`,{'job':id})
      console.log(res.status)
      fetchJobinfo()
      }
      catch(err){
        console.log(err.response?.data)
        console.log(err.status)       
      }
    }

    async function fetchJobinfo(){
      try{
        const res=await axiosInstant.get(`company/jobs/${id}`)
        setJob(res.data)
        console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{fetchJobinfo()},
  [id])
  return (
    <div className=" container">
       
          <div
            className=" outerdiv"
          >
            <div>
              <div>
              <h3 className="jobtitle">{job.title}</h3>
              <span className=" pb-1">{job.company?.name}</span>
              </div>
              <div className="list-div">
                <div className="item">
                  <CiLocationOn />
                  <span>{job.location}</span>
                </div>

                <div className="item">
                  <RiMoneyRupeeCircleFill />
                  <span>
                    {job.salary_min} - {job.salary_max}
                  </span>
                </div>

                <div className="item">
                  <TfiBag />
                  <span>
                    {job.experience_min} - {job.experience_max} yrs
                  </span>
                </div>
              </div>
              <div className=' d-flex'>
                {job.applylink ? <a target="_blank"  
                rel="noopener noreferrer"
                href={job.applylink}
                >apply on site</a> : job.is_applied ? <button disabled  >applied</button>: <Link onClick={application} target='_blank' to={`/application/${job.id}`}>apply</Link>}
                <p className=' m-1'>Applicants:{job.application_count}</p>
              </div>
                <hr/>
                <div className='items'>
                  <h3>skills :</h3>
                  <div>
              {job?.skills?.map((skill)=>(<p key={skill.id}>{skill.name}</p>))}
             </div>
                </div>
              <div className="item">
               
              <p className="  w-75">Description: {job.description}</p>
              </div>
             
            </div>
          </div>
      </div>
  )
}

export default JobInformation