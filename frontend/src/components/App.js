import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import PostList from './PostList'
import AddButton from './AddButton'
import * as API from '../utils/api'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      posts: null,
    }
  }

  componentDidMount() {
    API.fetchCategories()
      .then((categories) => {
        this.setState(() => ({
          categories
      }))
    })
    API.fetchPosts()
      .then((posts) => {
        this.setState(() => ({
          posts
        }))
      })
  }

  render() {
    return (
      <div className="App">
        <Header categories={this.state.categories}/>
        <PostList posts={this.state.posts} />
        <AddButton />
      </div>
    );
  }
}

export default App;
