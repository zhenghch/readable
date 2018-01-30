import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import '../css/Posts.css';

class PostsOverview extends Component {
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

    return (
      <div className="list">
        {
          postLists.map(post => (
            <div key={post.id}>
              <div className="title" >{post.title}</div>
              <div className="content">{post.body}</div>
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = ({categories, posts, location }) => ({
  categories,
  posts,
  payload: location.payload
});

const mapDispatchToProps = dispatch => ({
  updatePosts: posts => dispatch(Actions.updateAllPosts(posts))
});

PostsOverview = connect(mapStateToProps, mapDispatchToProps)(PostsOverview);

export {
  PostsOverview
};
