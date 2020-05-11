import React, { Component } from 'react'
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      text: [],
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

  addMessage = message => {
    console.log(message, 'message')
    this.setState({ text: [...this.state.text, message] })
    console.log(this.state.text)
  }


  handleSubmit(e) {
    const message = this.state.message
    e.preventDefault();
    this.socket.emit('sendMessage', message, () => {
      console.log('message was delivered')
    })
    this.setState({
      message: ''
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
    this.socket.on('incomingMessage', (message) => {
      console.log(message)
      this.addMessage(message)
    })
  }
  render() {
    return (
      <div>
        <div>
          {this.state.text.map(message => {
            return (
              <div>{message}</div>
            )
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.message} onChange={this.updateState}></input>
          <button>submit</button>
        </form>
        <button onClick={this.getLocation}>Show Location</button>
      </div>
    )
  }
}

