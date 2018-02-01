const LIST_CATEGORY = 'LIST_CATEGORY';
const UPDATE_ALL_POSTS = 'UPDATE_ALL_POSTS';
const UPDATE_CATEGORY_POSTS = 'UPDATE_CATEGORY_POSTS';

const SORT_POSTS = 'SORT_POSTS';

const UP_VOTE = 'UP_VOTE';
const DOWN_VOTE = 'DOWN_VOTE';

const NEW_POST = 'NEW_POST';
const DEL_POST = 'DEL_POST';

const EDIT_POST = 'EDIT_POST';
const SET_EDIT_MODE = 'SET_EDIT_MODE';
const RESET_EDIT_MODE = 'RESET_EDIT_MODE';

const UPDATE_COMMENTS = 'UPDATE_COMMENTS';


const listCategory = (categories) => ({
  type: LIST_CATEGORY,
  categories
});

const updateAllPosts = (posts) => ({
  type: UPDATE_ALL_POSTS,
  posts
});

const updateCategoryPosts = (cate, posts) => ({
  type: UPDATE_CATEGORY_POSTS,
  posts: {
    category: cate,
    posts
  }
});

const sortPosts = (option) => ({
  type: SORT_POSTS,
  option
});

const upVote = (post) => ({
  type: UP_VOTE,
  post
});
const downVote = (post) => ({
  type: DOWN_VOTE,
  post
});

const addPost = (post) => ({
  type: NEW_POST,
  post
});

const delPost = (post) => ({
  type: DEL_POST,
  post
});


const editPost = (post) => ({
  type: EDIT_POST,
  post
});

const setEditMode = (post) => ({
  type: SET_EDIT_MODE,
  post
});

const resetEditMode = () => ({
  type: RESET_EDIT_MODE
});


const updateComments = (postID, comments) => ({
  type: UPDATE_COMMENTS,
  postID,
  comments
});

export default {
  LIST_CATEGORY,
  UPDATE_ALL_POSTS,
  UPDATE_CATEGORY_POSTS,
  SORT_POSTS,
  UP_VOTE,
  DOWN_VOTE,
  NEW_POST,
  DEL_POST,

  EDIT_POST,
  SET_EDIT_MODE,
  RESET_EDIT_MODE,

  UPDATE_COMMENTS,

  listCategory,
  updateAllPosts,
  sortPosts,
  addPost,
  delPost,
  upVote,
  downVote,
  updateCategoryPosts,

  editPost,
  setEditMode,
  resetEditMode,

  updateComments
};
