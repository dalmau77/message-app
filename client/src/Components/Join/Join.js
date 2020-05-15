import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      room: '',
    }
    this.updateName = this.updateName.bind(this)
    this.updateRoom = this.updateRoom.bind(this)
    this.onRoomSubmit = this.onRoomSubmit.bind(this)
  }
  updateName(e) {
    this.setState({
      username: e.target.value
    })
  };
  updateRoom(e) {
    this.setState({
      room: e.target.value
    })
  };

  onRoomSubmit = (e) => {
    e.preventDefault()
    const room = this.state.room
    const username = this.state.username
    this.setState({
      username,
      room
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Display</h1>
          <form onSubmit={this.onRoomSubmit} action='/chat-room'>
            <label>Display</label>
            <input type='text' value={this.state.username} onChange={this.updateName} placeholder='display-name'></input>
            <label>Room</label>
            <input type='text' value={this.state.room} onChange={this.updateRoom} placeholder="room" required />
           <Link to={'/chat-room'}><button onSubmit={() => this.onRoomSubmit(this.state.username, this.state.room)}>Join</button></Link>
          </form>
        </div>
      </div>
    )
  }
}
