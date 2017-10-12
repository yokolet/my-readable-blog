import { SET_VISIBILITY_EDITPOST_MODAL } from '../constants/actions'

const initialState = {
  open: false,
  post: {},
}

export default function visibilityEditPostModal(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_EDITPOST_MODAL:
      return {
        open: action.open,
        post: action.post,
      }

    default:
      return state
  }
}
