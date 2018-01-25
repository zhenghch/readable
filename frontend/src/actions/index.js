const LIST_CATEGORY = 'LIST_CATEGORY';
const SELECT_CATEGORY = 'SELECT_CATEGORY';
const NEW_POST = 'NEW_POST';
const DEL_POST = 'DEL_POST';
const EDIT_POST = 'EDIT_POST';


function listCategory(categories){
  return {
    type: LIST_CATEGORY,
    categories
  };
}

function selectCategory(category){
  return {
    type: SELECT_CATEGORY,
    category
  };
}

function addPost(post){
  return {
    type: NEW_POST,
    post
  };
}

function delPost(post){
  return {
    type: DEL_POST,
    post
  };
}

function editPost(post){
  return {
    type: EDIT_POST,
    post
  };
}

export default {
  LIST_CATEGORY,
  SELECT_CATEGORY,
  NEW_POST,
  DEL_POST,
  EDIT_POST,
  listCategory,
  selectCategory
};
