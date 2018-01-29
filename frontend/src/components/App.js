import React, { Component } from 'react';
import { Categories } from './Categories';
import { PostsOverview } from './Posts';

import './App.css';

const App = () => (
  <div>
    <Categories />
    <PostsOverview />
  </div>
);

export default App;
