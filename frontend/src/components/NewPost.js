import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { setVisibilityNewPostModal } from '../actions'

class NewPost extends Component {
  render() {
    const { isOpen, setModalOpen } = this.props

    return (
      <Modal show={isOpen}
            onHide={e => {
              e.preventDefault()
              setModalOpen(false)
            }}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e => {
                    e.preventDefault()
                    setModalOpen(false)
          }}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

NewPost.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
}

function mapStateToProps({visibilityNewPostModal}) {
  return {
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
