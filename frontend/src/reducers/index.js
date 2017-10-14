import { combineReducers } from 'redux'
import currentLocation from './location'
import allCategories from './all_categories'
import allPosts from './all_posts'
import visibilityNewPostModal from './visibility_newpost_modal'
import visibilityEditPostModal from './visibility_editpost_modal'
import singlePost from './single_post'
import allComments from './all_comments'
import visibilityEditComment from './visibility_edit_comment'

export default combineReducers({
  currentLocation,
  allCategories,
  allPosts,
  visibilityNewPostModal,
  visibilityEditPostModal,
  singlePost,
  allComments,
  visibilityEditComment,
})
