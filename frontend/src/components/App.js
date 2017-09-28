import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.css'
import Header from './Header'
import PostList from './PostList'
import AddButton from './AddButton'
import * as API from '../utils/api'
import { getAllPosts } from '../actions'

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
    this.props.getAllPosts()
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div className="App">
        <Header categories={this.state.categories}/>
        <PostList posts={this.props.posts} />
        <AddButton />
      </div>
    );
  }
}

function mapStateToProps ({allPosts}) {
  return {
    categories: [],
    posts: allPosts.posts,
  }
}

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
