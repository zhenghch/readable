import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import FaArrowDown from 'react-icons/lib/fa/hand-o-down';
import FaArrowUp from 'react-icons/lib/fa/hand-o-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';

function PostBar(props){
  return (
    <div style={{color: "blue"}}>
      {props.post.author} @ {(new Date(props.post.timestamp)).toDateString()}
      &nbsp; &nbsp;
      <Edit style={{color: "white"}} onClick={() => props.dispatch(Actions.setEditMode(props.post))}/>
      &nbsp; &nbsp;
      <Bomb style={{color: "red"}} onClick={() => {
          if (!(props.post.id in props.comments)){
            ReadAPI.getComments(props.post.id)
              .then(commentList =>
                commentList.reduce((res, curr) => ({
                  ...res,
                  [curr.id]: curr
                }), {}))
              .then(comments => Promise.all(
                props.dispatch(Actions.updateComments(props.post.id, comments)),
                ReadAPI.delPost(props.post.id).then(props.dispatch(Actions.delPost(props.post)))).then(val => {}, reason => {}));
          }else{
            ReadAPI.delPost(props.post.id).then(props.dispatch(Actions.delPost(props.post)));
          }
      }}/>
      <div style={{color: "rgb(255,255,255)"}}><FaArrowUp onClick={() => ReadAPI.votePost(props.post.id,"upVote").then(props.dispatch(Actions.upVote(props.post)))}/>
          {props.post.voteScore}
          <FaArrowDown onClick={() => ReadAPI.votePost(props.post.id, "downVote").then(props.dispatch(Actions.downVote(props.post)))}/>
            &nbsp; &nbsp; {props.post.commentCount} comments
      </div>
    </div>
  );
}
PostBar = connect(({comments}) => ({comments}))(PostBar);

export {
  PostBar
};
