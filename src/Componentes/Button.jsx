import React from 'react'

const Button = ({texto, onClick}) => {
  return (
    <button onClick={onClick} style={{marginTop: '20px'}}>{texto}</button>
  )
}

export default Button