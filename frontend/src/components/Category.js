import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostList from './PostList'
import AddButton from './AddButton'
import NewPost from './NewPost'
import EditPost from './EditPost'
import { setLocation } from '../actions/location'

class Category extends Component {

  componentDidMount() {
    this.props.setLocation('category')
  }

  render() {
    let category = this.props.match.params.category
    return (
      <div>
        <PostList category={category}/>
        <AddButton />
        <NewPost />
        <EditPost />
      </div>
    )
  }
}

Category.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
}

function mapStateToProps({currentLocation,}) {
  return {
    location: currentLocation.location,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setLocation: location => dispatch(setLocation(location)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
