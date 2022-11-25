import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

useEffect(() => {
  if( !props.auth ) {
    navigate("/")
  }
}, [props.auth] )

export function Dashboard( props ) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">

        </div>
      </div>
    </div>
  )
}