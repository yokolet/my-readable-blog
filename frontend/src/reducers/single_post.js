import { REQUEST_SINGLE_POST,
        RECEIVE_SINGLE_POST,
        REQUEST_COMMENTS,
        RECEIVE_COMMENTS } from '../actions'

const initialState = {
  isFetching: false,
  post: {},
  isCommentsFetching: false,
  comments: [],
}

export default function singlePost(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SINGLE_POST:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_SINGLE_POST:
      return {
        ...state,
        isFetching: false,
        post: action.post,
      }

    case REQUEST_COMMENTS:
      return {
        ...state,
        isCommentsFetching: true,
      }

    case RECEIVE_COMMENTS:
      return {
        ...state,
        isCommentsFetching: false,
        comments: action.comments
      }

    default:
      return state
  }
}
