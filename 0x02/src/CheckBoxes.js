import React from 'react'

export const CheckBoxes = (props)  => {
  return (
    <div className="form-check form-check-inline" key={ props.key }>
      <label className="form-check-label">
        <input className="form-check-input" type="radio" name="gender" id={props.value} value={props.value} /> {props.text}
      </label>
    </div>
  )
}


