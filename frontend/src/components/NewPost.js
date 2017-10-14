import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, Button, FormControl, FormGroup, Modal } from 'react-bootstrap'
import { addPost } from '../actions/posts'
import { setVisibilityNewPostModal } from '../actions/modals'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: { value: '', isValid: false },
      body: { value: '', isValid: false },
      author: { value: '', isValid: false },
      category: { value: '', isValid: false },
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: {
        ...[name],
        value,
      }
    })
  }

  handleClick = (event, setModalOpen, addPost = null) => {
    event.preventDefault()
    if (addPost) {
      this.handlePost(addPost)
    }
    setModalOpen(false)
    this.setState({
      title: { value: '', isValid: false },
      body: { value: '', isValid: false },
      author: { value: '', isValid: false },
      category: { value: '', isvalid: false },
    })
  }

  handlePost = (addPost) => {
    let post = {
      title: this.state.title.value,
      body: this.state.body.value,
      author: this.state.author.value,
      category: this.state.category.value,
    }
    addPost(post)
  }

  render() {
    const { categories, isOpen, setModalOpen, addPost} = this.props

    return (
      <Modal show={isOpen} onHide={() => (setModalOpen(false))}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="newPostTitle">
              <ControlLabel>Title</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Enter title"
                name="title"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="newPostBody">
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter text"
                name="body"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="newPostAuthor">
              <ControlLabel>Author</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Enter name"
                name="author"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="newPostCategory" key="category">
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                name="category"
                onChange={this.handleChange}>
                <option key="select" value="">select...</option>
                {categories && categories.map(({ name, path }) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </FormControl>
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={event => {
                          this.handleClick(event, setModalOpen)
                          }}>Cancel</Button>
          <Button
            bsStyle="primary"
            type="submit"
            onClick={event => {
                    this.handleClick(event, setModalOpen, addPost)
                    }}>Create</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

NewPost.propTypes = {
  categories: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
}

function mapStateToProps({allCategories, visibilityNewPostModal}) {
  return {
    categories: allCategories.categories,
    isOpen: visibilityNewPostModal.open,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setModalOpen: open => dispatch(setVisibilityNewPostModal(open)),
    addPost: post => dispatch(addPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
