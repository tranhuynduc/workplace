import React, { Component } from 'react'

export default class FormGroup extends Component {

  handleSubbmit = (e) => {
    this.props.onSubmit(e, this.props.require);
  }
  render() {
    return (
      <form className="form-register" ref="formRegister" onSubmit={this.handleSubbmit}>
        {this.props.children}
      </form>
    )
  }
}

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    }
  }
  validate = (e) => {

    var data = {
      id: this.props.id,
      value: e.target.value,
      type: this.props.type
    }

    this.props.validate(data);
    this.setState({focus: false});
  }

  removeError = () => {
    this.setState({
      focus: true
    })
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor={this.props.id}>{this.props.label} : </label>
          <input
            ref={this.props.id}
            id={this.props.id}
            type={this.props.type}
            className={"form-control " + (this.props.errorState === '' ? '' : 'input-error')}
            placeholder={this.props.placeholder}
            onBlur={this.validate}
            onFocus={this.removeError}/>
          <p className="msg-error">
            {!this.state.focus && this.props.errorState}
          </p>
        </div>
      </div>
    )
  }
}

export class Radio extends Component {

  handleChange = (e) => {
    this.props.onChange(this.props.name, e.target.value);
  }
  render() {
    return (
      <div className="col-md-6">
        <fieldset className="form-group" ref="gender" >
          <legend>{this.props.label}</legend>
          {
            this.props.data.map(([text, value], key) => (

                <div className="form-check form-check-inline" key={key}>
                  <label className="form-check-label">
                    <input className="form-check-input" type="radio" name="gender" id={value} value={value} onChange={this.handleChange}/> {text}
                  </label>
                </div>
            ))
          }
        </fieldset>
      </div>
    )
  }
}

export class Checkbox extends Component {

  handleChange = (e) => {
    this.props.onChange(e.target.value, e.target.checked);
  }
  render() {
    return (
      <div className="col-md-6">
        <div className="form-group" ref="hobbies">
          <legend>{this.props.name}</legend>
          {
            this.props.data.map((value, key) => (
              <div key={key} className="form-check form-check-inline">
                <label className="form-check-label">
                  <input onChange={this.handleChange} name={value} className="form-check-input" type="checkbox" id={value} value={value} /> {value}
                </label>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}



export class Select extends Component {

  handleChange = (e) => {
    this.props.onChange(this.props.name, e.target.value);
  }
  render() {
    return (
      <div className="col-md-6">
         <div className="form-group">
           <label htmlFor="hobby">{this.props.label}</label>
           <select ref="country" className="form-control" id="hobby" onChange={this.handleChange}>
             <option value=''>{this.props.default}</option>
             {
               this.props.data.map(([text, value], key) =>(
                 <option key={ key } value={ value }>{ text }</option>
               ))
             }
           </select>
         </div>
       </div>
    )
  }
}

