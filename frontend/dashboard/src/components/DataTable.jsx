import React from 'react'

export default function DataTable({columns, data}){
  return (
    <table className="table">
      <thead>
        <tr>{columns.map((c,i)=><th key={i}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row,i)=>(
          <tr key={i}>{columns.map((c,j)=><td key={j}>{row[c] ?? ''}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}
