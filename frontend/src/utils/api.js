let port = process.env.PORT || 3001,
    origin = process.env.ORIGIN || `http://localhost:${port}`


// generate Authorization header
let token = localStorage.token;
if (!token){
  token = localStorage.token = Math.random().toString(36).substr(-8)
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
