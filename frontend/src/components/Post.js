import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ControlLabel, FormControl, FormGroup,
          Jumbotron, Panel, Button, Grid, Row, Col  } from 'react-bootstrap'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import { millisToDate } from '../utils/helpers'
import { getSinglePost, getAllComments, setLocation } from '../actions'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: props.match.params.id,
      post: null,
      comments: null,
    }
  }

  componentDidMount() {
    this.props.getSinglePost(this.state.post_id)
    this.props.getAllComments(this.state.post_id)
    this.props.setLocation('post')
  }

  render() {
    const { post, comments } = this.props
    const titleWithAuthor = (
      <div className="post-title">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <div>
                Posted by
                <span className="post-author">{post.author}</span>
                on {millisToDate(post.timestamp)}
              </div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <div className="post-title-name">{post.title}</div>
            </Col>
          </Row>
        </Grid>
      </div>
    );

    return (
      <Jumbotron className="main">
        <Panel header={titleWithAuthor} className="post-header">
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
                <div className="comment-info">
                  By
                  <span className="comment-author">{comment.author}</span>
                  on {millisToDate(comment.timestamp)}
                </div>
                <div className="comment-body">
                  {comment.body}
                </div>
              <div>{comment.id}</div>
              <div>{comment.parentId}</div>
              </Panel>
            ))}
            <Panel>
              <div className="comment-form-head">
                New Comment
                <form>
                  <FormGroup controlId="newCommentAuthor">
                    <ControlLabel>Author</ControlLabel>
                    <FormControl
                      componentClass="input"
                      placeholder="Enter name"
                      name="author"
                    />
                  </FormGroup>
                  <FormGroup controlId="newCommentBody">
                    <ControlLabel>Body</ControlLabel>
                    <FormControl
                      componentClass="textarea"
                      placeholder="Enter comment"
                      name="body"
                    />
                </FormGroup>
                </form>
                <div className="comment-buttons">
                  <Button className="comment-button">Cancel</Button>
                  <Button className="comment-button"
                    bsStyle="primary"
                    type="submit"
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
