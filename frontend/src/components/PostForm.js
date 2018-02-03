import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import Close from 'react-icons/lib/fa/arrow-left';

import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import { v1 as uuid} from 'uuid';

import '../css/PostForm.css';

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

  storePropsToState(props){
    const {type, payload} = props.location;
    let post, postnew, show;

    if (type === 'POSTNEW'){
      post = {title: '', body:'', author:'', category: ''};
      postnew = true;
      show=true;
    }else if (type === 'POSTEDIT'){
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

  resetState(event){
    event.preventDefault();
    this.storePropsToState(this.props);
  }

  closeForm(){
    let prev = this.props.location.prev;
    if (prev.type.length===0){ // to homepage if not prev history
      prev.type = 'HOME';
    }

    this.props.dispatch({type:prev.type, payload: prev.payload});
  }

  handleChange(event, field){
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();

    const {title, body, author, category, postnew} = this.state;

    let post;

    if (postnew){
      post = {
        ...this.state,
        id: uuid(),
        timestamp: Date.now(),
        voteScore: 1,
        deleted: false,
        commentCount: 0
      };

      ReadAPI.addPost(post)
        .then(this.props.dispatch(Actions.addPost(post)));

    }else{
      post = {
        ...post,
        ...this.state
      };

      ReadAPI.editPost(post.id, post.body, post.title)
        .then(this.props.dispatch(Actions.editPost(post)));
    }
    this.closeForm();
  }

  render(){
    const {title, body, author, category, postnew, show} = this.state;
    if (!show){
      return <div/>;
    }

    return (
        <form className="post-form" onReset={this.resetState} onSubmit={this.handleSubmit}>
          <Close className="close-post"  onClick={this.closeForm}>
          </Close>
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
