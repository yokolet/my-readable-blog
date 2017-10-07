import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Post from './Post'
import Category from './Category'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:category" component={Category} />
          <Route path="/:category/:id" component={Post} />
        </Switch>
      </main>
    )
  }
}

export default Main
