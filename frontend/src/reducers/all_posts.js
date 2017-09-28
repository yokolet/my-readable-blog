import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions'

const initialState = {
  isFetcheing: false,
  posts: []
}

export default function allPosts(state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetcheing: true,
      }

    case RECEIVE_POSTS:
      return {
        ...state,
        isFetcheing: false,
        posts: action.posts,
      }

    default:
      return state
  }
}
