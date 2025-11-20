import React from 'react'

export default function Footer(){
  return (
    <footer style={{background:'#2b2b2b',color:'#fff',padding:'20px 16px',marginTop:24}}>
      <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <strong>WAX</strong>
          <div style={{fontSize:13,opacity:0.9}}>Authentic African fabrics & garments</div>
        </div>
        <div style={{fontSize:13}}>
          <div>Contact: contact@wax.example</div>
          <div>© {new Date().getFullYear()} WAX</div>
        </div>
      </div>
    </footer>
  )
}
