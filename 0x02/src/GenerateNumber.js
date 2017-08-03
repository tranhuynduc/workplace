import React from 'react';




export default class GenerateNumber extends React.Component {
  constructor(props) {
    console.log('GenerateNumber contructor', props);
    super(props);
    this.state = {
      number: props.initialNumber,
      arrNumber: [props.initialNumber],
      arrMax: 10,
      isFull: 'hide'
    }


  }

  // componentWillMount() {
  //   console.log('GenerateNumber: componentWillMount');
  // }

  // componentDidMount() {
  //   console.log('GenerateNumber: componentDidMount');
  // }

  // componentWillReceiveProps(nextProps) {
  //   console.log('GenerateNumber: componentWillReceiveProps nextProps: ', nextProps);

  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('GenerateNumber: componentWillReceiveProps nextProps: ', nextProps, ' nextStete: ', nextState);
  //   return true;
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   console.log('GenerateNumber componentWillUpdate nextProps: ', nextProps, ' nextState: ', nextState);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('GenerateNumber componentDidUpdate prevProps: ', prevProps, ' prevState: ', prevState);
  // }

  componentWillUnMount() {
    console.log('componentWillUnMount');
  }



  changeNumber() {
    var number = getRandom();
    while (number === this.state.number) {
      number = getRandom();
    }
    this.state.arrNumber.push(number);
    this.setState({
      number: number
    })
  }

  newNumber() {
    var newNumber = getRandom(),
        array = this.state.arrNumber,
        len = array.length;

    if (len >= this.state.arrMax) {
      this.setState({
        isFull: 'show'
      })
      return;
    }

    while (array.indexOf(newNumber) !== -1) {
      newNumber = getRandom();
    }
    array.push(newNumber);

    this.setState({
      arrNumber: array,
      number: newNumber
    })
  }

  removeNumber() {
    // console.log(this);
    var array = this.state.arrNumber,
        random = getRandom(array.length) - 1,
        number = array[random];
    array.splice(random, 1);
    this.setState({
      arrNumber: array,
      number: number
    })
  }

  // getRandom = (max) => Math.ceil((Math.random() * max));



  sortArray() {
    var array = this.state.arrNumber;
    var temp, i = 0, len = array.length;
    for (i = 0; i < len - 1; i++) {
      for (var j = i + 1; j < len; j++) {
        if (array[i] > array[j]) {
          temp = array[i];
          array[i] = array[j]
          array[j] = temp;
        }
      }
    }
    this.setState({
      arrNumber: array
    })
  }

  render() {
    var listNumber = this.state.arrNumber.map((num) => num + ', ');
    return (
      <div className="container">
        <p>New number: {this.state.number} </p>
        <p>List number: {listNumber} </p>
        <button onClick={this.changeNumber.bind(this)}>Change Number</button>
        <button onClick={this.newNumber.bind(this)}>New Number</button>
        <button onClick={this.removeNumber.bind(this)}>Remove Number</button>
        <p className={this.state.isFull}>Your arr is full</p>
        <button onClick={this.sortArray.bind(this)}>Sort Array</button>
      </div>
    )
  }
}

var getRandom = (max = 10) => Math.ceil((Math.random() * max));
