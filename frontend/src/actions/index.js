import * as API from '../utils/api'

export const REQUEST_SINGLE_POST = 'REQUEST_SINGLE_POST'
export const RECEIVE_SINGLE_POST = 'RECEIVE_SINGLE_POST'

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
