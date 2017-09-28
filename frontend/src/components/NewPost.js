import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, Button, FormControl, FormGroup, Modal } from 'react-bootstrap'
import { setVisibilityNewPostModal } from '../actions'

class NewPost extends Component {
  render() {
    const { categories, isOpen, setModalOpen } = this.props

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
                componentClass="text"
                placeholder="Enter title"
              />
            </FormGroup>
            <FormGroup controlId="newPostBody">
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter text"
              />
            </FormGroup>
            <FormGroup controlId="newPostAuthor">
              <ControlLabel>Author</ControlLabel>
              <FormControl
                componentClass="text"
                placeholder="Enter name"
              />
            </FormGroup>
            <FormGroup controlId="newPostCategory">
              <ControlLabel>Category</ControlLabel>
              <FormControl componentClass="select">
                {categories && categories.map(({ name, path }) => (
                  <option value={name}>{name}</option>
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
          <Button bsStyle="primary" type="submit">
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
    setModalOpen: open => dispatch(setVisibilityNewPostModal(open))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
