import React, { Component } from 'react';
import { Sidebar } from './Sidebar';
import { ListView } from './ListView';
import { PostView } from './PostView';
import '../css/App.css';

const App = () => (
  <div className="app" >
    <Sidebar/>

    <ListView />
    {/*
    <PostView />
    */}
  </div>
);

export default App;
