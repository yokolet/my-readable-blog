import uuid from 'js-uuid'
import * as API from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_VISIBILITY_CATEGORY = 'SET_VISIBILITY_CATEGORY'
export const SET_VISIBILITY_NEWPOST_MODAL = 'SET_VISIBILITY_NEWPOST_MODAL'
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

function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
  }
}

function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: json
  }
}

export function getAllCategories() {
  return dispatch => {
    dispatch(requestCategories())
    return API.fetchCategories()
      .then(json => dispatch(receiveCategories(json)))
  }
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

export function setVisibilityCategory(category) {
  return {
    type: SET_VISIBILITY_CATEGORY,
    category,
  }
}

export function setVisibilityNewPostModal(open) {
  return {
    type: SET_VISIBILITY_NEWPOST_MODAL,
    open,
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
