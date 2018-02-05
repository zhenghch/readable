import React, { Component } from 'react';
import { connect } from 'react-redux';
import { redirect } from 'redux-first-router';
import { NavLink } from 'redux-first-router-link';
import Close from 'react-icons/lib/fa/arrow-left';

import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import { v1 as uuid} from 'uuid';

import '../css/PostForm.css';

/**
 * @description controlled form to add or edit comment, use 'commentnew' variable to decide add or edit. component will render only at 'commentnew' or 'commentedit' page
 */
class CommentForm extends Component{
  constructor(){
    super();

    this.state = {
      show: false,
      commentnew: true,
      body: '',
      author: ''
    };

    this.resetState = this.resetState.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @description function to decide whether component should render, at add or edit mode
   */
  storePropsToState(props){
    const {type, payload} = props.location;
    let comment, commentnew, show;

    if (type === 'COMMENTNEW'){
      comment = {body:'', author:''};
      commentnew = true;
      show=true;
    }else if (type === 'COMMENTEDIT'){
      console.log(props,props.comments, payload.id);
      comment = Object.keys(props.comments).length ? props.comments[payload.id][payload.commentId]: {body: '', author: ''};
      commentnew=false;
      show=true;
    }else{
      show=false;
    }

    this.setState({
      ...comment,
      show,
      commentnew
    });
  }

  componentWillReceiveProps(props){
    this.storePropsToState(props);
  }

  // undo change
  resetState(event){
    event.preventDefault();
    this.storePropsToState(this.props);
  }

  // hide this form and return to previous page or home page
  closeForm(){
    let prev = this.props.location.prev;
    let action;
    if (prev.type.length===0){ // to homepage if not prev history
      action = redirect({type: 'HOME'});
    }else{
      action = {type:prev.type, payload: prev.payload};
    }
    this.props.dispatch(action);
  }

  handleChange(event, field){
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  }

  // submit to server. 1) add new comment at add mode 2) confirm change at edit mode
  handleSubmit(event){
    event.preventDefault();

    let comment;
    const { commentnew } = this.state;
    const { payload } = this.props.location;
    const post = this.props.posts[payload.category][payload.id];

    if (commentnew){
      const {body, author} = this.state;
      comment = {
        body,
        author,
        parentId: post.id,
        id: uuid(),
        timestamp: Date.now(),
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      };

      ReadAPI.addComment(comment)
        .then(this.props.dispatch(Actions.addComment(comment, post)));

    }else{
      const { body, author, parentId, id, timestamp, voteScore, deleted, parentDeleted} = this.state;
      comment = {
        body,
        author,
        parentId,
        id,
        timestamp,
        voteScore,
        deleted,
        parentDeleted
      };

      ReadAPI.editComment(comment)
        .then(this.props.dispatch(Actions.editComment(comment)));
    }
    this.closeForm();
  }

  //
  render(){
    const {body, author, commentnew, show} = this.state;
    if (!show){
      return <div/>;
    }

    return (
      <form className="post-form" onReset={this.resetState} onSubmit={this.handleSubmit}>
        <Close className="close-post" onClick={this.closeForm}/>
        <br/>
        author:
        <input type="text"
               disabled={!commentnew}
               required
               value={author}
               onChange={(event) => this.handleChange(event, 'author')}/>
        <br/>body:<br/>
        <textarea className="post-input"
                  required
                  value={body}
                  onChange={(event) => this.handleChange(event, 'body')}/>

        <input type="submit" value="submit"></input>
        <input type="reset" value="reset"></input>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  comments: state.comments,
  categories: state.categories,
  location: state.location
});
CommentForm = connect(mapStateToProps)(CommentForm);

export {
  CommentForm
}
