import { combineReducers } from 'redux'
import allCategories from './all_categories'
import allPosts from './all_posts'
import comments from './comments'
import visibilityCategory from './visibility_category'
import visibilityNewPostModal from './visibility_newpost_modal'
import visibilityEditPostModal from './visibility_editpost_modal'
import singlePost from './single_post'
import currentLocation from './location'

export default combineReducers({
  allCategories,
  allPosts,
  visibilityCategory,
  visibilityNewPostModal,
  visibilityEditPostModal,
  comments,
  singlePost,
  currentLocation,
})
