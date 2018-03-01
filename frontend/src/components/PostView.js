import React, { Component } from 'react';
import { connect } from 'react-redux';
import { redirect } from 'redux-first-router';

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

/**
 * @description post detail view, list all comments of post; render at 'postdetail' page
 */
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

  // return to previous page
  close(){
    let prev = this.props.location.prev;
    let action;
    if ('category' in prev.payload){
      action = {type:'CATEGORY', payload: prev.payload};
    }else{
      action = redirect({type:'HOME'});
    }

    this.props.dispatch(action);
  }

  // render
  render (){
    if (!this.state.show){
      return <div/>;
    }

    const {posts} = this.props;
    const {category, id} = this.props.location.payload;


    if (!(category in posts && id in posts[category])){
      return <div />;
    }

    let post = posts[category][id];
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
