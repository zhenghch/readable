import React, { Component } from 'react';
import { Categories } from './Categories';
import { PostsOverview } from './Posts';
import '../css/App.css';

import './App.css';

const App = () => (
  <div className="app" >
    <Categories />
    <PostsOverview />
  </div>
);

export default App;
