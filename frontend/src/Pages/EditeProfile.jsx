import React, { useEffect, useState } from 'react'
import useUser from '../hooks/UseUser'
import axiosInstant from '../Axios/AxiosInstant'
import useLoading, { LoadingCom } from '../hooks/useLoading'
import '../Styles/EditeProfile.css'

function EditeProfile() {
  const user = useUser()
  const { startLoading, stopLoading, loading } = useLoading()
  const [formData, setformData] = useState({
    name: '',
    email: '',
    phone_num: '',
    location: '',
    linkedin: '',
    portfolio: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setformData({ ...formData, [name]: value })
  }

  async function handelSubmit(e) {
    startLoading()
    e.preventDefault()
    try {
      const res = await axiosInstant.patch(`account/register/${user?.id}/`, formData)
      console.log(res.data, 'edited')
    } catch (err) {
      console.log(err)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    setformData({
      name: user?.name || '',
      email: user?.email || '',
      phone_num: user?.phone_num || '',
      location: user?.location || '',
      linkedin: user?.linkedin || '',
      portfolio: user?.portfolio || ''
    })
  }, [user])

  if (loading) return <LoadingCom loading={loading} />

  return (
    <div className="ep-page">
      <div className="ep-card">
        {/* Header */}
        <div className="ep-header">
          <div className="ep-avatar">
            {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <h1 className="ep-title">Edit Profile</h1>
            <p className="ep-subtitle">Keep your information up to date</p>
          </div>
        </div>

        <form onSubmit={handelSubmit} className="ep-form">
          {/* Row 1 */}
          <div className="ep-row">
            <div className="ep-field">
              <label className="ep-label">
                <span className="ep-label-icon">✦</span> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="ep-input"
              />
            </div>
            <div className="ep-field">
              <label className="ep-label">
                <span className="ep-label-icon">✦</span> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="ep-input"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="ep-row">
            <div className="ep-field">
              <label className="ep-label">
                <span className="ep-label-icon">✦</span> Phone Number
              </label>
              <input
                type="number"
                name="phone_num"
                value={formData.phone_num}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="ep-input"
              />
            </div>
            <div className="ep-field">
              <label className="ep-label">
                <span className="ep-label-icon">✦</span> Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="ep-input"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="ep-divider">
            <span>Online Presence <em>(optional)</em></span>
          </div>

          {/* Row 3 */}
          <div className="ep-row">
            <div className="ep-field">
              <label className="ep-label">
                <span className="ep-label-icon">in</span> LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/you"
                className="ep-input"
              />
            </div>
            <div className="ep-field">
              <label className="ep-label">
                <span className="ep-label-icon">↗</span> Portfolio
              </label>
              <input
                type="text"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="ep-input"
              />
            </div>
          </div>

          <button type="submit" className="ep-btn">
            <span>Save Changes</span>
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>

      {/* Background accents */}
      <div className="ep-bg-dot ep-bg-dot--1" />
      <div className="ep-bg-dot ep-bg-dot--2" />
    </div>
  )
}

export default EditeProfile