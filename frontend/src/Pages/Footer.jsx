import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Footer.css'
import useUser from '../hooks/UseUser'

function Footer() {
    const user=useUser()
  const year = new Date().getFullYear()

  return (
    <footer className="ft-footer">
      {/* top accent line */}
      <div className="ft-topline" />

      <div className="ft-inner">

        {/* Brand */}
        <div className="ft-brand">
          <span className="ft-logo">JobBoard</span>
          <p className="ft-tagline">Find work that fits your life.</p>
        </div>

        {/* Nav columns */}
         {user?.user_type=='employee'&&
        <div className="ft-cols">
          <div className="ft-col">
            <p className="ft-col-title">Explore</p>
            <Link to="/home" className="ft-link">Home</Link>
            <Link to="/home" className="ft-link">Browse Jobs</Link>
            <Link to="/user" className="ft-link">My Profile</Link>
          </div>
          <div className="ft-col">
            <p className="ft-col-title">Account</p>
            <Link to="/editeprofile" className="ft-link">Edit Profile</Link>
            <Link to="/applicationstatus" className="ft-link">Application Status</Link>
            <Link to="/user" className="ft-link">Update resume</Link>
          </div>
        </div>
            }
      </div>

      {/* bottom bar */}
     
      <div className="ft-bottom">
        <p className="ft-copy">© {year} JobBoard. All rights reserved.</p>
        <div className="ft-dots">
          <span className="ft-dot" />
          <span className="ft-dot ft-dot--accent" />
          <span className="ft-dot" />
        </div>
      </div>
    </footer>
  )
}

export default Footer