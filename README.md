# Readable 

The code for Udacity's Redux course, a content and comment web. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

## Start the app
Start api server and frontend, then navigate to localhost at open host.
### install and start API server
- `cd api-server`
- `npm install`
- `node server`

### install and start frontend
- `cd frontend`
- `npm install`
- `npm start`

## description
The app use [redux-first-router](https://github.com/faceyspacey/redux-first-router) to manage navigation of url as action in redux. React components are then rendered conditioned on url (*location* state in redux store).  (some css style taken from [redux-first-router-demo](https://github.com/faceyspacey/redux-first-router-demo))

There're five main views:
- sidebar
- post list view
- post detail view
- post form
- comment form

### sidebar
Sidebar view is always rendered. It lists all predefined categories, means to sort post, and button to post new contents. 

### post list view
When navigate to category page (or at home page), summary of all posts of selected category are listed. It also contains button to reply, edit, delete post; and also up/down vote listed posts.

### post detail view
Post detail view will render when at postdetail page. Detailed info of post, including content, comments, will be displayed. 

### post form
post form is triggered to add new post or edit existing post.

### comment form
comment form is triggered to add new comment or edit exisiting comment.
