import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'
import PostBody from './PostBody'
import { getCategoryPosts } from '../actions'

class PostList extends Component {

  componentDidMount() {
    this.props.getCategoryPosts('all')
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
            <PostBody post={post} key={post.id}/>
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
  getCategoryPosts: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
}

function mapStateToProps({allPosts, visibilityCategory}) {
  return {
    posts: allPosts.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategoryPosts: category => dispatch(getCategoryPosts(category))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
