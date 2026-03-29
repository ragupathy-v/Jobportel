import '../Styles/Profile.css'
import React, { useState } from 'react'
import axiosInstant from '../Axios/AxiosInstant'
import { GrView } from "react-icons/gr"
import { IoCloudUploadOutline } from "react-icons/io5"
import useUser from '../hooks/UseUser'
import { Link } from 'react-router-dom'


function Profile() {
  const cloud_url = import.meta.env.VITE_CLOUDINARY_URL
  const [resume, setResume] = useState(null)
  const [fileName, setFileName] = useState('')
  const data = useUser()

  function handleFileChange(e) {
    const file = e.target.files[0]
    setResume(file)
    setFileName(file ? file.name : '')
  }

  async function updateResume() {
    if (!resume) { alert("Select a file first"); return }
    if (resume.type !== "application/pdf") { alert("Only PDF allowed"); return }
    try {
      const formresume = new FormData()
      formresume.append('resume', resume)
      const res = await axiosInstant.patch('account/resume/', formresume)
      console.log(res)
      window.location.reload()
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <div className="pf-page">
      {/* background blobs */}
      <div className="pf-blob pf-blob--1" />
      <div className="pf-blob pf-blob--2" />

      <div className="pf-card">

        {/* ── Avatar + name ── */}
        <div className="pf-hero">
          <div className="pf-avatar-ring">
            <img
              src={data?.profileImg || "/default-profile.png"}
              alt="profile"
              className="pf-avatar"
            />
          </div>
          <div className="pf-hero-text">
            <h1 className="pf-name">{data?.name || 'Anonymous'}</h1>
            <span className="pf-badge">{data?.user_type}</span>
          </div>
          <Link to="/editeprofile" className="pf-edit-btn">
            Edit Profile
          </Link>
        </div>

        <div className="pf-divider" />

        {/* ── Info grid ── */}
        <div className="pf-info-grid">
          <div className="pf-info-item">
            <span className="pf-info-label">✦ Email</span>
            <span className="pf-info-value">{data?.email || '—'}</span>
          </div>
          <div className="pf-info-item">
            <span className="pf-info-label">✦ Phone</span>
            <span className="pf-info-value">{data?.phone_num || '—'}</span>
          </div>
          <div className="pf-info-item">
            <span className="pf-info-label">✦ Location</span>
            <span className="pf-info-value">{data?.location || '—'}</span>
          </div>
          <div className="pf-info-item">
            <span className="pf-info-label">✦ User Type</span>
            <span className="pf-info-value pf-info-value--cap">{data?.user_type || '—'}</span>
          </div>
        </div>

        {/* ── Links row ── */}
        {(data?.linkedin || data?.portfolio) && (
          <>
            <div className="pf-divider" />
            <div className="pf-links-row">
              {data?.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-link-pill pf-link-pill--linkedin"
                >
                  <span className="pf-link-pill-icon">in</span>
                  LinkedIn Profile
                </a>
              )}
              {data?.portfolio && (
                <a
                  href={data.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-link-pill pf-link-pill--portfolio"
                >
                  <span className="pf-link-pill-icon">↗</span>
                  Portfolio
                </a>
              )}
            </div>
          </>
        )}

        {/* ── Resume section (employee only) ── */}
        {data?.user_type === 'employee' && (
          <>
            <div className="pf-divider" />
            <div className="pf-resume-section">
              <p className="pf-section-title">Resume</p>

              {data?.resume && (
                <a
                  href={`${cloud_url}${data.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-resume-view"
                >
                  <GrView /> View Current Resume
                </a>
              )}

              <label className="pf-file-label">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="pf-file-input"
                />
                <span className="pf-file-icon"><IoCloudUploadOutline /></span>
                <span className="pf-file-text">
                  {fileName ? fileName : 'Choose PDF to upload'}
                </span>
              </label>

              <button
                onClick={updateResume}
                className="pf-upload-btn"
                disabled={!resume}
              >
                <IoCloudUploadOutline />
                <span>Upload Resume</span>
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default Profile