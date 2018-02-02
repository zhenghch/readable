const ACTIVE_POST = 'ACTIVE_POST';

const POST_MODAL = 'POST_MODAL';
//
const LIST_CATEGORY = 'LIST_CATEGORY';
const UPDATE_ALL_POSTS = 'UPDATE_ALL_POSTS';
const UPDATE_CATEGORY_POSTS = 'UPDATE_CATEGORY_POSTS';

const SORT_POSTS = 'SORT_POSTS';

const UP_VOTE = 'UP_VOTE';
const DOWN_VOTE = 'DOWN_VOTE';
const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';

const NEW_POST = 'NEW_POST';
const DEL_POST = 'DEL_POST';

const EDIT_POST = 'EDIT_POST';
const SET_EDIT_MODE = 'SET_EDIT_MODE';
const RESET_EDIT_MODE = 'RESET_EDIT_MODE';

const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DEL_COMMENT = 'DEL_COMMENT';

const SET_POST_MODE = 'SET_POST_MODE';
const RESET_POST_MODE = 'RESET_POST_MODE';

const UPDATE_COMMENTS = 'UPDATE_COMMENTS';

// active/deactive post to control post form display and detail post view
const activePost = (active=true, post={category:'', id:''}) => ({
  type: ACTIVE_POST,
  active,
  post
});

// whether to render post modal
const postModal = (show=false) => ({
  type: POST_MODAL,
  show
});


//
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

const upVoteComment = (comment) => ({
  type: UPVOTE_COMMENT,
  comment
});

const downVoteComment = (comment) => ({
  type: DOWNVOTE_COMMENT,
  comment
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


const setPostMode = (post) => ({
  type: SET_POST_MODE,
  post
});

const resetPostMode = () => ({
  type: RESET_POST_MODE
});

const addComment = (comment, post) => ({
  type: ADD_COMMENT,
  comment,
  post
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
});

const delComment = (comment, post) => ({
  type: DEL_COMMENT,
  comment,
  post
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
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,

  NEW_POST,
  DEL_POST,

  EDIT_POST,
  SET_EDIT_MODE,
  RESET_EDIT_MODE,

  SET_POST_MODE,
  RESET_POST_MODE,

  ADD_COMMENT,
  EDIT_COMMENT,
  DEL_COMMENT,

  UPDATE_COMMENTS,

  listCategory,
  updateAllPosts,
  sortPosts,
  addPost,
  delPost,

  upVote,
  downVote,
  upVoteComment,
  downVoteComment,

  updateCategoryPosts,

  editPost,
  setEditMode,
  resetEditMode,

  setPostMode,
  resetPostMode,

  addComment,
  editComment,
  delComment,

  updateComments,
  //
  ACTIVE_POST,
  activePost,

  POST_MODAL,
  postModal
};
