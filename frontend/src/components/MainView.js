import React, { Component } from 'react';
import { PostsListView } from './PostsListView';
import { PostForm } from './PostForm';
import '../css/MainView.css';

const MainView = (props) => (
  <div className="mainview">
    <PostsListView />

    <PostForm />
  </div>
);

export {
  MainView
}
