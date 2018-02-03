import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import { PostBar } from './PostBar';
import { CommentModal } from './CommentModal';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';

import Close from 'react-icons/lib/fa/arrow-left';
import FaArrowDown from 'react-icons/lib/fa/hand-o-down';
import FaArrowUp from 'react-icons/lib/fa/hand-o-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';
import Reply from 'react-icons/lib/fa/mail-reply';


import '../css/PostView.css';

function CommentBar(props){
  return (
    <div style={{color: "blue"}}>
      {props.comment.author} @ {(new Date(props.comment.timestamp)).toDateString()}
      <div style={{color: "rgb(255,255,255)"}}>
        <FaArrowUp onClick={() => ReadAPI.voteComment(props.comment.id,"upVote").then(props.dispatch(Actions.upVoteComment(props.comment)))}/>
      {props.comment.voteScore}
        <FaArrowDown onClick={() => ReadAPI.voteComment(props.comment.id, "downVote").thennnn(props.dispatch(Actions.downVoteComment(props.comment)))}/>
      </div>
    </div>

  );
}
CommentBar = connect()(CommentBar);

class PostView extends Component{
  constructor(){
    super();

    this.state = {
      show: false,
      showModal: false
    };

    this.close = this.close.bind(this);

  }

  componentWillReceiveProps(props){
    const type = props.location.type;
    let show;

    if (type === 'POSTDETAIL'){
      show=true;
    }else{
      show=false;
    }

    this.setState({
      show
    });
  }

  close(){
    let prev = this.props.location.prev;
    if (prev.type.length===0){ // to homepage if not prev history
      prev.type = 'HOME';
    }

    this.props.dispatch({type:prev.type, payload: prev.payload});
  }

  render (){
    if (!this.state.show){
      return <div/>;
    }

    const {category, id} = this.props.location.payload;

    let post = this.props.posts[category][id];
    let comments = this.props.comments[id] || {};

    return (
      <div className="postview">
        <Close
          className="close-post"
          onClick={this.close}
          >Close</Close>

        <p className="post-title">{post.title}</p>
        <p className="post-content">{post.body}</p>
        <PostBar post={post}/>
        <Reply onClick={()=>this.setState({showModal:true, label:`reply to ${post.title}`})}/>

        <div >
          {
            Object.keys(comments).filter(id => !comments[id].deleted).map(id => comments[id]).map(comment => (
              <div className="comment-list" key={comment.id}>
                <p>{comment.body}</p>
                <CommentBar comment={comment}/>
                <Edit onClick={()=>this.setState({showModal:true, label:'edit comment', comment:comment})}/>
                  <Bomb onClick={()=>this.props.dispatch(Actions.delComment(comment, post))}/>
              </div>
            ))
          }
        </div>
        <CommentModal isOpen={this.state.showModal} label={this.state.label} post={post} comment={this.state.comment}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  location: state.location,
  posts: state.posts
});

PostView = connect(mapStateToProps)(PostView);

export {
  PostView
}
