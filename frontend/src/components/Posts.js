import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostsOverview extends Component {
  render(){
    let cate = this.props.payload.category || 'home';
    return (
      <h1>{cate}</h1>
    );
  }
}

const mapStateToProps = ({categories, location }) => ({
  payload: location.payload
});

PostsOverview = connect(mapStateToProps)(PostsOverview);

export {
  PostsOverview
};
