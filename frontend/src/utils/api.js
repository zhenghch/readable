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
export const getCategories = () =>
  fetch(`${origin}/categories`, { headers })
  .then(res => res.json())
  .then(data => data.categories);

// return all posts
export const getPosts = () =>
  fetch(`${origin}/posts`, { headers })
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
