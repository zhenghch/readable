import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostOverview } from './PostOverview';
import { PostModal } from './PostModal';

import '../css/ListView.css';


function sortFunc(sorts){
  const by = sorts.by || 'timestamp';
  const how = sorts.how || 'decrease';
  const cmp = how === 'decrease' ? (a, b) => b-a : (a,b) => a-b;

  return (a, b) => cmp(a[by], b[by]);
}

//
function ListView(props){
  // render posts
  let cate = props.payload.category || 'All';
  let posts = props.posts;

  // empty posts or non-exist categories
  if (! ((Object.keys(posts).length) && (cate ==='All' || cate in posts))){
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
  let cmp = sortFunc(props.sorts);

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

const mapStateToProps = ({posts, sorts, location }) => ({
  posts,
  sorts,
  payload: location.payload
});

ListView = connect(mapStateToProps)(ListView);

export {
  ListView
}
