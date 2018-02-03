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
  // post list view
  const {type, payload} = props.location;

  if (type !== 'HOME' && type !== 'CATEGORY'){
    return <div className="list"/>;
  }

  //
  let cate = payload.category || 'HOME';
  let posts = props.posts;

  // turn posts dict to posts list
  let postLists = [];
  if (cate === 'HOME'){
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
  location
});

ListView = connect(mapStateToProps)(ListView);

export {
  ListView
}
