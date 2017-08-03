import React, { Component } from 'react';
import FormGroup, { Input,Radio, Checkbox, Select } from './FormGroup.js';


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
      error: {
        username: '',
        email: '',
        password: '',
        phone: '',
        confirm: ''
      },
      userInfo: {
        username: '',
        email: '',
        password: '',
        confirm: '',
        phone: '',
        country: '',
        gender: '',
        hobbies: []
      },
      userPass: '',
      isSubmited: false,

    }

  }

  submitRegister = (e, requireField) => {
    e.preventDefault();
    var that = this,
        isValid = true,
        object = {};
    requireField.map((value) => {
      object = {
        value: '',
        id: value
      }
      if (this.state.userInfo[value] === '') {
        isValid = false;
        that.validate(object);
      }
      return true;

    })
    if (isValid) {
      this.setState({
        isSubmited: true
      })
    }
  }

  validate = (data) => {
    var mess = '',
        name = data.id,
        value = data.value;

    switch (name) {
      case 'username':
        mess = validateName(value);
        break;
      case 'email':
        mess = validateEmail(value);
        break;
      case 'confirm':
        mess = validateConfirm(this.state.userPass, value);
        break;
      case 'password':
        mess = validatePassword(value);
        if (mess === '') {
          this.setState({
            userPass: value
          })
        }
        break;
      case 'phone':
        mess = validatePhone(value);
        break;
      default:
        break;
    }

    var state = {};
    state[name] = mess;

    var userinfo = this.state.userInfo;
    if (mess === '') {
      userinfo[name] = value;
    }
    var error = this.state.error;
    error[name] = mess;

    this.setState({
      error: error
    })

  }

  handleCheckboxChange = (value, isChecked) => {
    var userHobbies = this.state.userInfo.hobbies;

    if (isChecked) {
      userHobbies.push(value);
    } else {
      userHobbies.splice(userHobbies.indexOf(value), 1);
    }
  }

  handleInfoChange = (target, value) => {
    var userInfo = this.state.userInfo;
    userInfo[target] = value;
    this.setState({
      userInfo: userInfo
    })
  }

  formRegister = () => {
    return (
      <div className="container register">
        <FormGroup
          onSubmit={this.submitRegister}
          require={['username', 'password', 'email', 'confirm', 'phone']}
        >
          <div className="row">
            <Input
              ref="username"
              type="text"
              id="username"
              label="Username"
              placeholder="yourmail@example.com"
              validate={this.validate}
              errorState={this.state.error.username}
            />
            <Input
              type="text"
              id="email"
              label="Email"
              placeholder="Your Email"
              validate={this.validate}
              errorState={this.state.error.email}
            />
            <Input
              type="password"
              id="password"
              label="Password"
              placeholder="Your Password"
              validate={this.validate}
              errorState={this.state.error.password}
            />
            <Input
              type="password"
              id="confirm"
              label="Confirm Password"
              placeholder="Confirm Password"
              validate={this.validate}
              errorState={this.state.error.confirm}
            />
            <Input
              type="text"
              id="phone"
              label="Phone Number"
              placeholder="xxx-xxx-xxx(x)"
              validate={this.validate}
              errorState={this.state.error.phone}
            />
            <Radio
              name="gender"
              label="Your Gender"
              data={this.state.data.gender}
              onChange={this.handleInfoChange}

            />
            <Select
              name="country"
              label="Your Country"
              default="Please select your country"
              data={this.state.data.country}
              onChange={this.handleInfoChange}
            />
            <Checkbox
              name="Hobbies"
              data={this.state.data.hobbies}
              onChange={this.handleCheckboxChange}
            />
            <div className="col-md-12 text-right" >
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </FormGroup>
      </div>
    )
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
    if (!this.state.isSubmited) {
      return (
        this.formRegister()
      )
    } else {
      return (
        <div className="container">
          <h3>User Infomation</h3>
          <ul>
            {this.showInfo()}
          </ul>
        </div>
      )
    }
  }
}

export default Register;



function validateName(name) {
  var mess = ''
  if (name === '') {
    mess ='Please fill your username';
  } else if(!regName(name)) {
    mess = 'Username must be at least 6 charactor and doesn\'t contain specific charactor';
  }
  return mess
}
function validatePhone(phone) {
  var mess = ''
  if (phone === '') {
    mess = 'Please fill your phone number';
  } else if (!regPhone(phone)) {
    mess =
    mess = 'Phone must be formatted like: xxx-xxx-xxx(x)';
  }
  return mess;
}

function validatePassword(password) {
  var mess = '';

  if (password === '') {
    mess = 'Please fill your password';
  } else if(!regPasswrod(password)) {
    mess = 'Password must be at least 8 charactor, contain at leat 1 uppercase, 1 lowwercase and 1 specific key';
  }

  return mess;
}

function validateConfirm(password, confirm) {
  var mess = '';
  if (confirm === '') {
    mess = 'Please fill your confirm password';
  } else if (password !== confirm){
    mess = 'Your password is not match';
  }

  return mess;
}

function validateEmail(email) {
  var mess = '';
  if (email === '') {
    mess = 'Please fill your email';
  } else if(!regEmail(email)) {
    mess = 'Email must be formatted like: test@gmail.com';
  }
  return mess;
}

function regName(name) {
  return (/^[a-zA-Z]+[a-zA-Z0-9_]{4,}[a-zA-Z0-9]+$/).test(name);
}

function regPasswrod(password) {
  return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])[a-zA-Z\d\W\s]{8,32}$/).test(password);
}

function regEmail(email) {
  return (/^[\w\S]+@[\w\S]+\.[\w\S]+$/).test(email);
}

function regPhone(phone) {
  return (/^[0-9]{3}-[0-9]{3}-[0-9]{3,4}$/).test(phone);
}
