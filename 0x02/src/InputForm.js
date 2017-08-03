import React from 'react'

export const InputForm = (props)  => {
  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor={props.value}>{props.label}: </label>
        <input type={props.type} id={props.value} name={props.value} className={"form-control " + (props.errorState ? 'input-error' : '')} placeholder={props.placeholder}/>
      </div>
    </div>
  )
}
