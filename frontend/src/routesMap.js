import { redirect, NOT_FOUND } from 'redux-first-router';
import * as ReadAPI from './utils/api';
import Actions from './actions';


/**
 * @description function to initialize app's categories and posts when user enter the app by directly input specific url
 * @param {function} dispatch - dispatch function of redux store
 * @param {function} getState - getState function of redux store
 */
const initApp = async (dispatch, getState) => {
  const { categories, posts, comments } = getState();

  // return if app already initialized
  if (categories.length){
    return {categories, posts, comments};
  }

  // initilization
  let cates, postList;

  // get all categories
  cates = await ReadAPI.getCategories();
  await dispatch(Actions.setCategories(cates));

  // retrieve all posts -- better to retrieve when needed
  postList = await ReadAPI.getAllPosts();
  let postSet = cates.reduce((res, curr)=>({...res, [curr.path]:{}}), {});
  postSet = postList.reduce((res, curr) => ({
    ...res,
    [curr.category]: {
      ...res[curr.category],
      [curr.id]:curr
    }}), postSet);
  await dispatch(Actions.updateAllPosts(postSet));

  return {categories:cates, posts: postSet, comments};
};


/**
 * @description function to retrieve comments of a single post if necessary
 * @param {function} dispatch - dispatch function of redux store
 * @param {function} getState - getState function of redux store
 */
const getComments = async (dispatch, getState) =>{
  // init state in case it's the first entry of app
  const {posts, comments} = await initApp(dispatch, getState);

  const {
    location: { payload: {category, id}}
  } = getState();

  // redirect url to home page if no-exist
  if (! ((category in posts) && (id in posts[category]))){
    dispatch(redirect({type: NOT_FOUND}));
  }

  // update comment
  if (id in comments){
    return;
  }else{
    let commentList = await ReadAPI.getComments(id);
    let commentSet =
        commentList.reduce((res, curr) => ({
          ...res,
          [curr.id]: curr
        }), {});

    dispatch(Actions.updateComments(id, commentSet));
  }
};

// url management
export default {
  HOME: {
    path: '/',
    thunk: initApp
  },

  // category view
  CATEGORY: {
    path: '/:category',
    thunk: async (dispatch, getState) => {
      const {posts} = await initApp(dispatch, getState);

      const {
        location: { payload: { category }}
      } = getState();

      if (! (category in posts)){ // redirect url to home page if category no-exist
        dispatch({type: NOT_FOUND});
      }
    }
  },

  // add new post
  POSTNEW: {
    path: '/post/new',
    thunk: initApp
  },


  // edit post
  POSTEDIT: {
    path: '/:category/:id/edit',
    thunk: getComments
  },

  // post detail view
  POSTDETAIL:{
    path: '/:category/:id',
    thunk: getComments
  },

  // del post
  POSTDELETE: {
    path: '/:category/:id/delete',
    thunk: async (dispatch, getState) => {
      await getComments(dispatch, getState);

      const {
        location,
        posts
      } = getState();

      // del post
      const {category, id} = location.payload;
      let post = posts[category][id];
      await ReadAPI.delPost(id);
      await dispatch(Actions.delPost(post));

      // return to prev url
      let prev = location.prev;
      let action;
      if (prev.type.length===0 || prev.type === 'POSTDETAIL'){ // to homepage if not prev history
        action = redirect({type: 'HOME'});
      }else{
        action = {type:prev.type, payload: prev.payload};
      }
      dispatch(action);
    }
  },

  // add comment
  COMMENTNEW:{
    path: '/comment/new/:category/:id/',
    thunk: getComments
  },

  // edit comment
  COMMENTEDIT:{
    path: '/comment/edit/:category/:id/:commentId',
    thunk: async (dispatch, getState) => {
      await getComments(dispatch, getState);

      const {
        location,
        comments
      } = getState();

      const {id, commentId} = location.payload;
      // redirect url to home page if  no-exist
      if (! (id in comments && commentId in comments[id])){
        const action = redirect({type: 'HOME'});
        dispatch(action);
      }
    }
  },

  // del comment
  COMMENTDELETE:{
    path: '/comment/delete/:category/:id/:commentId',
    thunk: async (dispatch, getState) => {
      await getComments(dispatch, getState);

      const {
        location,
        posts,
        comments
      } = getState();

      const {category, id, commentId} = location.payload;
      // redirect url to home page if  no-exist
      if (! (id in comments && commentId in comments[id])){
        const action = redirect({type: 'HOME'});
        dispatch(action);
      }

      const post = posts[category][id];
      const comment = comments[id][commentId];

      await ReadAPI.delComment(commentId);
      await dispatch(Actions.delComment(comment, post));

      // return to prev url
      let prev = location.prev;
      let action;
      if (prev.type.length===0){ // to homepage if not prev history
        action = redirect({type: 'HOME'});
      }else{
        action = {type:'POSTDETAIL', payload: prev.payload};
      }
      dispatch(action);
    }
  }
};
