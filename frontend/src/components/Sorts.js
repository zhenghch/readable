import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';



function Sorts(props){
  return (
    <div>
      <h2>Sorted by</h2>

      <div className="sort">
        timestamp:
        &nbsp;
        <FaArrowUp onClick={() => props.dispatch(Actions.sortPosts({by: "timestamp", how:"increase"}))} />
        &nbsp;
        <FaArrowDown onClick={() => props.dispatch(Actions.sortPosts({by:"timestamp", how:"decrease"}))} />
      </div>

      <div className="sort">
        voteScore:
        &nbsp;
        <FaArrowUp onClick={() => props.dispatch(Actions.sortPosts({by: "voteScore", how:"increase"}))} />
        &nbsp;
        <FaArrowDown onClick={() => props.dispatch(Actions.sortPosts({by:"voteScore", how:"decrease"}))} />
      </div>
    </div>
  );
}
Sorts = connect()(Sorts);

export  {
  Sorts
};
