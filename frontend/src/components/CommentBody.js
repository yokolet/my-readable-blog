import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Col, ControlLabel, Button, FormControl,
          FormGroup, Grid, Row } from 'react-bootstrap'
import { setVisibilityEditComment, editComment } from '../actions/comments'

class CommentBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onEdit: false,
      body: '',
      isValid: true,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({
      onEdit: true,
      body: event.target.value,
      isValid: (event.target.value.length > 0 ? true : false),
    })
  }

  handleClick = (event, setEditCommentOpen, option = null) => {
    if (event) {
      event.preventDefault()
    }
    let status = true
    if (option) {
      status = this.handleComment(option.func, option.param)
    }
    if (status) {
      this.setState({
        onEdit: false,
        body: '',
        isValid: true,
      })
      setEditCommentOpen(false)
    }
  }

  handleComment = (updateComment, {commentId, body}) => {
    let valid = body.length > 0 ? true : false
    if (valid) {
      updateComment(commentId, {body})
      return true
    } else {
      this.setState({
        ...this.state,
        isValid: false,
      })
      return false
    }
  }

  render() {
    const { comment, isCommentEditOpen, commentEditId,
            setEditCommentOpen, updateComment } = this.props
    let comment_body;
    let edit_buttons;
    if (isCommentEditOpen && commentEditId === comment.id) {
      comment_body =
        <form>
        <FormGroup
          controlId="editCommentBody"
          validationState={this.state.isValid ? null : "error"}>
          <ControlLabel>Body</ControlLabel>
          <FormControl
            componentClass="input"
            value={this.state.onEdit ? this.state.body : comment.body}
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
      edit_buttons =
        <div>
          <Button className="edit-modal-button"
            onClick={event => {
              this.handleClick(event, setEditCommentOpen)
            }}>Cancel</Button>
          <Button bsStyle="primary" className="edit-modal-button"
            type="submit"
            onClick={event => {
              let bodyValue = this.state.onEdit ? this.state.body : comment.body
              this.handleClick(
                event,
                setEditCommentOpen,
                {func: updateComment,
                param: {commentId: comment.id, body: bodyValue}}
              )
            }}>Update</Button>
        </div>
    } else {
      comment_body = <div>{comment.body}</div>
      edit_buttons = ''
    }

    return (
      <div className="comment-body">
        <Grid>
          <Row className="edit-modal-footer">
            <Col xs={8} md={9}>
            { comment_body }
            </Col>
            <Col xs={4} md={3}>
              { edit_buttons }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

CommentBody.propTypes = {
  isCommentEditOpen: PropTypes.bool.isRequired,
  commentEditId: PropTypes.string,
  comment: PropTypes.shape({
    id: PropTypes.string,
    parentId: PropTypes.string,
    timestamp: PropTypes.number,
    body: PropTypes.string,
    author: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
  }),
  setEditCommentOpen: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
}

function mapStateToProps({visibilityEditComment}) {
  return {
    isCommentEditOpen: visibilityEditComment.open,
    commentEditId: visibilityEditComment.id,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setEditCommentOpen: (open, data) => dispatch(setVisibilityEditComment(open, data)),
    updateComment: (id, data) => dispatch(editComment(id, data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBody);
