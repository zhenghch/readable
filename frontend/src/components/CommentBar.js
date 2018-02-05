import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import * as ReadAPI from '../utils/api';

import FaArrowDown from 'react-icons/lib/fa/hand-o-down';
import FaArrowUp from 'react-icons/lib/fa/hand-o-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';

/**
 * @description meta info of comment: author, time of creation, votescore; andf aslo link to edit, delete and up/down vote
 */
function CommentBar(props){
  return (
    <div style={{color: "blue"}}>
      {props.comment.author} @ {(new Date(props.comment.timestamp)).toDateString()}
      &nbsp; &nbsp;
      <Edit style={{color: "white"}} onClick={() => props.dispatch({type: 'COMMENTEDIT', payload:{category:props.post.category, id:props.post.id, commentId: props.comment.id}}) }/>

      &nbsp; &nbsp;
      <Bomb style={{color: "red"}} onClick={() => props.dispatch({type: 'COMMENTDELETE', payload:{category:props.post.category, id:props.post.id, commentId: props.comment.id}})} />

      <div style={{color: "rgb(255,255,255)"}}>
        <FaArrowUp onClick={() => ReadAPI.voteComment(props.comment.id,"upVote").then(props.dispatch(Actions.upVoteComment(props.comment)))}/>
        {props.comment.voteScore}
        <FaArrowDown onClick={() => ReadAPI.voteComment(props.comment.id, "downVote").then(props.dispatch(Actions.downVoteComment(props.comment)))}/>
      </div>
    </div>
  );
}
CommentBar = connect()(CommentBar);

export {
  CommentBar
};
