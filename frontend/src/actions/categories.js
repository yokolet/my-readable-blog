import { fetchCategories } from '../utils/api'
import { REQUEST_CATEGORIES,
          RECEIVE_CATEGORIES } from '../constants/actions'

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
    return fetchCategories()
      .then(json => dispatch(receiveCategories(json)))
  }
}
