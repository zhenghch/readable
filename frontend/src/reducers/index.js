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
// post view mode
function postMode(state={view: false, post: {}}, action){
  switch(action.type){
  case Actions.SET_POST_MODE:
    return {
      view: true,
      post: action.post
    };
  case Actions.RESET_POST_MODE:
    return {
      view: false,
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
        [cate]: {
          ...state[cate],
          [id]: {
            ...post,
            deleted: true
          }
        }
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

  case Actions.ADD_COMMENT:
    return {
      ...state,
      [cate]: {
        ...state[cate],
        [id]: {
          ...post,
          commentCount: post.commentCount + 1
        }
      }

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
  case Actions.UPVOTE_COMMENT:
    return {
      ...state,
      [action.comment.parentId]: {
        ...state[action.comment.parentId],
        [action.comment.id]: {
          ...action.comment,
          voteScore: action.comment.voteScore + 1
        }
      }
    };
  case Actions.DOWNVOTE_COMMENT:
    return {
      ...state,
      [action.comment.parentId]: {
        ...state[action.comment.parentId],
        [action.comment.id]: {
          ...action.comment,
          voteScore: action.comment.voteScore - 1
        }
      }
    };

  case Actions.ADD_COMMENT:
    return {
      ...state,
      [action.comment.parentId]:{
        ...state[action.comment.parentId],
        [action.comment.id]: action.comment
      }
    };

  case Actions.DEL_POST:
    console.log(state, action.post.id, state[action.post.id]);
    return {
      ...state,
      [action.post.id]: Object.keys(state[action.post.id]).map(id => state[action.post.id][id]).reduce((res, curr) => (
        {...res,
         [curr.id]: {...curr, parentDeleted: true}}), {})
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
export { postMode as postmode};
