import Actions from '../actions';

// helper function to select/filter specific post
function selectPost(posts, id, func){
  return Object.keys(posts)
    .filter(key => func(id, key))
    .reduce((res, key) => ({...res, [key]: posts[key]}), {});
}

/**
 * @description reducer to update categories state
 * @param {array} state - origin categories state
 * @param {object} action - action
 */
function setCategories(state=[], action){
  if (action.type === Actions.SET_CATEGORIES){
    return action.categories;
  }else{
    return state;
  }
}


/**
 * @description reducer to update sort method state
 * @param {array} state - origin sorts state
 * @param {object} action - action
 */
function sortPosts(state={by:'timestamp', how:'decrease'}, action){
  if (action.type === Actions.SORT_POSTS){
    return action.option;
  }else{
    return state;
  }
}


/**
 * @description reducer to handle post update, including initialization; add, del, edit, up/down vote a post; add/del comment of post
 * @param {array} state - origin posts state
 * @param {object} action - action
 */
function handlePosts(state={}, action){
  // batch update of posts
  if (action.type === Actions.UPDATE_ALL_POSTS){
    return action.posts;
  }else if (action.type === Actions.UPDATE_CATEGORY_POSTS){
    return {
      ...state,
      [action.category]: action.posts
    };
  }

  // action relate to single post
  let post = action.post || {},
      cate = post.category,
      id = post.id;

  switch (action.type){
    // add, del, edit post
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
    // up/down vote a single post
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

    // add / del comment
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
    };
  case Actions.DEL_COMMENT:
    return {
      ...state,
      [cate]: {
        ...state[cate],
        [id]: {
          ...post,
          commentCount: post.commentCount - 1
        }
      }
    };

  default:
    return state;
  }
}


/**
 * @description reducer to handle comment update, including initialization; add, del, edit, up/down vote a post; add/del comment of post
 * @param {array} state - origin comments state
 * @param {object} action - action
 */
function handleComments(state = {}, action){
  switch(action.type){
    // batch update of comments of a single post
  case Actions.UPDATE_COMMENTS:
    return {
      ...state,
      [action.postID]: action.comments
    };
  case Actions.DEL_POST:
    return {
      ...state,
      [action.post.id]: Object.keys(state[action.post.id]).map(id => state[action.post.id][id]).reduce((res, curr) => (
        {...res,
         [curr.id]: {...curr, parentDeleted: true}}), {})
    };

    // add, del, edit a comment
  case Actions.ADD_COMMENT:
    return {
      ...state,
      [action.comment.parentId]:{
        ...state[action.comment.parentId],
        [action.comment.id]: action.comment
      }
    };
  case Actions.EDIT_COMMENT:
    return {
      ...state,
      [action.comment.parentId]: {
        ...state[action.comment.parentId],
        [action.comment.id]: action.comment
      }
    };
  case Actions.DEL_COMMENT:
    return {
      ...state,
      [action.comment.parentId]: {
        ...state[action.comment.parentId],
        [action.comment.id]: {
          ...action.comment,
          deleted: true
        }
      }
    };

   // up/down vote a comment
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

  default:
    return state;
  }
}

export { setCategories as categories };
export { sortPosts as sorts };
export { handlePosts as posts };
export { handleComments as comments};
