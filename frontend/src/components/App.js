import React, { Component } from 'react';
import { Sidebar } from './Sidebar';
import { MainView } from './MainView';
import '../css/App.css';

const App = () => (
  <div className="app" >
    <Sidebar/>
    <MainView />
  </div>
);

export default App;
