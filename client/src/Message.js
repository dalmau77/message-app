import React, { Component } from 'react'
import io from "socket.io-client";
import Join from './Join'
import moment from 'moment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      latitude: '',
      longitude: '',
      date: ''
    }
    this.updateMessage = this.updateMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = io.connect('http://127.0.0.1:4001');
  }
  updateMessage(e) {
    this.setState({
      message: e.target.value
    })
  };


  addMessage = data => {
    this.setState({ messages: [...this.state.messages, data] })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.socket.emit('sendMessage', {
      message: this.state.message,
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
  getRoomInfo(username, room) {
    console.log(room)
    console.log(username)
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
      <Join onSubmit={this.getRoomInfo}/>
        <div>
          {this.state.messages.map(message => (
            <div>{moment(message.createdAt).format('h:mm')} {message.message}  </div>))}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.message} onChange={this.updateMessage} placeholder='message'></input>
          <button>submit</button>
        </form>
        <button onClick={this.getLocation}>Show Location</button>
      </div>
    )
  }
}

