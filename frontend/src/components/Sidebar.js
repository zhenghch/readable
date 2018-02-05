import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';

import { Categories } from './Categories';
import { Sorts } from './Sorts';

import '../css/Sidebar.css';

/**
 * @description navigate to new post
 */
function NewPost(props){
  return (
    <NavLink
      to={{type: 'POSTNEW'}}
      style={{color:'rgb(0,255,255)'}}
      >Click to post</NavLink>
  );
}
NewPost = connect()(NewPost);


/**
 * @description side bar component, including: categories list, sort methods, and new post
 */
const Sidebar = (props) => (
  <div className="sidebar">
    <Categories />
    <Sorts />

    <br/>
    <NewPost />
  </div>
);

export {
  Sidebar
}
