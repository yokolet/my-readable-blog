import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, FormControl, FormGroup,
          Jumbotron, Panel, Button  } from 'react-bootstrap'
import { FaThumbsUp, FaThumbsOUp, FaThumbsODown } from 'react-icons/lib/fa'
import postTitle from './PostTitle'
import commentTitle from './CommentTitle'
import CommentBody from './CommentBody'
import { getSinglePost, getAllComments, setLocation, votePost,
          addComment, deleteComment, setVisibilityEditComment,
          voteComment } from '../actions'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: props.match.params.id,
      comment_author: '',
      comment_body: '',
    }
  }

  componentDidMount() {
    this.props.getSinglePost(this.state.post_id)
    this.props.getAllComments(this.state.post_id)
    this.props.setLocation('post')
  }

  render() {
    const { post, vote, comments, newComment, deleteComment,
            setEditCommentOpen, voteComment } = this.props

    return (
      <Jumbotron className="main">
        <Panel header={postTitle(post, null)} className="post-header">
          <div className="post-body">
            id: {post.id}<br/>
            {post.body}<br/>
          </div>
          <div className="post-category">
            <Button bsSize="small"
                    bsStyle="info"
                    disabled>
              {post.category}
            </Button>
            <FaThumbsUp size={24} className="post-voted" />
            <span className="post-voted">{post.voteScore}</span>
            <Button bsStyle="default"
                    className="post-up-down-vote"
                    onClick={e => {
                      e.preventDefault()
                      vote(post.id, "upVote")
                    }}>
              <FaThumbsOUp />
            </Button>
            <Button bsStyle="default"
                    onClick={e=> {
                      e.preventDefault()
                      vote(post.id, "downVote")
                    }}>
              <FaThumbsODown />
            </Button>
          </div>
          <div className="comments">
            <div className="comments-head">
              {comments.length} Comments
            </div>
            {comments && comments.map((comment) => (
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
                  <FormGroup controlId="newCommentAuthor">
                    <ControlLabel>Author</ControlLabel>
                    <FormControl
                      componentClass="input"
                      placeholder="Enter name"
                      name="author"
                      value={this.state.comment_author}
                      onChange={e => {
                        e.preventDefault();
                        this.setState({
                          comment_author: e.target.value,
                        })
                      }}
                    />
                  </FormGroup>
                  <FormGroup controlId="newCommentBody">
                    <ControlLabel>Body</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      placeholder="Enter comment"
                      name="body"
                      value={this.state.comment_body}
                      onChange={e => {
                        e.preventDefault();
                        this.setState({
                          comment_body: e.target.value,
                        })
                      }}
                    />
                </FormGroup>
                </form>
                <div className="comment-buttons">
                  <Button className="comment-button">Cancel</Button>
                  <Button className="comment-button"
                    bsStyle="primary"
                    type="submit"
                    onClick={e => {
                      e.preventDefault()
                      newComment(this.state.comment_author,
                                  this.state.comment_body,
                                  this.state.post_id)
                      this.setState({
                        comment_author: '',
                        comment_body: '',
                      })
                    }}
                    >
                    Create
                  </Button>
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
    comments: PropTypes.array,
    location: PropTypes.string.isRequired,
    isCommentEditOpen: PropTypes.bool.isRequired,
    vote: PropTypes.func.isRequired,
    getSinglePost: PropTypes.func.isRequired,
    getAllComments: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    newComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    setEditCommentOpen: PropTypes.func.isRequired,
    voteComment: PropTypes.func.isRequired,
}

function mapStateToProps({ singlePost, currentLocation, visibilityEditComment }) {
  return {
    post: singlePost.post,
    comments: singlePost.comments,
    location: currentLocation.location,
    isCommentEditOpen: visibilityEditComment.open,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSinglePost: id => dispatch(getSinglePost(id)),
    getAllComments: id => dispatch(getAllComments(id)),
    setLocation: location => dispatch(setLocation(location)),
    vote: (id, option) => dispatch(votePost(id, option)),
    newComment: (author, body, parentId) => dispatch(
      addComment({author, body, parentId})),
    deleteComment: id => dispatch(deleteComment(id)),
    setEditCommentOpen: (open, id) => dispatch(setVisibilityEditComment(open, id)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
