import React from 'react'
import { useParams } from 'react-router-dom'

function Company() {
    const{id}=useParams()
  return (
    <div>company {id}</div>
  )
}

export default Company