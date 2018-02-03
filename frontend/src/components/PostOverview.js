import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';

import { PostBar } from './PostBar';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';

import FaArrowDown from 'react-icons/lib/fa/hand-o-down';
import FaArrowUp from 'react-icons/lib/fa/hand-o-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';


function PostOverview(props){
  return (
    <div>
      <NavLink className="title"
               to={{type:'POSTDETAIL', payload:{category: props.post.category, id:props.post.id}}}
               >{props.post.title}</NavLink>
      <PostBar post={props.post}/>
    </div>

  );
}
PostOverview = connect(({comments}) => ({comments}))(PostOverview);


export {
  PostOverview
};
