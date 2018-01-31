import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import FaCaretUp from "react-icons/lib/fa/caret-up";
import FaCaretDown from 'react-icons/lib/fa/caret-down';

function Sorts(props){
  return (
    <div>
      <h2>Sorted by</h2>

      <div className="sort">
        timestamp:
        &nbsp;
        <FaCaretUp onClick={() => props.dispatch(Actions.sortPosts({by: "timestamp", how:"increase"}))} />
        &nbsp;
        <FaCaretDown onClick={() => props.dispatch(Actions.sortPosts({by:"timestamp", how:"decrease"}))} />
      </div>

      <div className="sort">
        voteScore:
        &nbsp;
        <FaCaretUp onClick={() => props.dispatch(Actions.sortPosts({by: "voteScore", how:"increase"}))} />
        &nbsp;
        <FaCaretDown onClick={() => props.dispatch(Actions.sortPosts({by:"voteScore", how:"decrease"}))} />
      </div>
    </div>
  );
}
Sorts = connect()(Sorts);

export  {
  Sorts
};
