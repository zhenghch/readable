import Actions from '../actions';

// helper function to select/filter specific post
function selectPost(posts, id, func){
  return Object.keys(posts)
    .filter(key => func(id, key))
    .reduce((res, key) => ({...res, [key]: posts[key]}), {});
}

/////////////////
// store categories into store
function setCategoryList(state=[], action){
  if (action.type === Actions.LIST_CATEGORY){
    return action.categories;
  }else{
    return state;
  }
}


// add, del, edit post
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

export { setCategoryList as categories };
export { handlePosts as posts };
