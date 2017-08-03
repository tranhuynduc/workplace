import React, { Component } from 'react';

class HelllWorld extends Component {
	constructor(props) {
 
		super(props);
		this.state = {
			title: 'Hello World',
      self: 'app'
		}

    this.updateTitle = this.updateTitle.bind(this);
       console.log('HelloWorld contructor', props);
	}

  componentWillMount() {
    console.log('HelllWorld: componentWillMount');
  }

  componentDidMount() {
    console.log('HelllWorld: componentDidMount');
  }

  componentWillReceiveProps(nextProps) {

    console.log('HelllWorld: componentWillReceiveProps nextProps: ', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('HelllWorld: shouldComponentUpdate nextProps: ', nextProps, ' nextStete: ', nextState);
   // if(nextProps.title === '') {
   //   // this.props.title = 'new title';
   //   console.log('your title is empty');

   // }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {

    console.log('HelllWorld componentWillUpdate nextProps: ', nextProps, ' nextState: ', nextState);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('HelllWorld componentDidUpdate prevProps: ', prevProps, ' prevState: ', prevState); 
  }




  updateTitle() {
    console.log(this.refs.titleInput.value);
    this.props.changeTitle(this.refs.titleInput.value);
  }

  render() {
    console.log('HelllWorld: render');
    return (
      <div className="container">
        <h1>{this.props.title}</h1>
        <input type="text" ref="titleInput" placeholder="Input new title" />
        <button onClick={this.updateTitle}>Change Title</button>
      </div>
    )
  }
}

export default HelllWorld;