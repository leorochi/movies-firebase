import React from 'react'

const Input = ({id, label, type, value, onChange}) => {
  return (
    <>
    <label htmlFor={id}>{label}</label>
    <input name={id} type={type} value={value} onChange={onChange} />
    </>
  )
}

export default Input