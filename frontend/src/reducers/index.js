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

/////////////////
// sorts
function sortPosts(state={by:'timestamp', how:'decrease'}, action){
  if (action.type === Actions.SORT_POSTS){
    return action.option;
  }else{
    return state;
  }
}

/////////////////
// edit mode
function editMode(state={edit: false, post: {}}, action){
  switch(action.type){
  case Actions.SET_EDIT_MODE:
    return {
      edit: true,
      post: action.post
    };
  case Actions.RESET_EDIT_MODE:
    return {
      edit: false,
      post: {}
    };
  default:
    return state;
  }
}

/////////////////
// store posts, add, del, edit post
function handlePosts(state={}, action){
  // store posts
  if (action.type === Actions.UPDATE_ALL_POSTS){
    return action.posts;
  }else if (action.type === Actions.UPDATE_CATEGORY_POSTS){
    return {
      ...state,
      [action.category]: action.posts
    };
  }

  // add, del, edit post
  let post = action.post || {},
      cate = post.category,
      id = post.id;

  switch (action.type){
  case Actions.UP_VOTE:
    return {
      ...state,
      [cate]: {
        ...state[cate],
        [id]: {
          ...post,
          voteScore: post.voteScore + 1
        }
      }
    };
  case Actions.DOWN_VOTE:
    return {
      ...state,
      [cate]: {
        ...state[cate],
        [id]: {
          ...post,
          voteScore: post.voteScore - 1
        }
      }
    };
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

/////////////////
// store , add, del, edit comments
function handleComments(state = {}, action){
  switch(action.type){
  case Actions.UPDATE_COMMENTS:
    return {
      ...state,
      [action.postID]: action.comments
    };
  default:
    return state;
  }
}


export { setCategoryList as categories };
export { handlePosts as posts };
export { sortPosts as sorts };
export { editMode as editmode};
export { handleComments as comments};
