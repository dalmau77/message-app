import React, { Component } from 'react'

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      room: ''
    }
    this.updateName = this.updateName.bind(this)
    this.updateRoom = this.updateRoom.bind(this)
    this.OnRoomSubmit = this.OnRoomSubmit.bind(this)
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

  OnRoomSubmit = (e) => {
    e.preventDefault()
   
    this.props.handleData(this.state)
  }

  render() {
    return (
      <div>
        <div>
          <h1>Display</h1>
          <form>
            <label>Display</label>
            <input type='text' value={this.state.username} onChange={this.updateName} placeholder='display-name'></input>
            <label>Room</label>
            <input type='text' value={this.state.room} onChange={this.updateRoom} placeholder="room" required />
            <button onClick={this.OnRoomSubmit}>Join</button>
          </form>
        </div>
      </div>
    )
  }
}
