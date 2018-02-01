import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import Bomb from 'react-icons/lib/fa/bomb';
import Edit from 'react-icons/lib/fa/edit';

function sortFunc(sorts){
  const by = sorts.by || 'timestamp';
  const how = sorts.how || 'decrease';
  const cmp = how === 'decrease' ? (a, b) => b-a : (a,b) => a-b;

  return (a, b) => cmp(a[by], b[by]);
}


function PostBar(props){
  return (
    <div style={{color: "blue"}}>
      {props.post.author} @ {(new Date(props.post.timestamp)).toDateString()}
      &nbsp; &nbsp;
      <Edit style={{color: "white"}} onClick={() => props.dispatch(Actions.setEditMode(props.post))}/>
      &nbsp; &nbsp;
      <Bomb style={{color: "red"}} onClick={() => {
          if (!(props.post.id in props.comments)){
            ReadAPI.getComments(props.post.id)
              .then(commentList =>
                commentList.reduce((res, curr) => ({
                  ...res,
                  [curr.id]: curr
                }), {}))
              .then(comments => Promise.all(
                props.dispatch(Actions.updateComments(props.post.id, comments)),
                ReadAPI.delPost(props.post.id).then(props.dispatch(Actions.delPost(props.post)))).then(val => console.log(val), reason => {}));
          }else{
            ReadAPI.delPost(props.post.id).then(props.dispatch(Actions.delPost(props.post)));
          }
      }}/>
      <div style={{color: "rgb(100,100,100)"}}><FaArrowUp onClick={() => ReadAPI.votePost(props.post.id,"upVote").then(props.dispatch(Actions.upVote(props.post)))}/>
          {props.post.voteScore}
          <FaArrowDown onClick={() => ReadAPI.votePost(props.post.id, "downVote").then(props.dispatch(Actions.downVote(props.post)))}/>
            &nbsp; &nbsp; {props.post.commentCount} comments
      </div>
    </div>
  );
}
PostBar = connect(({comments}) => ({comments}))(PostBar);

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
                   ).then(comments => props.dispatch(Actions.updateComments(props.post.id, comments)));
          }
        }}>{props.post.title}</a>
      <PostBar post={props.post}/>
    </div>

  );
}
PostOverview = connect(({comments}) => ({comments}))(PostOverview);

class PostsListView extends Component {
  // get posts
  componentDidMount(){
    ReadAPI.getPosts()
      .then(postLists => {
        let posts = this.props.categories.reduce((res, curr)=>({...res, [curr.path]:{}}), {});
        posts = postLists.reduce((res, curr) => ({
          ...res,
          [curr.category]: {
            ...res[curr.category],
            [curr.id]:curr
          }
        }), posts);
        this.props.updatePosts(posts);
      });
  }

  // render posts
  render(){
    let cate = this.props.payload.category || 'All';
    let posts = this.props.posts;

    // turn posts dict to posts list
    let postLists = [];
    if (cate === 'All'){
      postLists = Object.keys(posts).reduce((res, cate) => res.concat(Object.keys(posts[cate]).map(id => posts[cate][id])), []);
    }else{
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
      </div>
    );
  }
}

const mapStateToProps = ({categories, posts, sorts, location }) => ({
  categories,
  posts,
  sorts,
  payload: location.payload
});

const mapDispatchToProps = dispatch => ({
  updatePosts: posts => dispatch(Actions.updateAllPosts(posts))
});

PostsListView = connect(mapStateToProps, mapDispatchToProps)(PostsListView);

export {
  PostsListView
};
