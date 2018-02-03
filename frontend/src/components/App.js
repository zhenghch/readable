import React, { Component } from 'react';
import { Sidebar } from './Sidebar';
import { ListView } from './ListView';
import { PostForm } from './PostForm';
import { PostView } from './PostView';
import '../css/App.css';

const App = () => (
  <div className="app" >
    <Sidebar/>

    <ListView />
    <PostForm />
    <PostView />
  </div>
);

export default App;
