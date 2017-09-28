import { combineReducers } from 'redux'
import allCategories from './all_categories'
import allPosts from './all_posts'
import posts from './posts'
import comments from './comments'
import visibilityCategory from './visibility_category'

export default combineReducers({
  allCategories,
  allPosts,
  visibilityCategory,
  posts,
  comments,
})
