import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, FormControl, FormGroup,
          Jumbotron, Panel, Button  } from 'react-bootstrap'
import { FaThumbsUp } from 'react-icons/lib/fa'
import postTitle from './PostTitle'
import commentTitle from './CommentTitle'
import { getSinglePost, getAllComments, setLocation, addComment } from '../actions'

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
    const { post, comments, newComment } = this.props

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
            <FaThumbsUp size={20} className="post-voted" />
            <span className="post-voted">{post.voteScore}</span>
          </div>
          <div className="comments">
            <div className="comments-head">
              {comments.length} Comments
            </div>
            {comments && comments.map((comment) => (
              <Panel key={comment.id}>
                {commentTitle(comment, null, null)}
                <div className="comment-body">
                  {comment.body}
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
                      console.log(this.state)
                      newComment(this.state.comment_author,
                                  this.state.comment_body,
                                  this.state.post_id)
                      this.state.comment_author = ''
                      this.state.comment_body = ''
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
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
    }),
    comments: PropTypes.array,
    getSinglePost: PropTypes.func.isRequired,
    getAllComments: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired,
    setLocation: PropTypes.func.isRequired,
    newComment: PropTypes.func.isRequired,
}

function mapStateToProps({ singlePost, currentLocation }) {
  return {
    post: singlePost.post,
    comments: singlePost.comments,
    location: currentLocation.location,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSinglePost: id => dispatch(getSinglePost(id)),
    getAllComments: id => dispatch(getAllComments(id)),
    setLocation: location => dispatch(setLocation(location)),
    newComment: (author, body, parentId) => dispatch(
      addComment({author, body, parentId})),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
