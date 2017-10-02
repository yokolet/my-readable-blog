import { SET_VISIBILITY_EDIT_COMMENT } from '../actions'

const initialState = {
  open: false,
  comment: {},
}

export default function visibilityEditComment(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_EDIT_COMMENT:
      return {
        open: action.open,
        comment: action.comment,
      }

    default:
      return state
  }
}
