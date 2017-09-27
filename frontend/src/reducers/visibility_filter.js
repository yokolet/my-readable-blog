import { SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions'

const initialState = {
  filter: VisibilityFilters.SHOW_ALL,
  category: '',
}

export default function visibilityFilter(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {
        filter: action.filter,
        category: action.category,
      }

    default:
      return state
  }
}
