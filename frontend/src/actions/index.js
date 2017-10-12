import uuid from 'js-uuid'
import * as API from '../utils/api'

export const SET_VISIBILITY_NEWPOST_MODAL = 'SET_VISIBILITY_NEWPOST_MODAL'
export const SET_VISIBILITY_EDITPOST_MODAL = 'SET_VISIBILITY_EDITPOST_MODAL'
export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'

export function setVisibilityNewPostModal(open) {
  return {
    type: SET_VISIBILITY_NEWPOST_MODAL,
    open,
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
