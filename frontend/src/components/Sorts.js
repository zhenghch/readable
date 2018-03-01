import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import FaCaretUp from "react-icons/lib/fa/caret-up";
import FaCaretDown from 'react-icons/lib/fa/caret-down';

function SortBy(props){
  return (
    <div className="sort">
      {props.label}:
      &nbsp;
      <FaCaretUp onClick={props.onClickInc} />
      &nbsp;
      <FaCaretDown onClick={props.onClickDec} />
    </div>
  );
}

/**
 * @description click to switch sorts methods: timestamp, voteScore, either increase or decrease
 */
function Sorts(props){
  return (
    <div>
      <h2>Sorted by {props.sorts.by}: {props.sorts.how}</h2>

      <SortBy
        label="timestamp"
        onClickInc={() => props.dispatch(Actions.sortPosts({by: "timestamp", how:"increase"}))}
        onClickDec={() => props.dispatch(Actions.sortPosts({by:"timestamp", how:"decrease"}))}
        />

      <SortBy
        label="voteScore"
        onClickInc={() => props.dispatch(Actions.sortPosts({by: "voteScore", how:"increase"}))}
        onClickDec={() => props.dispatch(Actions.sortPosts({by:"voteScore", how:"decrease"}))}
        />
    </div>
  );
}
Sorts = connect(({sorts}) => ({sorts}))(Sorts);

export  {
  Sorts
};
