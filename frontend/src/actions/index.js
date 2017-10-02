import uuid from 'js-uuid'
import * as API from '../utils/api'

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SET_VISIBILITY_CATEGORY = 'SET_VISIBILITY_CATEGORY'
export const SET_VISIBILITY_NEWPOST_MODAL = 'SET_VISIBILITY_NEWPOST_MODAL'
export const ADD_POST = 'ADD_POST'
export const SET_VISIBILITY_EDITPOST_MODAL = 'SET_VISIBILITY_EDITPOST_MODAL'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const CHANGE_VOTE_POST = 'CHANGE_VOTE_POST'
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SET_LOCATION= 'SET_LOCATION'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const CHANGE_VOTE_COMMENT = 'CHANGE_VOTE_COMMENT'

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

function requestComments() {
  return {
    type: REQUEST_COMMENTS,
  }
}

function receiveComments(json) {
  return {
    type: RECEIVE_COMMENTS,
    comments: json
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

export function editComment({id, body}) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp: Date.now(),
    body
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
