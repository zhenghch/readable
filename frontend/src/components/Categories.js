import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';
import * as ReadAPI from '../utils/api.js';


class Categories extends Component{
  componentDidMount(){
    ReadAPI.getCategories()
      .then(cate => this.props.dispatch(Actions.listCategory(cate)));
  }

  render(){
    return(
      <div>
        {
          this.props.categories.map(cate => (
            <button type="button" key={cate.name} >{cate.name}</button>
          ))
        }

      </div>
    );
  }
}

function mapStateToProps({ categories }){
  return {
    categories
  };
}


Categories = connect(mapStateToProps)(Categories);

export  {
  Categories
};
