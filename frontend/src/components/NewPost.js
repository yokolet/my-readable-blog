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
      title: { value: '', isValid: true },
      body: { value: '', isValid: true },
      author: { value: '', isValid: true },
      category: { value: '', isValid: true },
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: {
        value,
        isValid: (value.length > 0 ? true : false)
      }
    })
  }

  handleClick = (event, setModalOpen, addPost = null) => {
    if (event) {
      event.preventDefault()
    }
    let status = true
    if (addPost) {
      status = this.handlePost(addPost)
    }
    if (status) {
      setModalOpen(false)
      this.setState({
        title: { value: '', isValid: true },
        body: { value: '', isValid: true },
        author: { value: '', isValid: true },
        category: { value: '', isValid: true },
      })
    }
  }

  handlePost = (addPost) => {
    let data = {
      title: {
        value: this.state.title.value,
        isValid: (this.state.title.value.length > 0 ? true : false)
      },
      body: {
        value: this.state.body.value,
        isValid: (this.state.body.value.length > 0 ? true : false)
      },
      author: {
        value: this.state.author.value,
        isValid: (this.state.author.value.length > 0 ? true : false)
      },
      category: {
        value: this.state.category.value,
        isValid: (this.state.category.value.length > 0 ? true : false)
      },
    }

    if (data.title.isValid &&
      data.body.isValid &&
      data.author.isValid &&
      data.category.isValid) {
      let post = {
        title: data.title.value,
        body: data.body.value,
        author: data.author.value,
        category: data.category.value,
      }
      addPost(post)
      return true
    } else {
      this.setState({
        ...data,
      })
      return false
    }
  }

  render() {
    const { categories, isOpen, setModalOpen, addPost} = this.props

    return (
      <Modal
        show={isOpen}
        onHide={() => {this.handleClick(null, setModalOpen)}}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup
              controlId="newPostTitle"
              validationState={this.state.title.isValid ? null : "error"}>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Enter title"
                name="title"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup
              controlId="newPostBody"
              validationState={this.state.body.isValid ? null : "error"}>
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter text"
                name="body"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup
              controlId="newPostAuthor"
              validationState={this.state.author.isValid ? null : "error"}>
              <ControlLabel>Author</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Enter name"
                name="author"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup
              controlId="newPostCategory" key="category"
              validationState={this.state.category.isValid ? null : "error"}>
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
