import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, Button, FormControl,
          FormGroup, Modal } from 'react-bootstrap'
import { setVisibilityEditPostModal, editPost } from '../actions'

class EditPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: {onEdit: false, value: ''},
      body: {onEdit: false, value: ''},
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: { value, onEdit: true}
    })
  }

  render() {
    const { isEditOpen, setEditModalOpen, editPost, post } = this.props
    return (
      <Modal show={isEditOpen}
        onHide={() => {
          setEditModalOpen(false, {})
          this.setState({
            title: {onEdit: false, value: ''},
            body: {onEdit: false, value: ''},
          })
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
          <div>
            Posted by
            <span className="post-author">{post.author}</span>
            <Button bsStyle="info" bsSize="sm" disabled>{post.category}</Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="editPostTitle">
              <ControlLabel>Title</ControlLabel>
              <FormControl
                componentClass="input"
                name="title"
                value={this.state.title.onEdit ? this.state.title.value : post.title}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="editPostBody">
              <ControlLabel>Body</ControlLabel>
              <FormControl
                componentClass="textarea"
                name="body"
                value={this.state.body.onEdit ? this.state.body.value : post.body}
                onChange={this.handleChange}
              />
            </FormGroup>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger"
            onClick={e => {
                    e.preventDefault()
                    setEditModalOpen(false, {})
                    this.setState({
                      title: {onEdit: false, value: ''},
                      body: {onEdit: false, value: ''},
                    })
          }}>Delete</Button>
          <Button onClick={e => {
                    e.preventDefault()
                    setEditModalOpen(false, {})
                    this.setState({
                      title: {onEdit: false, value: ''},
                      body: {onEdit: false, value: ''},
                    })
          }}>Cancel</Button>
          <Button
            bsStyle="primary"
            type="submit"
            onClick={e => {
              e.preventDefault()
              setEditModalOpen(false, {})
              editPost(this.state)
              this.setState({
                title: {onEdit: false, value: ''},
                body: {onEdit: false, value: ''},
              })
            }}
            >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

EditPost.propTypes = {
  isEditOpen: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
  }),
  setEditModalOpen: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
}

function mapStateToProps({visibilityEditPostModal}) {
  return {
    isEditOpen: visibilityEditPostModal.open,
    post: visibilityEditPostModal.post,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setEditModalOpen: (open, data) => dispatch(setVisibilityEditPostModal(open, data)),
    editPost: post => dispatch(editPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);
