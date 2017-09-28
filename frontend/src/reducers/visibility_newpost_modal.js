import { SET_VISIBILITY_NEWPOST_MODAL } from '../actions'

const initialState = {
  open: false,
}

export default function visibilityNewPostModal(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_NEWPOST_MODAL:
      return {
        open: action.open,
      }

    default:
      return state
  }
}
