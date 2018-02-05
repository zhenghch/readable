import React, { Component } from 'react';
import { connect } from 'react-redux';

import Actions from '../actions';
import * as ReadAPI from '../utils/api';

import FaArrowDown from 'react-icons/lib/fa/hand-o-down';
import FaArrowUp from 'react-icons/lib/fa/hand-o-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';
import Reply from 'react-icons/lib/fa/mail-reply';

/**
 * @description meta info of post: author, time of creation, votescore; andf aslo link to reply, edit, delete and up/down vote
 */
function PostBar(props){
  return (
    <div style={{color: "blue"}}>
      {props.post.author} @ {(new Date(props.post.timestamp)).toDateString()}
      &nbsp; &nbsp;
      <Reply style={{color: 'rgb(0,255,255)'}} onClick={()=>props.dispatch({type:'COMMENTNEW', payload:{category: props.post.category, id: props.post.id}})}/>

      &nbsp; &nbsp;
      <Edit style={{color: "white"}} onClick={() => props.dispatch({type: 'POSTEDIT', payload:{category:props.post.category, id:props.post.id}}) }/>

      &nbsp; &nbsp;
      <Bomb style={{color: "red"}} onClick={() => props.dispatch({type: 'POSTDELETE', payload:{category:props.post.category, id:props.post.id}})} />

      <div style={{color: "rgb(255,255,255)"}}>
        <FaArrowUp onClick={() => ReadAPI.votePost(props.post.id,"upVote").then(props.dispatch(Actions.upVote(props.post)))}/>
        {props.post.voteScore}
        <FaArrowDown onClick={() => ReadAPI.votePost(props.post.id, "downVote").then(props.dispatch(Actions.downVote(props.post)))}/>
        &nbsp; &nbsp; {props.post.commentCount} comments
      </div>
    </div>
  );
}
PostBar = connect()(PostBar);

export {
  PostBar
};
