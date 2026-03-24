import React, { useEffect, useState } from 'react'
import axiosInstant from '../Axios/AxiosInstant'
import { GrView } from "react-icons/gr";
import { IoCloudUploadOutline } from "react-icons/io5";
import useUser from '../hooks/UseUser';
import '../Styles/Profile.css'
function Profile() {


    const[resume,setResume]=useState(null)
    const data= useUser()
   

  async function updateResume(){
    if (!resume) {
    alert("Select a file first")
    return
    }
    if (resume.type !== "application/pdf") {
  alert("Only PDF allowed")
  return
}
    try{
      const formresume=new FormData()
      formresume.append('resume',resume)
      const res= await axiosInstant.post('account/resume/',formresume)
      console.log(res)
     
      window.location.reload()
      
    }catch(err){
      console.log(err.response?.data)
    }
  }
 
  return (
    <>
    <div className="profile-container">
    <img src={`http://127.0.0.1:8000${data.profileImg}`} />
    
    <p>{data?.name}</p>
    <p>{data?.phone_num}</p>
    <p>{data?.email}</p>

    {data?.user_type=='employee'&&<div>
      {data?.resume && (
        <a
          href={`http://127.0.0.1:8000${data.resume}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          resume <GrView />
        </a>
      )}

      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <button onClick={updateResume}>
        <IoCloudUploadOutline /> Upload
      </button>
    </div>
    }
  </div>
    </>
    
  )
}

export default Profile