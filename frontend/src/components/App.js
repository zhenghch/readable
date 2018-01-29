import React, { Component } from 'react';
import { Route } from 'react-router';
import { Categories } from './Categories';
import { PostsOverview } from './Posts';

import './App.css';

const App = () => (
  <Route path="/" render={ () => (
           <div>
               <Categories />
               <PostsOverview />
           </div>
  )}/>
);

export default App;
