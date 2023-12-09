import React from 'react'

export default function Input({type='text',id,name,title,value,onChange,errors,onBlur,touched}) {
  return (
    <>
      <div className="input-group my-2">
        <label htmlFor="id" className='me-3 w-100'>{title}</label>
        <input type={type} name= {name} className='form-control' id={id} value={value} onChange={onChange} onBlur={onBlur} style={{width:'250px'}} />
        { touched[name] && errors[name] && <p className='text text-danger'>{errors[name]}</p> }
      </div>
    </>
  )
}
