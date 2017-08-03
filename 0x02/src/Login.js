import React, { Component } from 'react';

class Login extends Component {
  render() {
    var myObj = this.props.userData;
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
    return (
      <div className="container">
        <h3>User Infomation</h3>
        <ul>
          {listInfomation}
        </ul>
      </div>
    )
  }
}

export default Login;

