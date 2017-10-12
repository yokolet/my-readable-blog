import { SET_VISIBILITY_NEWPOST_MODAL,
          SET_VISIBILITY_EDITPOST_MODAL } from '../constants/actions'

export function setVisibilityNewPostModal(open) {
  return {
    type: SET_VISIBILITY_NEWPOST_MODAL,
    open,
  }
}

export function setVisibilityEditPostModal(open, data) {
  let post = open ? data : {}
  return {
    type: SET_VISIBILITY_EDITPOST_MODAL,
    open,
    post,
  }
}
