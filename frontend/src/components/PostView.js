import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostBar } from './PostBar';
import { CommentBar } from './CommentBar';

import Actions from '../actions';
import * as ReadAPI from '../utils/api';

import Close from 'react-icons/lib/fa/arrow-left';
import FaArrowDown from 'react-icons/lib/fa/hand-o-down';
import FaArrowUp from 'react-icons/lib/fa/hand-o-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';
import Reply from 'react-icons/lib/fa/mail-reply';

import '../css/PostView.css';


class PostView extends Component{
  constructor(){
    super();

    this.state = {
      show: false
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

    this.props.dispatch({type:'CATEGORY', payload: prev.payload});
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
        <div >
          {
            Object.keys(comments).filter(id => !comments[id].deleted).map(id => comments[id]).map(comment => (
              <div className="comment-list" key={comment.id}>
                <p>{comment.body}</p>
                <CommentBar comment={comment} post={post}/>
              </div>
            ))
          }
        </div>

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
