import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import App from './components/App';
import configureStore from './configureStore';

const preLoadState = {
  categories: [],
  posts: {},
  sorts: {},
  editmode: {},
  comments: {}
};

const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
