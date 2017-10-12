import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, ControlLabel, Button, FormControl,
          FormGroup, Grid, Modal, Row } from 'react-bootstrap'
import { editPost, deletePost } from '../actions/posts'
import { setVisibilityEditPostModal } from '../actions/modals'

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
    const { isEditOpen, setEditModalOpen, update, deletePost, post } = this.props
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
        <Grid>
          <Row className="edit-modal-footer">
            <Col xs={6} md={4}>
            <Button bsStyle="danger" className="edit-modal-button"
              onClick={e => {
                      e.preventDefault()
                      deletePost(post.id)
                      setEditModalOpen(false, {})
                      this.setState({
                        title: {onEdit: false, value: ''},
                        body: {onEdit: false, value: ''},
                      })
            }}>Delete</Button>
            </Col>
            <Col xs={2} md={4}>
            <Button className="edit-modal-button"
              onClick={e => {
                      e.preventDefault()
                      setEditModalOpen(false, {})
                      this.setState({
                        title: {onEdit: false, value: ''},
                        body: {onEdit: false, value: ''},
                      })
            }}>Cancel</Button>
            <Button bsStyle="primary" className="edit-modal-button"
              type="submit"
              onClick={e => {
                e.preventDefault()
                let titleValue = this.state.title.onEdit ? this.state.title.value : post.title
                let bodyValue = this.state.body.onEdit ? this.state.body.value : post.body
                update(post.id, {title: titleValue, body: bodyValue})
                setEditModalOpen(false, {})
                this.setState({
                  title: {onEdit: false, value: ''},
                  body: {onEdit: false, value: ''},
                })
              }}
              >
              Update
            </Button>
            </Col>
          </Row>
        </Grid>
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
  update: PropTypes.func.isRequired,
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
    update: (id, data) => dispatch(editPost(id, data)),
    deletePost: id => dispatch(deletePost(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);
