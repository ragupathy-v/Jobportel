import React, { useEffect, useState } from 'react'
import axiosInstant from '../../Axios/AxiosInstant'
import { Link } from 'react-router-dom'
import logo from "../../Assert/logo/company.png"
import '../../Styles/AllCompanies.css'

function AllCompanies() {
  const [data, setData] = useState([])

  async function fetchCompanies() {
    try {
      const res = await axiosInstant.get('company/company/')
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { fetchCompanies() }, [])

  return (
    <div className="ac-page">
      {/* background blobs */}
      <div className="ac-blob ac-blob--1" />
      <div className="ac-blob ac-blob--2" />

      <div className="ac-inner">

        {/* ── Header ── */}
        <header className="ac-header">
          <span className="ac-label">✦ Explore</span>
          <h1 className="ac-title">Companies <em>Hiring Now</em></h1>
          <p className="ac-sub">
            <span className="ac-count">{data.length}</span> companies available
          </p>
        </header>

        {/* ── Grid ── */}
        <div className="ac-grid">
          {data.map((company, i) => (
            <Link
              to={`${company.id}`}
              key={company.id}
              className="ac-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* glow on hover */}
              <div className="ac-card-glow" />

              {/* logo */}
              <div className="ac-logo-wrap">
                <img
                  src={company.logo ? company.logo : logo}
                  alt={company.name}
                  className="ac-logo"
                />
              </div>

              {/* body */}
              <div className="ac-body">
                <h3 className="ac-name">{company.name}</h3>
                <p className="ac-about">{company.about}</p>

                <div className="ac-meta">
                  <span className="ac-address">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {company.address}
                  </span>
                </div>
              </div>

              {/* arrow */}
              <div className="ac-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AllCompanies