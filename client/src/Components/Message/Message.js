import React, { Component } from 'react'
import io from "socket.io-client";
import { connect } from 'react-redux';
import moment from 'moment';
import {
  updateMessage,
  addMessage
} from './messageAction';

class Message extends Component {
  constructor(props) {
    super(props);

    this.getMessage = this.getMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

    this.socket = io.connect('http://127.0.0.1:4001');
  }
  getMessage(e) {
    const {dispatch} = this.props;
    const {value} = e.target;
    dispatch(updateMessage(value))
  };


  addMessage = messages => {
    const {dispatch} = this.props;
    dispatch(addMessage(messages))
  }

  handleSubmit(e) {
    const {message} = this.props;
    e.preventDefault();
    this.socket.emit('sendMessage',message)
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
      // this.addMessage(message)
    })
  }
  render() {
    return (
      <div>
        {/* <div>
          {this.props.messages.map((message,index) => (
            <div key={index}>{moment(message.createdAt).format('h:mm')} {message.message}  </div>))}
        </div> */}
        <form onSubmit={this.handleSubmit}>
          <input value={this.props.message} onChange={this.getMessage} placeholder='message'></input>
          <button>submit</button>
        </form>
        <button onClick={this.getLocation}>Show Location</button>
      </div>
    )
  }
}


function mapStoreToProps(store) {
  return {
    message: store.message.message,

  }
}

export default connect(mapStoreToProps)(Message)