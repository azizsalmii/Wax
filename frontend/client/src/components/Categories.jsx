import React from 'react'

export default function Categories({ categories = [] }) {
  if (!categories.length) return <div style={{ color: '#888', fontStyle: 'italic' }}>Aucune catégorie</div>

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    margin: '20px 0',
  }

  const badgeStyle = {
    background: 'linear-gradient(135deg, #000000ff 0%, #222 100%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: '14px',
    padding: '10px 20px',
    borderRadius: '25px',
    textTransform: 'capitalize',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)'
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'none'
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <div style={containerStyle}>
      {categories.map((c, i) => (
        <div
          key={i}
          style={badgeStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {c}
        </div>
      ))}
    </div>
  )
}
