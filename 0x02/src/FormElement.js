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

export const Radios = (props)  => {
  return (
    <div className="form-check form-check-inline">
      <label className="form-check-label">
        <input className="form-check-input" type="radio" name="gender" id={props.value} value={props.value} /> {props.text}
      </label>
    </div>
  )
}
