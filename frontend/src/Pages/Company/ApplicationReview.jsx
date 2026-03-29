import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosInstant from '../../Axios/AxiosInstant'
import '../../Styles/ApplicationReview.css'

// Icon helpers (inline SVG — no extra dependency)
const IconFile = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const IconXCircle = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
)

// Returns initials from a name string
function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Badge label mapping
const STATUS_LABELS = {
  pending: 'Pending',
  recive_mail: 'Mail Sent',
  rejected: 'Rejected',
}

function ApplicationReview() {
  const { id } = useParams()
  const [applications, setApplications] = useState([])

  async function updatestates(appId, status) {
    try {
      await axiosInstant.patch(`company/application/${appId}/`, { status })
    } catch (err) {
      console.log(err)
    } finally {
      applicationapi()
    }
  }

  async function applicationapi() {
    try {
      const res = await axiosInstant.get(`company/application/`, {
        params: { job: id }
      })
      setApplications(res.data)
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => { applicationapi() }, [id])

  return (
    <div className="review-container">

      {/* ── Page Title ── */}
      <h2 className="review-title">
        <strong>{applications.length}</strong>
        Application{applications.length !== 1 ? 's' : ''} Received
      </h2>

      {/* ── Empty State ── */}
      {applications.length === 0 && (
        <div className="arc-empty">
          <div className="arc-empty-icon">📭</div>
          <p>No applications yet for this job.</p>
        </div>
      )}

      {/* ── Application Cards ── */}
      {applications.map((application, index) => {
        const name = application.user?.name || 'Name not added'
        const status = application.status

        return (
          <div className="arc-card" key={application.id}>

            {/* Top accent line on hover */}
            <div className="arc-card-accent" />

            {/* ── Card Header ── */}
            <div className="arc-card-header">

              <div className="arc-applicant-info">
                {/* Avatar */}
                <div className="arc-avatar">
                  {getInitials(application.user?.name)}
                </div>

                <div className="arc-name-block">
                  <h3>{name}</h3>
                  <span>Applicant #{String(index + 1).padStart(3, '0')}</span>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`arc-badge arc-badge-${status}`}>
                {STATUS_LABELS[status] || status}
              </span>

            </div>

            <div className="arc-divider" />

            {/* ── Card Body ── */}
            <div className="arc-card-body">

              {/* Resume */}
              {application.user?.resume ? (
                <a
                  href={application.user.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="arc-resume-btn"
                >
                  <IconFile />
                  View Resume
                </a>
              ) : (
                <span className="arc-no-resume">
                  <IconXCircle />
                  Resume not uploaded
                </span>
              )}

              {/* Profile */}
              <Link to={`/user/${application.user?.id || ''}`} className="arc-profile-btn">
                <IconUser />
                View Profile
              </Link>

              {/* Status Select */}
              <div className="arc-select-wrap">
                <select
                  className="arc-select"
                  value={status}
                  onChange={(e) => updatestates(application.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="recive_mail">Mail Sent</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

            </div>
          </div>
        )
      })}

    </div>
  )
}

export default ApplicationReview