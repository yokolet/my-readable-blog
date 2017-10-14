import { REQUEST_COMMENTS,
        RECEIVE_COMMENTS,
        ADD_COMMENT,
        EDIT_COMMENT,
        DELETE_COMMENT,
        CHANGE_VOTE_COMMENT } from '../constants/actions'

const initialState = {
  isFetching: false,
  comments: {},
}

export default function allComments(state = initialState, action) {
  let parentId
  let current
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        isFetching: true,
      }

    case RECEIVE_COMMENTS:
      return {
        ...state,
        isFetching: false,
        comments: {
          ...state.comments,
          [action.parentId]: action.comments.filter((comment) => (
            !comment.deleted && !comment.parentDeleted
          )),
        },
      }

    case ADD_COMMENT:
      parentId = action.result.parentId
      current = state.comments[parentId]
      if (!current) {
        current = []
      }
      return {
        ...state,
        comments: {
          ...state.comments,
          [parentId]: [
            ...current,
            {
              id: action.result.id,
              parentId: action.result.parentId,
              timestamp: action.result.timestamp,
              body: action.result.body,
              author: action.result.author,
              category: action.result.category,
              voteScore: action.result.voteScore,
              deleted: action.result.deleted,
              parentDeleted: action.result.parentDeleted,
            }
          ]
        }
      }

    case EDIT_COMMENT:
      parentId = action.result.parentId
      current = state.comments[parentId]
      if (!current) {
        current = []
      }
      return {
        ...state,
        comments: {
          ...state.comments,
          [parentId]:
            current.map(comment => (
              (comment.id === action.result.id)
              ? {...comment,
                timestamp: action.result.timestamp,
                body: action.result.body}
              : comment
            ))
        }
      }

    case DELETE_COMMENT:
      parentId = action.result.parentId
      current = state.comments[parentId]
      if (!current) {
        current = []
      }
      return {
        ...state,
        comments: {
          ...state.comments,
          [parentId]:
            current.map(comment => (
              (comment.id === action.result.id)
              ? {...comment,
                deleted: action.result.deleted}
              : comment
            ))
            .filter(comment => !comment.deleted)
        }
      }

    case CHANGE_VOTE_COMMENT:
      parentId = action.result.parentId
      current = state.comments[parentId]
      if (!current) {
        current = []
      }
      return {
        ...state,
        comments: {
          ...state.comments,
          [parentId]:
            current.map(comment => (
              (comment.id === action.result.id)
              ? {...comment,
                voteScore: action.result.voteScore}
              : comment
            ))
        }
      }

    default:
      return state
  }
}
