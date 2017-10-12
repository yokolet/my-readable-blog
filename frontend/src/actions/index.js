import uuid from 'js-uuid'
import * as API from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_VISIBILITY_NEWPOST_MODAL = 'SET_VISIBILITY_NEWPOST_MODAL'
export const ADD_POST = 'ADD_POST'
export const SET_VISIBILITY_EDITPOST_MODAL = 'SET_VISIBILITY_EDITPOST_MODAL'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const CHANGE_VOTE_POST = 'CHANGE_VOTE_POST'
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY'
export const SET_LOCATION= 'SET_LOCATION'
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

function request(type) {
  return {
    type,
  }
}

function receive(type, json) {
  return {
    type,
    result: json
  }
}

export function getCategoryPosts(category) {
  return dispatch => {
    dispatch(request(REQUEST_POSTS))
    if (category === 'all') {
      return API.fetchPosts()
        .then(json => dispatch(receive(RECEIVE_POSTS, json)))
    } else {
      return API.fetchCategoryPosts(category)
        .then(json => dispatch(receive(RECEIVE_POSTS, json)))
    }
  }
}

export function setVisibilityNewPostModal(open) {
  return {
    type: SET_VISIBILITY_NEWPOST_MODAL,
    open,
  }
}

function completeAddPost(json) {
  return {
    type: ADD_POST,
    result: json,
  }
}

export function addPost(post) {
  let params = {
    id: uuid.v4(),
    timestamp: Date.now(),
    title: post.title,
    body: post.body,
    author: post.author,
    category: post.category
  }
  return dispatch => {
    return API.createPost(params)
      .then(json => dispatch(completeAddPost(json)))
  }
}

export function setVisibilityEditPostModal(open, data) {
  let post = open ? data : {}
  return {
    type: SET_VISIBILITY_EDITPOST_MODAL,
    open,
    post,
  }
}

function completeEditPost(json) {
  return {
    type: EDIT_POST,
    result: json,
  }
}

export function editPost(id, post) {
  let params = {
    title: post.title,
    body: post.body,
  }
  return dispatch => {
    return API.editPost(id, params)
      .then(json => dispatch(completeEditPost(json)))
  }
}

function completeDeletePost(json) {
  return {
    type: DELETE_POST,
    result: json,
  }
}

export function deletePost(id) {
  return dispatch => {
    return API.deletePost(id)
      .then(json => dispatch(completeDeletePost(json)))
  }
}

function completeVotePost(json) {
  return {
    type: CHANGE_VOTE_POST,
    result: json
  }
}

export function votePost(id, option) {
  return dispatch => {
    return API.votePost(id, { option })
      .then(json => dispatch(completeVotePost(json)))
  }
}

export function setSortBy(key, weight) {
  return {
    type: CHANGE_SORT_BY,
    key,
    weight,
  }
}

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    location,
  }
}

function requestSinglePost() {
  return {
    type: REQUEST_SINGLE_POST,
  }
}

function receiveSinglePost(json) {
  return {
    type: RECEIVE_SINGLE_POST,
    post: json
  }
}

export function getSinglePost(id) {
  return dispatch => {
    dispatch(requestSinglePost())
    return API.fetchSinglePost(id)
      .then(json => dispatch(receiveSinglePost(json)))
  }
}
