import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import { v1 as uuid} from 'uuid';

class PostForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      post: props.post || {title: '', body: '', author: '', category: ''},
      type: props.post ? Actions.EDIT_POST : Actions.NEW_POST
    };

    this.resetState = this.resetState.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState(event){
    event.preventDefault();

    this.setState({
      post: this.props.post || {title: '', body: '', author: '', category: ''}
    });
  }

  clearAll(){
    this.setState({
      post: {title: '', body: '', author: '', category: ''}
    });
  }

  handleChange(event, field){
    this.setState({
      post: {
        ...this.state.post,
        [field]: event.target.value
      }
    });
  }

  handleSubmit(event){
    event.preventDefault();

    switch(this.state.type){
    case Actions.NEW_POST:
      let post = {
        ...this.state.post,
        id: uuid(),
        timestamp: Date.now(),
        //supp info
        voteScore: 1,
        deleted: false,
        commentCount: 0
      };
      ReadAPI.addPost(post)
        .then(this.props.dispatch(Actions.addPost(post))
              && this.props.dispatch({type: 'CATEGORIES', payload: {category: post.category}})).then(this.clearAll());
    }
  }

  render(){
    return (
      <form className="mainform" onReset={this.resetState} onSubmit={this.handleSubmit}>
        author:<input type="text"
                      disabled={this.props.post ? true : false}
                      required
                      value={this.state.post.author}
                      onChange={(event) => this.handleChange(event, 'author')}
                      />

        category:
          <select value={this.state.post.category} required onChange={(event)=>this.handleChange(event, 'category')} disabled={this.props.post ? true : false}>
          <option value="" >Post to...</option>
        {
          this.props.categories.map(
            cate => (
              <option value={cate.path} key={cate.name} >{cate.path}</option>
            ))
        }
        </select>

        <br/>
        title:<input type="text"
                     required
                     value={this.state.post.title}
                     onChange={(event)=>this.handleChange(event, 'title')}
                     />
         <br/>body:<br/><textarea className="input"
                                  required
                                  value={this.state.post.body}
                                  onChange={(event) => this.handleChange(event, 'body')}
                                  />
        <br/><br/>
        <input type="submit" value="submit"></input>
        <input type="reset" value="reset"></input>
      </form>
    );
  }
}

const mapStateToProps = ({categories}) => ({
  categories
});

PostForm = connect(mapStateToProps)(PostForm);

export {
  PostForm
}
