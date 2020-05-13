import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Message from './Message'
import Join from './Join'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Join}/>
            <Route exact path='/chat-room' component={Message}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

