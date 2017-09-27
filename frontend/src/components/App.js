import React, { Component } from 'react'
import './App.css'
import BasicNavbar from './BasicNavbar'
import PostList from './PostList'
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
        <BasicNavbar categories={this.state.categories}/>
        <div className="App-header">
          <div>Welcome to Readable Blog</div>
        </div>

        <PostList posts={this.state.posts} />
        <div className="new-post">
          <button className="btn btn-lg btn-info btn-circle">
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
