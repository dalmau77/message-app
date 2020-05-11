import React, { Component } from 'react'
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      endPoint: "http://127.0.0.1:4001"
    }
    this.updateState = this.updateState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = io.connect('http://127.0.0.1:4001');
  }
  updateState(e) {
    this.setState({
      message: e.target.value
    })
  };
  handleSubmit(event) {
    const {message} = this.state
    event.preventDefault();
    this.socket.emit('sendMessage', message, () => {
      console.log('message was delivered')
      this.setState({
        message: ''
      })
    })
  }

  getLocation() {
    // const socket = io(endPoint)
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.longitude)
      console.log(position.coords.latitude)
    })
  }

  componentDidMount() {
    this.socket.on('message', (message) => {
      console.log(message)
    }) 
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.props.message} onChange={this.updateState}></input>
          <button>submit</button>
        </form>
          <button onClick={this.getLocation}>Show Location</button>
      </div>
    )
  }
}

