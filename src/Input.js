import React, { Component } from 'react'

export default class FormGroup extends Component {
 
  validate = (e) => {
    console.log(e);
    var data = {
      id: this.props.id,
      value: e.target.value,
      type: this.props.type
    }

    this.props.validate(data);
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor={this.props.id}>{this.props.label} : </label>
          <input ref={this.props.id} id={this.props.id} type={this.props.type} className={"form-control " + (this.props.errorState === '' ? '' : 'input-error')} placeholder={this.props.placeholder} onBlur={this.validate}/>
          <label>{this.props.errorState}</label>
        </div>
      </div>
    )
  }
}

