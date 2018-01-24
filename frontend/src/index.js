import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import Actions from './actions';

let store = createStore(reducer);
store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch({ type: Actions.SELECT_CATEGORY, category: 'test'});
store.dispatch({ type: Actions.SELECT_CATEGORY, category: 'all'});

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
registerServiceWorker();
