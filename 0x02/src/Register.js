import React, { Component } from 'react';
import {InputForm, Radios} from './FormElement.js';
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
      login: false,
      userGender: '',
      userHobbies: [],
      isSubmited: false
    }

  }

  submitRegister = (e) => {
    e.preventDefault();

    let form = this.refs.formRegister,
        username = form.username.value,
        password = form.password.value,
        confirmPassword = form.confirmPassword.value,
        email = form.email.value,
        phone = form.phone.value,
        errors = [],
        errorState = {},
        userData = {},

        mess = '';

    mess = validateName2(username);;
    if (mess !== '' ) {
      errors.push(mess);
      errorState.username = true;
    } else {
      errorState.username = false;
    }

    mess = validatePassword2(password);
    if (mess !== '' ) {
      errors.push(mess);
      errorState.password = true;
    } else {
      mess = isMatch2(password, confirmPassword);
      if (mess !== '' ) {
        errors.push(mess);
        errorState.password = true;
      } else {
      errorState.password = false;
      }
    }

    mess = validateEmail2(email);
    if (mess !== '' ) {
      errors.push(mess);
      errorState.email = true;
    } else {
      errorState.email = false;
    }
    mess = validatePhone2(phone);
    if (mess !== '' ) {
      errors.push(mess);
      errorState.phone = true;
    } else {
      errorState.phone = false;
    }

    if (errors.length > 0) {
       this.setState({
         error: errors,
         errorState: errorState
       })
    } else {
      userData = {
        'username': username,
        'email': email,
        'password': password,
        'phone': phone,
        'country': this.refs.country.value,
        'gender': this.refs.formRegister.gender.value,
        'hobbies' :this.state.userHobbies
      }
      this.setState({
        isSubmited: true,
        userInfo: userData
      })
    }
  }

  handleCheckboxChange = (e) => {
    var target = e.target,
        value  = target.value,
        userHobbies = this.state.userHobbies;

    if (target.checked) {
      userHobbies.push(value);
    } else {
      userHobbies.splice(userHobbies.indexOf(value), 1);
    }
    this.setState({
      userHobbies: userHobbies
    })
  }

  showInfo = () => {
    var myObj = this.state.userInfo;
    var listInfomation = [];
    Object.keys(myObj).forEach(function (key, index) {
      let obj = myObj[key];
      if (typeof obj === 'object') {
        var item = obj.map((value, i) =>(
          value + ', '
        ))
        listInfomation.push(<li className="text-left" key={index}>{key}: {item}</li>);
      } else {
        listInfomation.push(<li className="text-left" key={index}>{key}: {obj}</li>);
      }
    });
    return listInfomation;
  }

  render() {
    if (this.state.isSubmited) {
      return (
        <div className="container">
          <h3>User Infomation</h3>
          <ul>
            {this.showInfo()}
          </ul>
        </div>
      )
    } else {
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
          <form className="form-register" ref="formRegister" onSubmit={this.submitRegister}>
            <div className="row">
              <InputForm
                type="test"
                value="username"
                label="Username"
                placeholder="Your Name"
                errorState={this.state.errorState.username}
              />
              <InputForm
                type="test"
                value="email"
                label="Email"
                placeholder="Your Email"
                errorState={this.state.errorState.email}
              />
              <InputForm
                type="password"
                value="password"
                label="Password"
                placeholder="Your Password"
                errorState={this.state.errorState.password}
              />
              <InputForm
                type="password"
                value="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                errorState={this.state.errorState.password}
              />
              <InputForm
                type="tel"
                value="phone"
                label="Phone Number"
                placeholder="Your Phone"
                errorState={this.state.errorState.phone}
              />
              <div className="col-md-6">
                <fieldset className="form-group" ref="gender" >
                  <legend>Radio buttons</legend>
                  {
                    this.state.data.gender.map(([text, value], key) =>(
                      <Radios
                        text={text}
                        value={value}
                        key={key}
                      />
                    ))
                  }
                </fieldset>
              </div>
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
                          <input onChange={this.handleCheckboxChange} name="hobbies" className="form-check-input" type="checkbox" id={value} value={value} /> {value}
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
}

export default Register;
