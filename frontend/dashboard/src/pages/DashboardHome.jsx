import React from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/sidebar/Sidebar'

export default function DashboardHome(){
  return (
    <div>
      <div style={{display:'flex'}}>
        <div style={{flex:1, padding:16}}>
          <h2>Tableau de bord</h2>
          <p>Bienvenue dans le dashboard admin. Utilisez le menu pour naviguer.</p>
        </div>
      </div>
    </div>
  )
}
