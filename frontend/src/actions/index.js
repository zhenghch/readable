const SELECT_CATEGORY = 'SELECT_CATEGORY';
const NEW_POST = 'NEW_POST';
const DEL_POST = 'DEL_POST';
const EDIT_POST = 'EDIT_POST';

function selectCategory(category){
  return {
    type: SELECT_CATEGORY,
    category,
  };
}

export default {
  SELECT_CATEGORY,
  NEW_POST,
  DEL_POST,
  EDIT_POST,
  selectCategory
};
