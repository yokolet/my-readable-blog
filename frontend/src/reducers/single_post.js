import { REQUEST_SINGLE_POST,
        RECEIVE_SINGLE_POST,
        EDIT_POST,
        DELETE_POST,
        CHANGE_VOTE_POST } from '../constants/actions'

const initialState = {
  isFetching: false,
  post: {},
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
        post: (action.post.id ? action.post : {deleted: true}),
      }

    case EDIT_POST:
      return {
        ...state,
        post: {...state.post,
              title: action.result.title,
              body: action.result.body}
      }

    case DELETE_POST:
      return {
        ...state,
        post: {
          ...state.post,
          deleted: true,
        }
      }

    case CHANGE_VOTE_POST:
      return {
        ...state,
        post: {...state.post,
                voteScore: action.result.voteScore}
      }

    default:
      return state
  }
}
