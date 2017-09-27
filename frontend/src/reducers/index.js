import { combineReducers } from 'redux'
import posts from './posts'
import comments from './comments'
import visibilityFilter from './visibility_filter'

export default combineReducers({
  posts,
  comments,
  visibilityFilter,
})
