import React, { Component } from 'react';
import { PostsListView } from './PostsListView';
import '../css/MainView.css';

const MainView = (props) => (
  <div className="mainview">
    <PostsListView />
  </div>
);

export {
  MainView
}
