import React, { Component } from 'react';
import { Sidebar } from './Sidebar';
import { PostsListView } from './Posts';
import '../css/App.css';

import './App.css';

const App = () => (
  <div className="app" >
    <Sidebar/>
    <PostsListView />
  </div>
);

export default App;
