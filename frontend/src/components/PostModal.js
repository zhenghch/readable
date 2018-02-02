import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import Modal from 'react-modal';
import { v1 as uuid} from 'uuid';
import '../css/ModalView.css';

class PostModal extends Component{
  constructor(){
    super();

    this.state = {
      title: '',
      body: '',
      author: '',
      category: ''
    };

    this.closeModal = this.closeModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement('body');
  }

  componentWillReceiveProps(props){
    const {active, posts} = props;

    let post = {title: '', body:'', author:'', category: ''};
    if (active.id.length > 0){ // edit exist post
      post = posts[active.category][active.id];
      post = {title: post.title, body: post.body, author: post.author, category:post.category};
    }

    this.setState({
      ...post
    });
  }

  closeModal(){
    this.props.dispatch(Actions.activePost(false));
    this.props.dispatch(Actions.postModal(false));
  }
  resetState(event){
    event.preventDefault();

    let post = {title: '', body: '', author:'', cateogry:''};

    const {active, posts} = this.props;
    if (active.id.length > 0){
      post = posts[active.category][active.id];
      post = {title: post.title, body: post.title, author: post.author, category:post.category};
    }

    this.setState({
      ...post
    });
  }

  handleChange(event, field){
    event.preventDefault();

    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();

    const {title, body, author, category} = this.state;
    const {active, posts} = this.props;
    let post;

    if (active.id.length > 0){
      post = posts[active.category][active.id];
    }

    if (post === undefined){
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
      console.log(post.body, post.title);
      ReadAPI.editPost(post.id, post.body, post.title)
        .then(this.props.dispatch(Actions.editPost(post)));
    }

    this.closeModal();
  }

  render(){
    const {title, body, author, category} = this.state;
    const {active} = this.props;

    return (
      <Modal
        className='modal-form'
        isOpen={this.props.show}>

        <form onReset={this.resetState} onSubmit={this.handleSubmit}>
          author:
          <input type="text"
                 disabled={active.id.length>0 ? true : false}
                 required
                 value={author}
                 onChange={(event) => this.handleChange(event, 'author')}/>

          category:
          <select disabled={active.id.length>0 ? true: false}
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
          <textarea className="input"
                    required
                    value={body}
                    onChange={(event) => this.handleChange(event, 'body')}/>

        <input type="submit" value="submit"></input>
        <input type="reset" value="reset"></input>
        </form>

        <button onClick={this.closeModal}>close</button>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  show: state.postmodal,
  active: state.activepost,
  posts: state.posts,
  categories: state.categories
});
PostModal = connect(mapStateToProps)(PostModal);

export {
  PostModal
}
