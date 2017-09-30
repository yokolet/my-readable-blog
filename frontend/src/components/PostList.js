import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'
import PostListEntry from './PostListEntry'
import { getAllPosts } from '../actions'

class PostList extends Component {

  componentDidMount() {
    this.props.getAllPosts()
  }

  render() {
    const { posts, category } = this.props

    return (
      <div>
        <Jumbotron className="main">
          {posts && posts.filter((post) => (
            category === "all" || post.category === category
          ))
          .map((post) => (
            <PostListEntry post={post} key={post.id}/>
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
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  getAllPosts: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
}

function mapStateToProps({allPosts, visibilityCategory}) {
  return {
    posts: allPosts.posts,
    category: visibilityCategory.category,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(getAllPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
