import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';

import { Sidebar } from './Sidebar';
import { ListView } from './ListView';
import { PostForm } from './PostForm';
import { PostView } from './PostView';
import { CommentForm } from './CommentForm';
import { NotFound } from './NotFound';

import '../css/App.css';

function App({location}){
  if (location.type !== NOT_FOUND){
    return(
      <div className="app" >
        <Sidebar/>
        <ListView />
        <PostForm />
        <PostView />
        <CommentForm/>
      </div>
    );
  }else{
    return(
      <div>
        <NotFound />
      </div>
    );
  }
};

App = connect(({location}) => ({location}))(App);

export default App;
