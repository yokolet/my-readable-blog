import { SET_VISIBILITY_CATEGORY } from '../actions'

const initialState = {
  category: 'all',
}

export default function visibilityCategory(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_CATEGORY:
      return {
        category: action.category,
      }

    default:
      return state
  }
}
