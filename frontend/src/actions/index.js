import uuid from 'js-uuid'
import * as API from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SELECTED: 'SHOW_SELECTED'
}

function requestPosts() {
  return {
    type: REQUEST_POSTS,
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json
  }
}

export function getAllPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return API.fetchPosts()
      .then(json => dispatch(receivePosts(json)))
  }
}

export function addPost({title, body, author, category}) {
  return {
    type: ADD_POST,
    id: uuid.v4(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  }
}

export function editPost({id, title, body}) {
  return {
    type: EDIT_POST,
    id,
    title,
    body
  }
}

export function deletePost({id}) {
  return {
    type: DELETE_POST,
    id
  }
}

export function upVotePost({id}) {
  return {
    type: UPVOTE_POST,
    id
  }
}

export function downVotePost({id}) {
  return {
    type: DOWNVOTE_POST,
    id
  }
}

export function addComment({body, author, parentId}) {
  return {
    type: ADD_COMMENT,
    id: uuid.v4(),
    timestamp: Date.now(),
    body,
    author,
    parentId
  }
}

export function editComment({id, body}) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp: Date.now(),
    body
  }
}

export function deleteComment({id}) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export function upVoteComment({id}) {
  return {
    type: UPVOTE_COMMENT,
    id
  }
}

export function downVoteComment({id}) {
  return {
    type: DOWNVOTE_COMMENT,
    id
  }
}

export function setVisibilityFilter({filter, category}) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
    category,
  }
}
