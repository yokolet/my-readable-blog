import React, { Component } from 'react'
import PostList from './PostList'
import AddButton from './AddButton'
import NewPost from './NewPost'
import EditPost from './EditPost'

class Home extends Component {
  render() {
    return (
      <div>
        <PostList  />
        <AddButton />
        <NewPost />
        <EditPost />
      </div>
    )
  }
}

export default Home
