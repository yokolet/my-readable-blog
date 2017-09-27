import { ADD_COMMENT,
          EDIT_COMMENT,
          DELETE_COMMENT,
          UPVOTE_COMMENT,
          DOWNVOTE_COMMENT } from '../actions'

const initialState = [
  {
    id: null,
    timestamp: null,
    body: null,
    author: null,
    parentId: null,
    voteScore: 0,
  }
]

export default function comments(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        ...state,
        {
          id: action.id,
          timestamp: action.timestamp,
          body: action.body,
          author: action.author,
          parentId: action.parentId,
          voteScore: 0,
        }
      ]

    case EDIT_COMMENT:
      return state.map(comment =>
        comment.id === action.id
        ? {
          ...comment,
          timestamp: action.timestamp,
          body: action.body,
        }
        : comment
      )

    case DELETE_COMMENT:
      return state.filter(comment =>
        comment.id !== action.id)

    case UPVOTE_COMMENT:
      return state.map(comment =>
        comment.id === action.id
        ? {
          ...comment,
          voteScore: comment.voteScore + 1,
        }
        : comment
      )

    case DOWNVOTE_COMMENT:
    return state.map(comment =>
      comment.id === action.id
      ? {
        ...comment,
        voteScore: comment.voteScore - 1,
      }
      : comment
    )

    default:
      return state
  }
}
