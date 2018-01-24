import { combineReducers } from 'redux';
import Actions from '../actions';

function selectPost(posts, id, func){
  return Object.key(posts)
    .filter(key => func(id, key))
    .reduce((res, key) => ({...res, [key]: posts[key]}), {});
}

function viewCategory(state='all', action){
  if (action.type === Actions.SELECT_CATEGORY){
    return action.category;
  }else{
    return state;
  }
}

function handlePosts(state={}, action){
  let post = action.post || {},
      cate = post.category,
      id = post.id;

  switch (action.type){
  case Actions.NEW_POST:
    // not in predefined category or 'id' conflict
    if ( !(cate in state) || (id in state[cate]) ){
      return state;
    }else{
      return {
        ...state,
        [cate]:{
          ...state[cate],
          [id]: post
        }
      };
    }
  case Actions.DEL_POST:
    // not in predefined category or 'id' not exist
    if ( !(cate in state && id in state[cate]) ){
      return state;
    }else{
      return {
        ...state,
        [cate]: selectPost(state[cate], id, (id, key) => (id !== key))
      };
    }
  case Actions.EDIT_POST:
    // not in predefined category or 'id' not exist
    if ( !(cate in state && id in state[cate]) ){
      return state;
    }else{
      return {
        ...state,
        [cate]: {
          ...state[cate],
          [id]: post
        }
      };
    }
  default:
    return state;
  }
}

export default combineReducers({
  category: viewCategory,
  posts: handlePosts
});
