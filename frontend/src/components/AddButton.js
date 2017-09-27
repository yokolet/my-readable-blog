import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button  } from 'react-bootstrap'

class AddButton extends Component {
  render() {
    return (
      <div className="new-post">
        <Button className="btn btn-lg btn-info btn-circle">
          <i className="fa fa-plus"></i>
        </Button>
      </div>
    )
  }
}

export default AddButton
