import { redirect, NOT_FOUND } from 'redux-first-router';
import * as ReadAPI from './utils/api';
import Actions from './actions';

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

export default {
  HOME: {
    path: '/',
    thunk: initApp
  },

  CATEGORY: {
    path: '/category/:category',
    thunk: async (dispatch, getState) => {
      const {
        location: { payload: { category }}
      } = getState();

      const {categories, posts} = await initApp(dispatch, getState);

      if (! (category in posts)){ // redirect url to home page if category no-exist
        const action = redirect({type: 'HOME'});
        dispatch(action);
      }
    }
  },

  POSTNEW: {
    path: '/post/postnew',
    thunk: initApp
  },

  POSTDETAIL:{
    path: '/post/detail/:category/:id',
    thunk: async (dispatch, getState) => {
      const {
        location: { payload: {category, id}}
      } = getState();

      const {categories, posts, comments} = await initApp(dispatch, getState);

      // redirect url to home page if category no-exist
      console.log(id, category);
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
    }

  }
};
