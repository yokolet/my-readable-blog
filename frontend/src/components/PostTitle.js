import React from 'react'
import { Button, Grid, Row, Col  } from 'react-bootstrap'
import { FaPencil } from 'react-icons/lib/fa'
import { millisToDate } from '../utils/helpers'

const postTitle = (post, setEditModalOpen) => {
  return (
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
          <Col xs={9} md={11}>
            <div className="post-title-name">{post.title}</div>
          </Col>
          <Col xs={3} md={1}>
            {setEditModalOpen &&
              <Button bsStyle="default"
                      onClick={e => {
                        e.preventDefault()
                        setEditModalOpen(true, post)
                      }}>
                <FaPencil size={18} />
              </Button>
            }
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default postTitle
