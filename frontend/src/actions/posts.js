import uuid from 'js-uuid'
import * as API from '../utils/api'
import { REQUEST_POSTS,
          RECEIVE_POSTS,
          ADD_POST,
          EDIT_POST,
          DELETE_POST,
          CHANGE_VOTE_POST,
          CHANGE_SORT_BY, } from '../constants/actions'

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
