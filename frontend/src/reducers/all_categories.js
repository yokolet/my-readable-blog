import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions'

const initialState = {
  isFetcheing: false,
  categories: []
}

export default function allCategories(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,
        isFetcheing: true,
      }

    case RECEIVE_CATEGORIES:
      return {
        ...state,
        isFetcheing: false,
        categories: action.categories,
      }

    default:
      return state
  }
}
