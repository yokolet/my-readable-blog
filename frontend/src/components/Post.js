import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Panel, Button, Grid, Row, Col  } from 'react-bootstrap'
import { millisToDate } from '../utils/helpers'
import { getSinglePost, getAllComments } from '../actions'

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
        </div>
        <div>
          <ul>
          {comments && comments.map((comment) => (
            <li key={comment.id}>
            <div>{comment.id}</div>
            <div>{comment.body}</div>
            <div>{comment.author}</div>
            <div>{comment.parentId}</div>
            </li>
          ))}
          </ul>
        </div>
      </Panel>
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
}

function mapStateToProps({ singlePost }) {
  return {
    post: singlePost.post,
    comments: singlePost.comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getSinglePost: id => dispatch(getSinglePost(id)),
    getAllComments: id => dispatch(getAllComments(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
