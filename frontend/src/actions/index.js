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

// retrieve posts of one category
const UPDATE_CATEGORY_POSTS = 'UPDATE_CATEGORY_POSTS';
const updateCategoryPosts = (cate, posts) => ({
  type: UPDATE_CATEGORY_POSTS,
  posts: {
    category: cate,
    posts
  }
});

// sort posts
const SORT_POSTS = 'SORT_POSTS';
const sortPosts = (option) => ({
  type: SORT_POSTS,
  option
});


// add, del, edit post
const NEW_POST = 'NEW_POST';
const DEL_POST = 'DEL_POST';
const EDIT_POST = 'EDIT_POST';
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

// get all comments of a single post
const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
const updateComments = (postID, comments) => ({
  type: UPDATE_COMMENTS,
  postID,
  comments
});

// add, del, edit comment
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DEL_COMMENT = 'DEL_COMMENT';
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

// up/down vote post and comments
const UP_VOTE = 'UP_VOTE';
const DOWN_VOTE = 'DOWN_VOTE';
const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
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


export default {
  // retrieve categories
  SET_CATEGORIES,
  setCategories,

  // retrieve posts
  UPDATE_ALL_POSTS,
  updateAllPosts,

  UPDATE_CATEGORY_POSTS,
  updateCategoryPosts,

  // sort posts to display
  SORT_POSTS,
  sortPosts,

  // add, del, edit post
  NEW_POST,
  DEL_POST,
  EDIT_POST,
  addPost,
  delPost,
  editPost,

  // retrieve comments
  UPDATE_COMMENTS,
  updateComments,

  // add, del, edit comments
  ADD_COMMENT,
  EDIT_COMMENT,
  DEL_COMMENT,
  addComment,
  editComment,
  delComment,

  // up/down vote post and comments
  UP_VOTE,
  DOWN_VOTE,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  upVote,
  downVote,
  upVoteComment,
  downVoteComment
};
