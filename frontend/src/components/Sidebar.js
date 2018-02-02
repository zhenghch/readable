import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import { Categories } from './Categories';
import { Sorts } from './Sorts';

import '../css/Sidebar.css';

function NewPost(props){
  return (
    <button style={{background:"black", color:"white"}} onClick={()=>props.dispatch(Actions.postModal(true))}>Click to post</button>
  );
}
NewPost = connect()(NewPost);

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
