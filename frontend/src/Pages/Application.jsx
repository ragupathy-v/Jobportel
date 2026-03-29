import { Link, useParams } from 'react-router-dom'
import '../Styles/Application.css'

function Application() {
  const { id } = useParams()

  return (
    <div className="app-wrapper">
      <div className="card">
        <div className="icon-ring">
          <svg className="check-icon" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="check-circle" cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2.5" fill="none"/>
            <path className="check-path" d="M14 26L22 34L38 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="title">You're in!</h1>
        <p className="subtitle">Application successfully submitted</p>

        {/* {id && (
          <div className="ref-badge">
            <span className="ref-label">Reference ID</span>
            <span className="ref-value">#{id}</span>
          </div>
        )} */}

        <p className="note">
          We've received your application and will be in touch shortly.
          Keep an eye on your inbox for next steps.
        </p>

        <div className="actions">
          <Link to='/home' className="btn-primary text-decoration-none" >
            Back to Home
          </Link>
          {/* <button className="btn-ghost">
            Track Status
          </button> */}
        </div>
      </div>

      <div className="blob blob-1" />
      <div className="blob blob-2" />
    </div>
  )
}

export default Application