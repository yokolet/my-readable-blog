import { combineReducers } from 'redux'
import allCategories from './all_categories'
import allPosts from './all_posts'
import posts from './posts'
import comments from './comments'
import visibilityFilter from './visibility_filter'

export default combineReducers({
  allCategories,
  allPosts,
  posts,
  comments,
  visibilityFilter,
})
