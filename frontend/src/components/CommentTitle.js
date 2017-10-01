import React from 'react'
import { Button, Grid, Row, Col  } from 'react-bootstrap'
import { FaPencil, FaTrashO } from 'react-icons/lib/fa'
import { millisToDate } from '../utils/helpers'

const commentTitle = (comment, setCommentEditOpen, deleteComment) => {
  return (
    <div>
      <Grid>
        <Row className="show-grid">
          <Col xs={7} md={10}>
            <div className="comment-info">
              By
              <span className="post-author">{comment.author}</span>
              on {millisToDate(comment.timestamp)}
            </div>
          </Col>
          <Col xs={2} md={1}>
            <Button bsStyle="danger"
                    onClick={e => {
                      e.preventDefault()
                      deleteComment(comment.id)
                    }}>
              <FaTrashO />
            </Button>
          </Col>
          <Col xs={3} md={1}>
            <Button bsStyle="default"
                    onClick={e => {
                      e.preventDefault()
                      setCommentEditOpen(true, comment)
                    }}>
              <FaPencil />
            </Button>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default commentTitle
