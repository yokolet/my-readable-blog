import { combineReducers } from 'redux'
import allPosts from './all_posts'
import posts from './posts'
import comments from './comments'
import visibilityFilter from './visibility_filter'

export default combineReducers({
  allPosts,
  posts,
  comments,
  visibilityFilter,
})
