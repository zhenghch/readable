import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';

// test
import Actions from './actions';

let initState = {
  category: 'all',
  posts: {
    news: {

    },
    it: {

    },
    story:{

    }
  }
};

let post1 = {
  id: 'post1',
  timestamp: Date.now(),
  title: 'my first post',
  body: 'my first post blabla...',
  author: 'hanc',
  category: 'story',
  voteScore: 0
};

let post1Nul = {
  ...post1,
  category: 'blabla'
}

let post1Mod = {
  ...post1,
  voteScore: 1
};


let post2 = {
  id: 'post2',
  timestamp: Date.now(),
  title: 'my second post',
  body: 'my second post blabla...',
  author: 'hanc',
  category: 'it',
  voteScore: 0
};



let store = createStore(reducer, initState);
store.subscribe(() =>
  console.log(store.getState())
)

// select category
store.dispatch({ type: Actions.SELECT_CATEGORY, category: 'test'});
store.dispatch({ type: Actions.SELECT_CATEGORY, category: 'all'});

//// posts handler
console.log('ineffective post');
store.dispatch({
  type:Actions.NEW_POST,
  post: post1Nul
})

console.log('new post');
store.dispatch({
  type: Actions.NEW_POST,
  post: post1
});

console.log('another new post');
store.dispatch({
  type: Actions.NEW_POST,
  post: post2
});

console.log('modify post');
store.dispatch({
  type: Actions.EDIT_POST,
  post: post1Mod
})

console.log('delete post');
store.dispatch({
  type: Actions.DEL_POST,
  post: post2
})

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
registerServiceWorker();
