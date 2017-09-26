import React, { Component } from 'react'
import { Panel, Button, ButtonToolbar, Grid, Row, Col  } from 'react-bootstrap'
import { millisToDate } from '../utils/helpers'

class PostPanel extends Component {
  render() {
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
          <i className="fa fa-thumbs-up post-voted" aria-hidden="true"></i>
          <span className="post-voted">{post.voteScore}</span>
        </div>
        <ButtonToolbar>
          <Button bsStyle="default">
            <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
          </Button>
          <Button bsStyle="default">
            <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
          </Button>
          <Button bsStyle="default">
            <i className="fa fa-comment-o" aria-hidden="true"></i>
            <span className="post-comment">{post.voteScore}</span>
          </Button>
        </ButtonToolbar>
      </Panel>
    )
  }
}

export default PostPanel
