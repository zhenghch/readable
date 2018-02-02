// set app's categories
const SET_CATEGORIES = 'SET_CATEGORIES';
const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories
});

// retrieve all posts at once
const UPDATE_ALL_POSTS = 'UPDATE_ALL_POSTS';
const updateAllPosts = (posts) => ({
  type: UPDATE_ALL_POSTS,
  posts
});

//
const ACTIVE_POST = 'ACTIVE_POST';

const POST_MODAL = 'POST_MODAL';
const DETAIL_MODE = 'DETAIL_MODE';
//


const UPDATE_CATEGORY_POSTS = 'UPDATE_CATEGORY_POSTS';

const SORT_POSTS = 'SORT_POSTS';

const UP_VOTE = 'UP_VOTE';
const DOWN_VOTE = 'DOWN_VOTE';
const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';

const NEW_POST = 'NEW_POST';
const DEL_POST = 'DEL_POST';

const EDIT_POST = 'EDIT_POST';

const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DEL_COMMENT = 'DEL_COMMENT';

const UPDATE_COMMENTS = 'UPDATE_COMMENTS';

// active/deactive post to control post form display and detail post view
const activePost = (active=true, post={category:'', id:''}) => ({
  type: ACTIVE_POST,
  active,
  post: {category: post.category, id: post.id}
});

// whether to render post modal
const postModal = (show=false) => ({
  type: POST_MODAL,
  show
});

// whether to show detail of post
const detailMode = (show=false)  => ({
  type: DETAIL_MODE,
  show
});

//


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
  SET_CATEGORIES,
  setCategories,

  UPDATE_ALL_POSTS,
  updateAllPosts,

  UPDATE_CATEGORY_POSTS,
  SORT_POSTS,

  UP_VOTE,
  DOWN_VOTE,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,

  NEW_POST,
  DEL_POST,

  EDIT_POST,

  ADD_COMMENT,
  EDIT_COMMENT,
  DEL_COMMENT,

  UPDATE_COMMENTS,

  sortPosts,
  addPost,
  delPost,

  upVote,
  downVote,
  upVoteComment,
  downVoteComment,

  updateCategoryPosts,

  editPost,

  addComment,
  editComment,
  delComment,

  updateComments,
  //
  ACTIVE_POST,
  activePost,

  POST_MODAL,
  postModal,

  DETAIL_MODE,
  detailMode
};
