import { redirect, NOT_FOUND } from 'redux-first-router';
import * as ReadAPI from './utils/api';
import Actions from './actions';

// initapp
const initApp = async (dispatch, getState) => {
  const { categories, posts, comments } = getState();

  if (categories.length){
    return {categories, posts, comments};
  }

  // get all categories,
  // retrieve all posts -- better to retrieve when needed
  let cates, postList;

  // categories
  cates = await ReadAPI.getCategories();
  await dispatch(Actions.setCategories(cates));

  // posts
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

// retrieve comments
const getComments = async (dispatch, getState) =>{
  const {categories, posts, comments} = await initApp(dispatch, getState);

  const {
    location: { payload: {category, id}}
  } = getState();

  // redirect url to home page if  no-exist
  if (! ((category in posts) && (id in posts[category]))){
    const action = redirect({type: 'HOME'});
    dispatch(action);
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

    dispatch(Actions.updateComments(id, comments));
  }
};

export default {
  HOME: {
    path: '/',
    thunk: initApp
  },

  CATEGORY: {
    path: '/category/:category',
    thunk: async (dispatch, getState) => {
      const {categories, posts} = await initApp(dispatch, getState);

      const {
        location: { payload: { category }}
      } = getState();

      if (! (category in posts)){ // redirect url to home page if category no-exist
        const action = redirect({type: 'HOME'});
        dispatch(action);
      }
    }
  },

  POSTNEW: {
    path: '/post/new',
    thunk: initApp
  },


  POSTEDIT: {
    path: '/post/edit/:category/:id',
    thunk: getComments
  },

  POSTDETAIL:{
    path: '/post/detail/:category/:id',
    thunk: getComments
  },

  POSTDELETE: {
    path: '/post/delete/:category/:id',
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
  }

};
