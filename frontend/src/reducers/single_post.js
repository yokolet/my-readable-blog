import { REQUEST_SINGLE_POST,
        RECEIVE_SINGLE_POST,
        CHANGE_VOTE_POST,
        REQUEST_COMMENTS,
        RECEIVE_COMMENTS,
        ADD_COMMENT,
        EDIT_COMMENT,
        DELETE_COMMENT,
        CHANGE_VOTE_COMMENT } from '../actions'

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

    case CHANGE_VOTE_POST:
      return {
        ...state,
        post: {...state.post,
                voteScore: action.result.voteScore}
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
        comments: action.comments,
      }

    case ADD_COMMENT:
      return {
        ...state,
        comments: [
          ...state.comments,
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

    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => (
          (comment.id === action.result.id)
          ? {...comment,
              timestamp: action.result.timestamp,
              body: action.result.body}
          : comment
        ))
      }

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => (
          (comment.id === action.result.id)
          ? {...comment, deleted: action.result.deleted}
          : comment
        ))
        .filter(comment => !comment.deleted)
      }

    case CHANGE_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => (
          (comment.id === action.result.id)
          ? {...comment, voteScore: action.result.voteScore}
          : comment
        ))
      }

    default:
      return state
  }
}
