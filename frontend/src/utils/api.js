let port = process.env.PORT || 3001,
    origin = process.env.ORIGIN || `http://localhost:${port}`;


// generate Authorization header
let token = localStorage.token;
if (!token){
  token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
};

// return list of categories
export const getCategories = async () =>
  fetch(`${origin}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories);

// return all posts
export const getAllPosts = () =>
  fetch(`${origin}/posts`, { headers })
  .then(res => res.json());

// return post of particular category
export const getPost = async (category) =>
  fetch(`${origin}/${category}/posts/`, { headers})
  .then(res => res.json());


// up/down vote post
export const votePost = (id, option) =>
  fetch(`${origin}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
    }).then(res => res.json());

// up/down vote comment
export const voteComment = (id, option) =>
  fetch(`${origin}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option})
    }).then(res => res.json());


// add a new post
export const addPost = (post) =>
  fetch(`${origin}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());


// edit post
export const editPost = (id, body, title) =>
  fetch(`${origin}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body, title})
  }).then(res => res.json());

// del post
export const delPost = (id)  =>
  fetch(`${origin}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());


// get post detail
export const getPostDetail = (id) =>
  fetch(`${origin}/posts/${id}`,{
    headers
  }).then(res => res.json());

// get all comments of a post
export const getComments = (postID) =>
  fetch(`${origin}/posts/${postID}/comments`,{
    headers
  }).then(res => res.json());

export const addComment = (comment) =>
  fetch(`${origin}/comments`, {
    method: 'POST',
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const editComment = (comment) =>
  fetch(`${origin}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
