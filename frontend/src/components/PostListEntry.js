import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Panel, Button, Grid, Row, Col  } from 'react-bootstrap'
import * as FA from 'react-icons/lib/fa'
import postTitle from './PostTitle'
import * as API from '../utils/api'
import { votePost, setVisibilityEditPostModal } from '../actions'

class PostListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
    }
  }

  componentDidMount() {
    API.fetchComments(this.props.post.id)
      .then((comments) => {
        this.setState(() => ({
          comments
      }))
    })
  }

  render() {
    const { comments } = this.state
    const { post, vote, setEditModalOpen } = this.props

    return (
      <Panel header={postTitle(post, setEditModalOpen)} className="post-header">
        <div className="post-body">
          id: {post.id}<br/>
          {post.body}<br/>
        </div>
        <div className="post-category">
          <Link to={'/' + post.category}>
            <Button bsSize="small"
                    bsStyle="info">
              {post.category}
            </Button>
          </Link>
        </div>
        <Grid>
          <Row className="show-grid">
            <Col xs={9} md={10} lg={11}>
              <FA.FaThumbsUp size={24} className="post-voted" />
              <span className="post-voted">{post.voteScore}</span>
              <Button bsStyle="default"
                      className="post-up-down-vote"
                      onClick={e => {
                        e.preventDefault()
                        vote(post.id, "upVote")
                      }}>
                <FA.FaThumbsOUp />
              </Button>
              <Button bsStyle="default"
                      onClick={e=> {
                        e.preventDefault()
                        vote(post.id, "downVote")
                      }}>
                <FA.FaThumbsODown />
              </Button>
            </Col>
            <Col xs={3} md={2} lg={1}>
              <Link to={`/posts/${post.id}`}>
                <Button bsStyle="default">
                  <FA.FaCommentO size={20}/>
                  <span className="post-comment">{comments ? comments.length : 0}</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

PostListEntry.propTypes = {
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
    vote: PropTypes.func.isRequired,
    setEditModalOpen: PropTypes.func.isRequired,
}

function mapStateToProps({visibilityEditPostModal}) {
  return {
    isEditOpen: visibilityEditPostModal.open,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    vote: (id, option) => dispatch(votePost(id, option)),
    setEditModalOpen: (open, data) => dispatch(setVisibilityEditPostModal(open, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListEntry);
