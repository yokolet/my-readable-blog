import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Jumbotron } from 'react-bootstrap'
import PostBody from './PostBody'
import { getCategoryPosts } from '../actions/posts'

class PostList extends Component {

  componentDidMount() {
    this.props.getCategoryPosts('all')
  }

  render() {
    const { posts, category, sortKey, sortWeight } = this.props

    return (
      <div>
        <Jumbotron className="main">
          {posts && posts.filter((post) => (
            category === "all" || post.category === category
          ))
          .sort(function(a, b) {
            return (a[sortKey] - b[sortKey]) * sortWeight
          })
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
  sortKey: PropTypes.string.isRequired,
  sortWeight: PropTypes.number.isRequired,
  getCategoryPosts: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
}

function mapStateToProps({allPosts, visibilityCategory}) {
  return {
    posts: allPosts.posts,
    sortKey: allPosts.sortKey,
    sortWeight: allPosts.sortWeight,
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
