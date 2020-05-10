import React, { Component } from 'react'
import socketIOClient from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      endPoint: "http://127.0.0.1:4001"
    }
    this.updateState = this.updateState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  updateState(e) {
    this.setState({
      message: e.target.value
    })
  };
  handleSubmit(event) {
    const { endPoint } = this.state;
    const socket = socketIOClient(endPoint)
    const {message} = this.state
    event.preventDefault();
    socket.emit('sendMessage', message)
  }

  componentDidMount() {
    const { endPoint } = this.state;
    const socket = socketIOClient(endPoint)
    socket.on('message', (message) => {
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
      </div>
    )
  }
}

