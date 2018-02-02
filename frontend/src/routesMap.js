import { redirect, NOT_FOUND } from 'redux-first-router';
import * as ReadAPI from './utils/api';
import Actions from './actions';

const initApp = async (dispatch, getState) => {
  const { categories, posts } = getState();

  if (categories.length){
    return {categories, posts};
  }

  // get all categories,
  // retrieve all posts -- better to retrieve when needed
  let cates, postList, comments;

  // categories
  cates = await ReadAPI.getCategories();
  dispatch(Actions.setCategories(cates));

  // posts
  postList = await ReadAPI.getAllPosts();
  let postSet = cates.reduce((res, curr)=>({...res, [curr.path]:{}}), {});
  postSet = postList.reduce((res, curr) => ({
    ...res,
    [curr.category]: {
      ...res[curr.category],
      [curr.id]:curr
    }}), postSet);

  dispatch(Actions.updateAllPosts(postSet));

  return {categories:cates, posts: postSet};
};

export default {
  HOME: {
    path: '/',
    thunk: initApp,
  },

  CATEGORY: {
    path: '/:category',
    thunk: async (dispatch, getState) => {
      const {
        location: { payload: { category }}
      } = getState();

      const {categories, posts} = await initApp(dispatch, getState);

      if (! (category in posts)){
        return dispatch({type: NOT_FOUND});
      }
    }
  }
};
