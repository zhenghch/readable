import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      <a className="title" onClick={() => {
          if (!(props.post.id in props.comments)){
            ReadAPI.getComments(props.post.id)
              .then(commentList =>
                commentList.reduce((res, curr) => ({
                  ...res,
                  [curr.id]: curr
                }), {})
                   ).then(comments => Promise.all(
                     props.dispatch(Actions.updateComments(props.post.id, comments))),
                     props.dispatch(Actions.activePost(true, props.post)),
                     props.dispatch(Actions.detailMode(true),)
                   ).then(val => {}, reason => {});
          }else{
            Promise.all(
              props.dispatch(Actions.activePost(true, props.post)),
              props.dispatch(Actions.detailMode(true),)
            ).then(val => {}, reason => {});
          }
        }}>{props.post.title}</a>
      <PostBar post={props.post}/>
    </div>

  );
}
PostOverview = connect(({comments}) => ({comments}))(PostOverview);


export {
  PostOverview
};
