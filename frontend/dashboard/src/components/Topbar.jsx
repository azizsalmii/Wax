import React from 'react'

export default function Topbar(){
  return (
    <div className="header">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src="/logo.svg" alt="WAX" className="logo"/>
      </div>
      <div style={{fontWeight:600,color:'#5b2b00'}}>Admin</div>
    </div>
  )
}
