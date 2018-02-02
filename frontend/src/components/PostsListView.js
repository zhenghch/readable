import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostBar } from './PostBar';
import { PostModal } from './PostModal';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';

import FaArrowDown from 'react-icons/lib/fa/hand-o-down';
import FaArrowUp from 'react-icons/lib/fa/hand-o-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';

function sortFunc(sorts){
  const by = sorts.by || 'timestamp';
  const how = sorts.how || 'decrease';
  const cmp = how === 'decrease' ? (a, b) => b-a : (a,b) => a-b;

  return (a, b) => cmp(a[by], b[by]);
}

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

function PostsListView(props){
  // render posts
  render(){
    let cate = this.props.payload.category || 'All';
    let posts = this.props.posts;

    // empty posts
    if (! Object.keys(posts).length){
      return <div className="list"/>;
    }

    // turn posts dict to posts list
    let postLists = [];
    if (cate === 'All'){
      postLists = Object.keys(posts).reduce((res, cate) => res.concat(Object.keys(posts[cate]).map(id => posts[cate][id])), []);
    }else{
      console.log(posts);
      postLists = Object.keys(posts[cate])
                        .map(id => posts[cate][id]);
    }

    // sort posts
    let cmp = sortFunc(this.props.sorts);

    return (
      <div className="list">
        {
          postLists.filter(post=> !post.deleted).sort(cmp).map(post => (
            <PostOverview post={post} key={post.id}/>
          ))
      }
      <PostModal />
      </div>
    );
  }
}

const mapStateToProps = ({categories, posts, sorts, location }) => ({
  posts,
  sorts,
  payload: location.payload
});

PostsListView = connect(mapStateToProps)(PostsListView);

export {
  PostsListView
};
