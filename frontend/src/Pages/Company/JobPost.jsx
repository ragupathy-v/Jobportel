import axios from "axios"
import { useState } from "react"
import axiosInstant from "../../Axios/AxiosInstant"
import '../../Styles/JobPost.css'

function JobPost() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [experienceMin, setExperienceMin] = useState('')
  const [experienceMax, setExperienceMax] = useState('')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [location, setLocation] = useState('')
  const [applylink, setApplylink] = useState('')

  async function postJob(e){
     e.preventDefault()
    try{
        const res= await axiosInstant.post('company/jobs/',{title,description,experience_min:Number(experienceMin),
                    experience_max:Number(experienceMax),salary_min:Number(salaryMin),
                    salary_max:Number(salaryMax),location,applylink,})
        console.log(res.data)
      setTitle('')
      setDescription('')
      setExperienceMin('')
      setExperienceMax('')
      setSalaryMin('')
      setSalaryMax('')
      setLocation('')
      setApplylink('')
    
    }
    catch(err){
        console.log(err.message)
    }
  }
  return (
    <>
       <div className="jobpost-container">
    <div className="jobpost-card">
      <h2>Post a Job</h2>

      <form onSubmit={postJob} className="jobpost-form">

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="row">
          <input
            type="number"
            placeholder="Min Experience"
            min={0}
            value={experienceMin}
            onChange={(e) => setExperienceMin(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Max Experience"
            min={Number(experienceMin) || 0}
            value={experienceMax}
            disabled={!experienceMin}
            onChange={(e) => setExperienceMax(e.target.value)}
            required
          />
        </div>

        <div className="row">
          <input
            type="number"
            placeholder="Min Salary"
            min={0}
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Max Salary"
            min={Number(salaryMin) || 0}
            value={salaryMax}
            disabled={!salaryMin}
            onChange={(e) => setSalaryMax(e.target.value)}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Apply Link (optional)"
          value={applylink}
          onChange={(e) => setApplylink(e.target.value)}
        />

        <button type="submit">Create Job</button>

      </form>
    </div>
  </div>
    </>
  )
}

export default JobPost