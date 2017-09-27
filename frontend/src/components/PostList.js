import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'
import Post from './Post'

class PostList extends Component {
  render() {
    const { posts } = this.props

    return (
      <div>
        <Jumbotron className="main">
          {posts && posts.map((data) => (
            <Post post={data} key={data.id}/>
          ))}
        </Jumbotron>
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.idRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default PostList
