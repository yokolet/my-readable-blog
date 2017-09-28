import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'
import Post from './Post'

class PostList extends Component {
  render() {
    const { posts, category } = this.props

    return (
      <div>
        <Jumbotron className="main">
          {posts && posts.filter((post) => (
            category === "all" || post.category === category
          ))
          .map((post) => (
            <Post post={post} key={post.id}/>
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
  category: PropTypes.string.isRequired,
}

function mapStateToProps({allPosts, visibilityCategory}) {
  return {
    posts: allPosts.posts,
    category: visibilityCategory.category,
  }
}

export default connect(
  mapStateToProps
)(PostList)
