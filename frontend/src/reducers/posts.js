import { ADD_POST,
          EDIT_POST,
          DELETE_POST,
          UPVOTE_POST,
          DOWNVOTE_POST } from '../actions'

const initialState = [
  {
    id: null,
    timestamp: null,
    title: null,
    body: null,
    author: null,
    category: null,
    voteScore: 0,
  }
]

export default function posts(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        {
          id: action.id,
          timestamp: action.timestamp,
          title: action.title,
          body: action.body,
          author: action.author,
          category: action.category,
          voteScore: 0,
        }
      ]

    case EDIT_POST:
      return state.map(post =>
        post.id === action.id
        ? {
          ...post,
          title: action.title,
          body: action.body,
        }
        : post
      )

    case DELETE_POST:
      return state.filter(post =>
        post.id !== action.id)

    case UPVOTE_POST:
      return state.map(post =>
        post.id === action.id
        ? {
          ...post,
          voteScore: post.voteScore + 1,
        }
        : post
      )

    case DOWNVOTE_POST:
    return state.map(post =>
      post.id === action.id
      ? {
        ...post,
        voteScore: post.voteScore - 1,
      }
      : post
    )

    default:
      return state
  }
}
