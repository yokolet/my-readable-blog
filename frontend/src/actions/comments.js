import uuid from 'js-uuid'
import * as API from '../utils/api'

import { REQUEST_COMMENTS,
          RECEIVE_COMMENTS,
          ADD_COMMENT,
          EDIT_COMMENT,
          DELETE_COMMENT,
          CHANGE_VOTE_COMMENT,
          SET_VISIBILITY_EDIT_COMMENT } from '../constants/actions'

function requestComments() {
  return {
    type: REQUEST_COMMENTS,
  }
}

function receiveComments(json) {
  return {
    type: RECEIVE_COMMENTS,
    comments: json,
  }
}

export function getAllComments(postId) {
  return dispatch => {
    dispatch(requestComments())
    return API.fetchComments(postId)
      .then(json => dispatch(receiveComments(json)))
  }
}

function completeAddComment(json) {
  return {
    type: ADD_COMMENT,
    result: json,
  }
}

export function addComment(comment) {
  let params = {
    id: uuid.v4(),
    timestamp: Date.now(),
    body: comment.body,
    author: comment.author,
    parentId: comment.parentId,
  }
  return dispatch => {
    return API.newComment(params)
      .then(json => dispatch(completeAddComment(json)))
  }
}

function completeEditComment(json) {
  return {
    type: EDIT_COMMENT,
    result: json,
  }
}

export function editComment(id, comment) {
  let params = {
    timestamp: Date.now(),
    body: comment.body,
  }
  return dispatch => {
    return API.editComment(id, params)
      .then(json => dispatch(completeEditComment(json)))
  }
}

function completeDeleteComment(json) {
  return {
    type: DELETE_COMMENT,
    result: json,
  }
}

export function deleteComment(id) {
  return dispatch => {
    return API.deleteComment(id)
      .then(json => dispatch(completeDeleteComment(json)))
  }
}

export function setVisibilityEditComment(open, id) {
  return {
    type: SET_VISIBILITY_EDIT_COMMENT,
    open,
    id,
  }
}

function completeVoteComment(json) {
  return {
    type: CHANGE_VOTE_COMMENT,
    result: json
  }
}

export function voteComment(id, option) {
  return dispatch => {
    return API.voteComment(id, { option })
      .then(json => dispatch(completeVoteComment(json)))
  }
}
