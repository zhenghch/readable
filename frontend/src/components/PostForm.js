import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import { v1 as uuid} from 'uuid';

class PostForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      title: props.title || '',
      body: props.body || '',
      author: props.author || '',
      category: props.category || '',

      type: props.type || Actions.NEW_POST
    };

    this.resetState = this.resetState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState(event){
    event.preventDefault();

    this.setState({
      title: this.props.title || '',
      body: this.props.body || '',
      author: this.props.author || '',
      category: this.props.category || ''
    });
  }

  handleSubmit(event){
    event.preventDefault();

    switch(this.state.type){
    case Actions.NEW_POST:
      let post = {
        id: uuid(),
        timestamp: Date.now(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category
      };


      ReadAPI.addPost(post)
        .then(this.props.dispatch(Actions.addPost(post))
              && this.props.dispatch({type: 'CATEGORIES', payload: {category: post.category}}));

    }
  }

  render(){
    return (
      <form className="mainform" onReset={this.resetState} onSubmit={this.handleSubmit}>
        author:<input type="text"
                      disabled={this.props.author ? true : false}
                      required
                      value={this.state.author}
                      onChange={(event) => this.setState({author: event.target.value})}
                      />

        category:
        <select value={this.state.category} required onChange={(event)=>this.setState({category:event.target.value})} disabled={this.props.category ? true : false}>
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
                     value={this.state.title}
                     onChange={(event)=>this.setState({title: event.target.value})}
                     />
         <br/>body:<br/><textarea className="input"
                                  required
                                  value={this.state.body}
                                  onChange={(event) => this.setState({body: event.target.value})}
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
