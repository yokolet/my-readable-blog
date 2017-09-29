import { REQUEST_POSTS,
          RECEIVE_POSTS,
          ADD_POST,
          CHANGE_VOTE_POST} from '../actions'

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

    case ADD_POST:
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: action.result.id,
            timestamp: action.result.timestamp,
            title: action.result.title,
            body: action.result.body,
            author: action.result.author,
            category: action.result.category,
            voteScore: action.result.voteScore,
            deleted: action.result.deleted,
          }
        ]
      }

    case CHANGE_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => (
          (post.id === action.result.id)
          ? {...post, voteScore: action.result.voteScore}
          : post
        ))
      }

    default:
      return state
  }
}
