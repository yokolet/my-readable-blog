import { combineReducers } from 'redux'
import allCategories from './all_categories'
import allPosts from './all_posts'
import posts from './posts'
import comments from './comments'
import visibilityCategory from './visibility_category'
import visibilityNewPostModal from './visibility_newpost_modal'

export default combineReducers({
  allCategories,
  allPosts,
  visibilityCategory,
  visibilityNewPostModal,
  posts,
  comments,
})
