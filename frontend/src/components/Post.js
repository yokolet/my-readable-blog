import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, FormControl, FormGroup,
          Jumbotron, Panel, Button  } from 'react-bootstrap'
import { FaThumbsUp, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa'
import PostBody from './PostBody'
import EditPost from './EditPost'
import commentTitle from './CommentTitle'
import CommentBody from './CommentBody'
import { getSinglePost } from '../actions/single_post'
import { setLocation } from '../actions/location'
import { getAllComments, addComment, deleteComment,
          setVisibilityEditComment, voteComment } from '../actions/comments'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: props.match.params.id,
      comment_author: { value: '', isValid: true },
      comment_body: { value: '', isValid: true },
    }
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

  handleClick = (event, option = null) => {
    if (event) {
      event.preventDefault()
    }
    let status = true
    if (option) {
      status = this.handleComment(option.func, option.param)
    }
    if (status) {
      this.setState({
        ...this.state,
        comment_author: { value: '', isValid: true },
        comment_body: { value: '', isValid: true },
      })
    }
  }

  handleComment = (newComment, parentId) => {
    let data = {
      comment_author: {
        value: this.state.comment_author.value,
        isValid: (this.state.comment_author.value.length > 0 ? true : false)
      },
      comment_body: {
        value: this.state.comment_body.value,
        isValid: (this.state.comment_body.value.length > 0 ? true : false)
      },
    }

    if (data.comment_author.isValid &&
      data.comment_body.isValid) {
      let comment = {
        author: data.comment_author.value,
        body: data.comment_body.value,
        parentId,
      }
      newComment(comment)
      return true
    } else {
      this.setState({
        ...data,
      })
      return false
    }
  }

  componentDidMount() {
    this.props.getPost(this.state.post_id)
    this.props.allComments(this.state.post_id)
    this.props.setLocation('post')
  }

  commentInfo = (post, comments) => {
    let size = comments[post.id] ? comments[post.id].length : 0
    let unit = size < 2 ? "Comment" : "Comments"
    return (
      <div className="comments-head">
        {size} {unit}
      </div>
    )
  }

  render() {
    const { post, comments, newComment, deleteComment,
            setEditCommentOpen, voteComment } = this.props

    if (post.deleted) {
      return <Redirect to='/' />
    }

    return (
      <Jumbotron className="main">
        <Panel>
          <PostBody post={post} />
          <EditPost />
          <div className="comments">
            <div className="comments-head">
              {this.commentInfo(post, comments)}
            </div>
            {comments &&
              comments[this.state.post_id] &&
              comments[this.state.post_id].map((comment) => (
              <Panel key={comment.id}>
                {commentTitle(comment, setEditCommentOpen, deleteComment)}
                <CommentBody comment={ comment }/>
                <div>
                  <FaThumbsUp size={20} className="post-voted" />
                  <span className="post-voted">{comment.voteScore}</span>
                  <Button bsStyle="default"
                          className="post-up-down-vote"
                          onClick={e => {
                            e.preventDefault()
                            voteComment(comment.id, "upVote")
                          }}>
                    <FaThumbsOUp />
                  </Button>
                  <Button bsStyle="default"
                          onClick={e=> {
                            e.preventDefault()
                            voteComment(comment.id, "downVote")
                          }}>
                    <FaThumbsODown />
                  </Button>
                </div>
              <div>{comment.id}</div>
              <div>{comment.parentId}</div>
              </Panel>
            ))}
            <Panel>
              <div className="comment-form-head">
                Add New Comment
                <form>
                  <FormGroup
                    controlId="newCommentAuthor"
                    validationState={this.state.comment_author.isValid ? null : "error"}>
                    <ControlLabel>Author</ControlLabel>
                    <FormControl
                      componentClass="input"
                      placeholder="Enter name"
                      name="comment_author"
                      value={this.state.comment_author.value}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup
                    controlId="newCommentBody"
                    validationState={this.state.comment_body.isValid ? null : "error"}>
                    <ControlLabel>Body</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      placeholder="Enter comment"
                      name="comment_body"
                      value={this.state.comment_body.value}
                      onChange={this.handleChange}
                    />
                </FormGroup>
                </form>
                <div className="comment-buttons">
                  <Button className="comment-button">Cancel</Button>
                  <Button className="comment-button"
                    bsStyle="primary"
                    type="submit"
                    onClick={event => {
                      this.handleClick(
                        event,
                        {func: newComment, param: this.state.post_id})
                    }}>Create</Button>
                </div>
              </div>
            </Panel>
          </div>
        </Panel>
      </Jumbotron>
    )
  }
}

Post.propTypes = {
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
    comments: PropTypes.object.isRequired,
    location: PropTypes.string.isRequired,
    isCommentEditOpen: PropTypes.bool.isRequired,
    getPost: PropTypes.func.isRequired,
    allComments: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    newComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    setEditCommentOpen: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
}

function mapStateToProps({
  singlePost,
  allComments,
  currentLocation,
  visibilityEditComment }) {
  return {
    post: singlePost.post,
    comments: allComments.comments,
    location: currentLocation.location,
    isCommentEditOpen: visibilityEditComment.open,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPost: id => dispatch(getSinglePost(id)),
    allComments: postId => dispatch(getAllComments(postId)),
    setLocation: location => dispatch(setLocation(location)),
    newComment: comment => dispatch(addComment(comment)),
    deleteComment: id => dispatch(deleteComment(id)),
    setEditCommentOpen: (open, id) => dispatch(setVisibilityEditComment(open, id)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
