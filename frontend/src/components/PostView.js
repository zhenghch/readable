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
        <FaArrowDown onClick={() => ReadAPI.voteComment(props.comment.id, "downVote").then(props.dispatch(Actions.downVoteComment(props.comment)))}/>
      </div>
    </div>

  );
}
CommentBar = connect()(CommentBar);

class PostView extends Component{
  constructor(){
    super();

    this.state = {
      showModal: false,
      label: '',
      comment: {}
    };
  }

  render (){
    const {active} = this.props;
    if (! (this.props.show && active.id.length>0)){
      return <div/>;
    }


    let post = this.props.posts[active.category][active.id];
    let comments = this.props.comments[post.id] || {};

    return (
      <div className="postview">
        <Close
          className="close-post"
          onClick={() => Promise.all(this.props.dispatch(Actions.detailMode(false)), this.props.dispatch(Actions.activePost(false))).then(()=>{}, ()=>{})}
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
  show: state.detailmode,
  active: state.activepost,
  comments: state.comments,
  posts: state.posts
});

PostView = connect(mapStateToProps)(PostView);

export {
  PostView
}
