import React from 'react'

const Button = ({ children, onClick }) => {
  return (
    <button
      style={{
        display: 'flex',
        padding: '5px 10px',
        margin: '0 auto',
        borderRadius: '5px',
        color: 'white',
        background: 'blue',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
