import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button  } from 'react-bootstrap'
import { setVisibilityNewPostModal } from '../actions'

class AddButton extends Component {
  render() {
    const { setModalOpen } = this.props
    return (
      <div className="new-post">
        <Button className="btn btn-lg btn-info btn-circle"
                onClick={e => {
                  e.preventDefault()
                  setModalOpen(true)
                }}>
          <i className="fa fa-plus"></i>
        </Button>
      </div>
    )
  }
}

AddButton.propTypes = {
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
)(AddButton);
