import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';
import Modal from 'react-modal';
import { v1 as uuid} from 'uuid';
import '../css/ModalView.css';

class CommentModal extends Component{
  constructor(){
    super();

    this.state = {
      isOpen: false,
      label: 'comment',
      post: {},
      comment: {body: '', author:''},
      newComment: true
    };

    this.resetState = this.resetState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentWillReceiveProps(props){
    const {isOpen, label, post} = props;
    let comment = {body: '', author:''},
        newComment = true;

    if (props.comment && Object.keys(props.comment).length>0){
      comment = props.comment;
      newComment = false;
    }

    this.setState({
      isOpen,
      label,
      post,
      comment,
      newComment
    });
  }

  resetState(event){
    event.preventDefault();
    let comment = {body: '', author:''},
        newComment = true;

    if (this.props.comment && Object.keys(this.props.comment).length>0){
      comment = this.props.comment;
      newComment = false;
    }

    this.setState({
      comment,
      newComment
    });

  }

  handleChange(event, field){
    this.setState({
      comment: {
        ...this.state.comment,
        [field]: event.target.value
      }
    });
  }

  handleSubmit(event){
    event.preventDefault();

    const {newComment, comment, post} = this.state;
    if (newComment){
      let comment_ = {
        ...comment,
        parentId:  post.id,
        id: uuid(),
        timestamp: Date.now(),
        voteScore: 1,
        deleted: false,
        parentDeleted: false
      };

      ReadAPI.addComment(comment_)
        .then(this.props.dispatch(Actions.addComment(comment_, post)));
    }else{
      let comment_ = {
        ...this.props.comment,
        body: comment.body
      };

      ReadAPI.editComment(comment_)
        .then(this.props.dispatch(Actions.editComment(comment_)));
    }
    this.closeModal();
  }


  closeModal(){
    this.setState({
      isOpen: false,
      label: '',
      post: {},
      comment: {},
      newComment: true
    });
  }

  render(){
    const {isOpen, label, post, comment, newComment} = this.state;
    let parentId = post.id;

    return (
      <Modal
        className='modal-form'
        isOpen={isOpen}
        contentLabel={label}
        >
        <form onReset={this.resetState} onSubmit={this.handleSubmit}>
          author:
          <input type="text"
                 disabled={newComment ? false : true}
                 required
                 value={comment.author}
                 onChange={(event) => this.handleChange(event, 'author')}/>

          <br/>body:<br/>
          <textarea className="modal-input"
                    required
                    value={comment.body}
                    onChange={(event) => this.handleChange(event, 'body')}/>

          <input type="submit" value="submit"/>
          <input type="reset" value="reset"/>
        </form>
        <button onClick={this.closeModal}>close</button>

      </Modal>
  );
  }
}

CommentModal = connect()(CommentModal);

export {
  CommentModal
}
