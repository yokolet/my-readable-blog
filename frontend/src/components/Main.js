import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Post from './Post'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:id" component={Post} />
        </Switch>
      </main>
    )
  }
}

export default Main