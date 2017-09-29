import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import Header from './Header'
import PostList from './PostList'
import AddButton from './AddButton'
import NewPost from './NewPost'
import EditPost from './EditPost'
import { getAllCategories, getAllPosts } from '../actions'

class App extends Component {

  componentDidMount() {
    this.props.getAllCategories()
    this.props.getAllPosts()
  }

  render() {
    return (
      <div className="App">
        <Header />
        <PostList  />
        <AddButton />
        <NewPost />
        <EditPost />
      </div>
    );
  }
}

App.propTypes = {
  categories: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  getAllPosts: PropTypes.func.isRequired,
}

function mapStateToProps ({allCategories, allPosts}) {
  return {
    categories: allCategories.categories,
    posts: allPosts.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    getAllPosts: () => dispatch(getAllPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
