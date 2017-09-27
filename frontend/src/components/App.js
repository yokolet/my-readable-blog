import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.css'
import Header from './Header'
import PostList from './PostList'
import AddButton from './AddButton'
import * as API from '../utils/api'
import * as BlogActions from '../actions'

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
    const { categories, posts } = this.props
    return (
      <div className="App">
        <Header categories={this.state.categories}/>
        <PostList posts={this.state.posts} />
        <AddButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  posts: state.posts,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(BlogActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
