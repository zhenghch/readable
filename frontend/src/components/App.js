import React, { Component } from 'react';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import { PostView } from './PostView';
import '../css/App.css';

const App = () => (
  <div className="app" >
    <Sidebar/>

    <MainView />
    {/*
    <PostView />
    */}
  </div>
);

export default App;
