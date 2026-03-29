import '../Styles/ApplicationStatus.css'
import React, { useEffect, useState } from 'react'
import useUser from '../hooks/UseUser'
import axiosInstant from '../Axios/AxiosInstant'


/* ── helpers ── */
function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

const STATUS_MAP = {
  pending:     { label: 'Pending',     cls: 'as-badge-pending' },
  recive_mail: { label: 'Mail Sent',   cls: 'as-badge-recive_mail' },
  rejected:    { label: 'Rejected',    cls: 'as-badge-rejected' },
}

/* ── skeleton while loading ── */
function Skeleton() {
  return (
    <>
      {[1, 2, 3].map(i => (
        <div className="as-skeleton" key={i}>
          <div className="sk sk-logo" />
          <div className="sk-block">
            <div className="sk sk-line sk-line-sm" />
            <div className="sk sk-line sk-line-lg" />
          </div>
          <div className="sk sk-badge" />
        </div>
      ))}
    </>
  )
}

function ApplicationStatus() {
  const user = useUser()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchApplication() {
    try {
      setLoading(true)
      const res = await axiosInstant.get('company/application/', {
        params: { userid: user?.id }
      })
      setApplications(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user?.id) fetchApplication()
  }, [user])

  return (
    <div className="as-container">

      {/* ── Header ── */}
      <div className="as-header">
        <h2>My <span>Applications</span></h2>
        {!loading && (
          <p>{applications.length} application{applications.length !== 1 ? 's' : ''} found</p>
        )}
      </div>

      {/* ── Loading ── */}
      {loading && <Skeleton />}

      {/* ── Empty state ── */}
      {!loading && applications.length === 0 && (
        <div className="as-empty">
          <div className="as-empty-icon">📭</div>
          <h3>No applications yet</h3>
          <p>Jobs you apply for will appear here.</p>
        </div>
      )}

      {/* ── Cards ── */}
      {!loading && applications.map((app) => {
        const companyName = app.job?.company?.name || 'Unknown Company'
        const status = app.status || 'pending'
        const { label, cls } = STATUS_MAP[status] ?? { label: status, cls: 'as-badge-pending' }

        return (
          <div className="as-card" key={app.id}>

            {/* Company logo / initials */}
            <div className="as-logo">
              {getInitials(companyName)}
            </div>

            {/* Info */}
            <div className="as-content">
              <p className="as-company">{companyName}</p>
              <p className="as-job-title">{app.job?.title || 'Untitled Role'}</p>
            </div>

            {/* Status badge */}
            <span className={`as-badge ${cls}`}>
              <span className="as-badge-dot" />
              {label}
            </span>

          </div>
        )
      })}

    </div>
  )
}

export default ApplicationStatus