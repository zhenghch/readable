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
    if (! this.props.postmode.view){
      return <div/>;
    }

    let post = this.props.postmode.post;
    let comments = this.props.comments[post.id] || {};

    return (
      <div className="postview">
        <Close
          className="close-post"
          onClick={() => Promise.all(this.props.dispatch(Actions.resetPostMode()), this.props.dispatch({type:'CATEGORIES', payload: {category: post.category}})).then(()=>{}, ()=>{})}
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

const mapStateToProps = ({postmode, comments}) => ({
  postmode,
  comments
});

PostView = connect(mapStateToProps)(PostView);

export {
  PostView
}

//function sortFunc(sorts){
//  const by = sorts.by || 'timestamp';
//  const how = sorts.how || 'decrease';

//                commentList.reduce((res, curr) => ({
//                  ...res,
//                  [curr.id]: curr
//                }), {}))
//              .then(comments => Promise.all(
//                props.dispatch(Actions.updateComments(props.post.id, comments)),
//                ReadAPI.delPost(props.post.id).then(props.dispatch(Actions.delPost(props.post)))).then(val => console.log(val), reason => {}));
//          }else{
//            ReadAPI.delPost(props.post.id).then(props.dispatch(Actions.delPost(props.post)));
//          }
//      }}/>
//      <div style={{color: "rgb(100,100,100)"}}><FaArrowUp onClick={() => ReadAPI.votePost(props.post.id,"upVote").then(props.dispatch(Actions.upVote(props.post)))}/>
//          {props.post.voteScore}
//          <FaArrowDown onClick={() => ReadAPI.votePost(props.post.id, "downVote").then(props.dispatch(Actions.downVote(props.post)))}/>
//            &nbsp; &nbsp; {props.post.commentCount} comments
//      </div>
//    </div>
//  );
//}
//PostBar = connect(({comments}) => ({comments}))(PostBar);
//
//function PostOverview(props){
//  return (
//    <div>
//      <a className="title" onClick={() => {
//          if (!(props.post.id in props.comments)){
//            ReadAPI.getComments(props.post.id)
//              .then(commentList =>
//                commentList.reduce((res, curr) => ({
//                  ...res,
//                  [curr.id]: curr
//                }), {})
//                   ).then(comments => props.dispatch(Actions.updateComments(props.post.id, comments)));
//          }
//        }}>{props.post.title}</a>
//      <PostBar post={props.post}/>
//    </div>
//
//  );
//}
//PostOverview = connect(({comments}) => ({comments}))(PostOverview);
//
//class PostsListView extends Component {
//  // get posts
//  componentDidMount(){
//    ReadAPI.getPosts()
//      .then(postLists => {
//        let posts = this.props.categories.reduce((res, curr)=>({...res, [curr.path]:{}}), {});
//        posts = postLists.reduce((res, curr) => ({
//          ...res,
//          [curr.category]: {
//            ...res[curr.category],
//            [curr.id]:curr
//          }
//        }), posts);
//        this.props.updatePosts(posts);
//      });
//  }
//
//  // render posts
//  render(){
//    let cate = this.props.payload.category || 'All';
//    let posts = this.props.posts;
//
//    // turn posts dict to posts list
//    let postLists = [];
//    if (cate === 'All'){
//      postLists = Object.keys(posts).reduce((res, cate) => res.concat(Object.keys(posts[cate]).map(id => posts[cate][id])), []);
//    }else{
//      postLists = Object.keys(posts[cate])
//                        .map(id => posts[cate][id]);
//    }
//
//    // sort posts
//    let cmp = sortFunc(this.props.sorts);
//
//    return (
//      <div className="list">
//        {
//          postLists.filter(post=> !post.deleted).sort(cmp).map(post => (
//            <PostOverview post={post} key={post.id}/>
//          ))
//        }
//      </div>
//    );
//  }
//}
//
//const mapStateToProps = ({categories, posts, sorts, location }) => ({
//  categories,
//  posts,
//  sorts,
//  payload: location.payload
//});
//
//const mapDispatchToProps = dispatch => ({
//  updatePosts: posts => dispatch(Actions.updateAllPosts(posts))
//});
//
//PostsListView = connect(mapStateToProps, mapDispatchToProps)(PostsListView);
//
//export {
//  PostsListView
//};
//
