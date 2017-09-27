import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, Button, Grid, Row, Col  } from 'react-bootstrap'
import { millisToDate } from '../utils/helpers'
import * as API from '../utils/api'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
    }
  }

  componentDidMount() {
    API.fetchComments(this.props.post.id)
      .then((comments) => {
        console.log(comments)
        this.setState(() => ({
          comments
      }))
    })
  }

  render() {
    const { comments } = this.state
    const { post } = this.props
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
            <Col xs={10} md={11}>
              <div className="post-title-name">{post.title}</div>
            </Col>
            <Col xs={2} md={1}>
              <Button bsStyle="default">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </Button>
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
          <Button bsSize="small" bsStyle="info">{post.category}</Button>
        </div>
        <Grid>
          <Row className="show-grid">
            <Col xs={9} md={10} lg={11}>
              <i className="fa fa-thumbs-up post-voted" aria-hidden="true"></i>
              <span className="post-voted">{post.voteScore}</span>
              <Button bsStyle="default" className="post-up-down-vote">
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
              </Button>
              <Button bsStyle="default">
                <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
              </Button>
            </Col>
            <Col xs={3} md={2} lg={1}>
              <Button bsStyle="default">
                <i className="fa fa-comment-o" aria-hidden="true"></i>
                <span className="post-comment">{comments ? comments.length : 0}</span>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

Post.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.idRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
}

export default Post
