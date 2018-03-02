import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';

import { PostBar } from './PostBar';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';

/**
 * @description overview of post, including: title, author, time of creation, votescore; andf aslo reply, edit, del button
 */
function PostOverview(props){
  return (
    <div>
      <NavLink className="title"
               to={Actions.postDetailRoute({category: props.post.category, id:props.post.id})}
               >{props.post.title}</NavLink>
      <PostBar post={props.post}/>
    </div>

  );
}
PostOverview = connect()(PostOverview);

export {
  PostOverview
};
