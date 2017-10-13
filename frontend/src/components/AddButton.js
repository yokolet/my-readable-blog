import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button  } from 'react-bootstrap'
import FaPlus from 'react-icons/lib/fa/plus'
import { setVisibilityNewPostModal } from '../actions/modals'

const AddButton = (props) => {
  const { setModalOpen } = props
  return (
    <div className="new-post">
      <Button className="btn btn-lg btn-info btn-circle"
              onClick={e => {
                e.preventDefault()
                setModalOpen(true)
              }}>
        <FaPlus />
      </Button>
    </div>
  )
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
