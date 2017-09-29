import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, Button, FormControl, FormGroup, Modal } from 'react-bootstrap'
import { setVisibilityNewPostModal, addPost } from '../actions'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      body: null,
      author: null,
      category: null,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
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
          <Button onClick={e => {
                    e.preventDefault()
                    setModalOpen(false)
          }}>Cancel</Button>
          <Button
            bsStyle="primary"
            type="submit"
            onClick={e => {
              e.preventDefault()
              setModalOpen(false)
              addPost(this.state)
            }}
            >
            Create
          </Button>
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
