import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'




export function Dashboard( props ) {
  const navigate = useNavigate()

  useEffect(() => {
    if( !props.auth ) {
      navigate("/")
    }
  }, [props.auth] )
  
  return (
    <div className="container">
      <div className="row">
        <div className="col">

        </div>
      </div>
    </div>
  )
}