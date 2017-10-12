import { fetchSinglePost } from '../utils/api'
import { REQUEST_SINGLE_POST,
          RECEIVE_SINGLE_POST } from '../constants/actions'

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
    return fetchSinglePost(id)
      .then(json => dispatch(receiveSinglePost(json)))
  }
}
