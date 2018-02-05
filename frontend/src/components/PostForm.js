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
 * @description controlled form to add or edit post, use 'postnew' variable to decide add or edit. component will render only at 'postnew' or 'postedit' page
 */
class PostForm extends Component{
  constructor(){
    super();

    this.state = {
      show: false,
      postnew: true,
      title: '',
      body: '',
      author: '',
      category: ''
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
    let post, postnew, show;

    if (type === 'POSTNEW'){
      post = {title: '', body:'', author:'', category: ''};
      postnew = true;
      show=true;
    }else if (type === 'POSTEDIT'){
      // copy existing data
      post = Object.keys(props.posts).length ? props.posts[payload.category][payload.id]: {title: '', body:'', author:'', category: ''};
      postnew=false;
      show=true;
    }else{
      show=false;
    }

    this.setState({
      ...post,
      show,
      postnew
    });
  }

  componentWillReceiveProps(props){
    this.storePropsToState(props);
  }

  // undo change: 1) clear all content at add mode, 2) restore to original post
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

  // handle change of form
  handleChange(event, field){
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  }

  // submit to server. 1) add new post at add mode 2) confirm change at edit mode
  handleSubmit(event){
    event.preventDefault();

    let post;
    const { postnew } = this.state;

    if (postnew){
      const {title, body, author, category} = this.state;
      post = {
        title,
        body,
        author,
        category,
        id: uuid(),
        timestamp: Date.now(),
        voteScore: 1,
        deleted: false,
        commentCount: 0
      };

      ReadAPI.addPost(post)
        .then(this.props.dispatch(Actions.addPost(post)));

    }else{
      const { title, body, author, category, id, timestamp, voteScore, deleted, commentCount} = this.state;
      post = {
        title,
        body,
        author,
        category,
        id,
        timestamp,
        voteScore,
        deleted,
        commentCount
      };

      ReadAPI.editPost(post.id, post.body, post.title)
        .then(this.props.dispatch(Actions.editPost(post)));
    }
    this.closeForm();
  }

  // render
  render(){
    const {title, body, author, category, postnew, show} = this.state;
    if (!show){
      return <div/>;
    }

    return (
        <form className="post-form" onReset={this.resetState} onSubmit={this.handleSubmit}>
          <Close className="close-post"  onClick={this.closeForm} />

          <br/>
          author:
          <input type="text"
                 disabled={!postnew}
                 required
                 value={author}
                 onChange={(event) => this.handleChange(event, 'author')}/>
            &nbsp;
          category:
          <select disabled={!postnew}
                  required
                  value={category}
                  onChange={(event) => this.handleChange(event, 'category')}>
            <option value="" >Post nto...</option>
            {
              this.props.categories.map(
                cate => (
                  <option value={cate.path} key={cate.name} >{cate.path}</option>
                ))
            }
          </select>

          <br/>
          title:
          <input type="text"
                 required
                 value={title}
                 onChange={(event)=>this.handleChange(event, 'title')}/>

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
  categories: state.categories,
  location: state.location
});
PostForm = connect(mapStateToProps)(PostForm);

export {
  PostForm
}
