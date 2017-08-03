import React, { Component } from 'react';
import FormGroup from './Input.js';
// import {Radios} from './Radios.js';

function validateName(name) {
  return (/^[a-zA-Z]+[a-zA-Z0-9_]{4,}[a-zA-Z0-9]+$/).test(name);
}

function validateName2(name) {
  var mess = ''
  if (name === '') {
    mess ='Please fill your username';
  } else if(!validateName(name)) {
    mess = 'Username must be at least 6 charactor and doesn\'t contain specific charactor';
  }
  return mess
}
function validatePhone2(phone) {
  var mess = ''
  if (phone !== '' && !validatePhone(phone)) {
    mess = 'Phone must be formatted like: xxx-xxx-xxx(x)';
  }

  return mess;
}

function validatePassword2(password) {
  var mess = '';

  if (password === '') {
    mess = 'Please fill your password';
  } else if(!validatePassword(password)) {
    mess = 'Password must be at least 8 charactor, contain at leat 1 uppercase, 1 lowwercase and 1 specific key';
  }

  return mess;
}

function isMatch2(password, confirm) {
  var mess = '';
  if(!isMatch(password, confirm)) {
    mess = ('Your password is not match');
  }

  return mess;
}

function validateEmail2(email) {
  var mess = '';
  if (email === '') {
    mess = 'Please fill your email';
  } else if(!validateEmail(email)) {
    mess = 'Email must be formatted like: test@gmail.com';
  }

  return mess;
}

function validatePassword(password) {
  return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[a-zA-Z\d\W\s]{8,32}$/).test(password);
}
function isMatch(password, confirm) {
  return password === confirm;
}

function validateEmail(email) {

  return (/^[\w\S]+@[\w\S]+\.[\w\S]+$/).test(email);
}

function validatePhone(phone) {
  return (/^[0-9]{3}-[0-9]{3}-[0-9]{3,4}$/).test(phone);
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Register',
      data: {
        gender: [
          ['Male', 'male'],
          ['Female', 'female']
        ],
        country: [
          ['Viet Nam', 'VN'],
          ['Japan', 'JP'],
          ['United States', 'US'],
          ['Korea', 'KR'],
          ['France', 'FR']
        ],
        hobbies : ['Jquery', 'Vue', 'React']
      },
      error: [],
      errorState: {
        username: false,
        email: false,
        password: false,
        phone: false
      },
      error2: {
        email: '',
        password: '',
        username: '',
        phone: '',
        confirm: '',
        userPass: ''
      },
      userInfo: {
        email: '',
        password: '',
        username: '',
        phone: '',
        confirm: '',
        userPass: '',
        hobbies: []
      },
      login: false,
      userGender: '',
      userHobbies: [],
      email: '',
      password: '',
      username: '',
      phone: '',
      confirm: '',
      userPass: '',
      submit: true
    }

  }

  submitRegister(e) {
    this.setState({
      submit: true
    })
  }

  handleCheckboxChange(e) {
    var target = e.target,
        value  = target.value,
        userHobbies = this.state.userInfo.hobbies;

    if (target.checked) {
      userHobbies.push(value);
    } else {
      userHobbies.splice(userHobbies.indexOf(value), 1);
    }
    console.log(userHobbies);
    // this.setState({
      // this.state.userInfo[hobbies]: userHobbies
    // })
  }

  validate = (data) => {
    console.log('refs', this.refs.password);
    var mess = '';
    var name = data.id;
    var value = data.value;
    console.log(data);
    switch (name) {
      case 'username':
        mess = validateName2(value);
        break;
      case 'email':
        mess = validateEmail2(value);
        break;
      case 'confirm':
        mess = isMatch2(this.state.userPass, value);
        break;
      case 'password':

        mess = validatePassword2(value);
        if (mess === '') {
          this.setState({
            userPass: value
          })
        }
        break;
      case 'phone':
        mess = validatePhone2(value);
        break;
    }

    var state = {};
    state[name] = mess;

    if (mess === '') {
      var userinfo = this.state.userInfo;
      userinfo[name] = value;
      console.log('this.sate.userInfo', this.state.userInfo)
      // this.setState({
      //   [name]: value
      // })
    } else {
      this.setState({
        [name]: mess
      })
    }
      
  }

  componentWillUpdate(nextProps, nextState) {

  }
  render() {
    var errorList = null, isError = false;
    if (this.state.error.length > 0) {
      isError = true;
      errorList = this.state.error.map((value, key) => (
        value ? <li key={key}>{value}</li> : ''
      ))
    }
    return (
      <div className="container register">
        <div>
          <ul className={"list-errors " + (isError ? '' : 'hidden')}>
            {errorList}
          </ul>
        </div>
        <form className="form-register" ref="formRegister" onSubmit={this.submitRegister.bind(this)}>
          <div className="row">
            <FormGroup
              type="text"
              id="username"
              label="Username"
              placeholder="Your Name"
              validate={this.validate}
              errorState={this.state.username}
            />
            <FormGroup
              type="text"
              id="email"
              label="Email"
              placeholder="Your Email"
              validate={this.validate}
              errorState={this.state.email}
            />
            <FormGroup
              type="password"
              id="password"
              label="Password"
              placeholder="Your Password"
              validate={this.validate}
              errorState={this.state.password}
            />
            <FormGroup
              type="password"
              id="confirm"
              label="Confirm Password"
              placeholder="Confirm Password"
              validate={this.validate}
              errorState={this.state.confirm}
            />
            <FormGroup
              type="text"
              id="phone"
              label="Phone Number"
              placeholder="Your Phone"
              validate={this.validate}
              errorState={this.state.phone}
            />
     {/*       <div className="col-md-6">
                   <fieldset className="form-group" ref="gender" >
                     <legend>Radio buttons</legend>
                     {
                       this.state.data.gender.map(([text, value], key) =>(
                         <FormRadio
                           text={text}
                           value={value}
                           key={key}
                         />
                       ))
                     }
                   </fieldset>
                 </div> */}
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="hobby">Country</label>
                <select ref="country" className="form-control" id="hobby">
                  <option value=''>Please select your country</option>
                  {
                    this.state.data.country.map(([text, value], key) =>(
                      <option key={ key } value={ value }>{ text }</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group" ref="hobbies">
                <legend>Hobbies</legend>
                {
                  this.state.data.hobbies.map((value, key) => (
                    <div key={key} className="form-check form-check-inline">
                      <label className="form-check-label">
                        <input onChange={this.handleCheckboxChange.bind(this)} name="hobbies" className="form-check-input" type="checkbox" id={value} value={value} /> {value}
                      </label>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="col-md-12 text-right" >
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Register;
