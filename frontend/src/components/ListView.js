import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostOverview } from './PostOverview';

import '../css/ListView.css';

/**
 * @description helper function, to return sort function
 */
function sortFunc(sorts){
  const by = sorts.by || 'timestamp';
  const how = sorts.how || 'decrease';
  const cmp = how === 'decrease' ? (a, b) => b-a : (a,b) => a-b;

  return (a, b) => cmp(a[by], b[by]);
}


/**
 * @description display all posts or a spcific category view; render this component when at 'home' or 'category' pages
 */
function ListView(props){
  const {type, payload} = props.location;
  let posts = props.posts;
  let cate = payload.category || 'HOME';

  // not at home, cateogry pages
  if ((type !== 'HOME' && type !== 'CATEGORY') || Object.keys(posts).length===0){
    return <div />;
  }


  // turn posts dict to posts list
  let postLists = [];
  if (cate === 'HOME'){
    postLists = Object.keys(posts).reduce((res, cate) => res.concat(Object.keys(posts[cate]).map(id => posts[cate][id])), []);
  }else{
    postLists = Object.keys(posts[cate])
      .map(id => posts[cate][id]);
  }

  // sort posts
  let cmp = sortFunc(props.sorts);

  // render
  return (
    <div className="list">
      {
        postLists.filter(post=> !post.deleted).sort(cmp).map(post => (
          <PostOverview post={post} key={post.id}/>
        ))
      }
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
