import React, { Component } from 'react'
import io from "socket.io-client";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      messages: [],
      latitude: '',
      longitude: ''
    }
    this.updateMessage = this.updateMessage.bind(this)
    this.updateName = this.updateName.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = io.connect('http://127.0.0.1:4001');
  }
  updateMessage(e) {
    this.setState({
      message: e.target.value
    })
  };
  updateName(e) {
    this.setState({
      username: e.target.value
    })
  };

  addMessage = data => {
    this.setState({ messages: [...this.state.messages, data] })
  }

  handleSubmit(e) {
    const message = this.state.message
    const username = this.state.username
    e.preventDefault();
    this.socket.emit('sendMessage', {
      author: this.state.username,
      message: this.state.message
    })
    this.setState({
      message: '',
    })
  }

  // getLocation() {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     this.socket.emit('sendLocation', 
  //       this.setState({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     }), () => {
  //       console.log('location shared')
  //     })
      
  //   })
 

  // }
  
  componentDidMount() {
    this.socket.on('incomingMessage', (message) => {
      console.log(message)
      this.addMessage(message)
    })
  }
  render() {
    console.log(this.state.latitude)
    return (
      <div>
        <div>
    {this.state.messages.map(message => <div>{message.author}: {message.message}</div>)}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.username} onChange={this.updateName} placeholder='username'></input>
          <input value={this.state.message} onChange={this.updateMessage} placeholder='message'></input>
          <button>submit</button>
        </form>
        <button onClick={this.getLocation}>Show Location</button>
      </div>
    )
  }
}

