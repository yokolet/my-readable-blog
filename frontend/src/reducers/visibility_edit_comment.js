import { SET_VISIBILITY_EDIT_COMMENT } from '../constants/actions'

const initialState = {
  open: false,
  comment: {},
}

export default function visibilityEditComment(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_EDIT_COMMENT:
      return {
        open: action.open,
        id: action.id,
      }

    default:
      return state
  }
}
