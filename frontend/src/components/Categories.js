import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Actions from '../actions';
import * as ReadAPI from '../utils/api.js';


class Categories extends Component{
  componentDidMount(){
    ReadAPI.getCategories()
      .then(cate => this.props.updateCategories(cate));
  }

  render(){
    return(
      <div>
        {
          this.props.categories.map(cate => (
            <div>
              <Link to={`/${cate.path}`}
                    key={cate.name}
                    style={{display: "block", width:"50px", height:"50px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}
                    >{cate.name}</Link>
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = ({categories, category }) => ({
    categories,
    category
});


const mapDispatchToProps = dispatch => ({
    updateCategories: categories => dispatch(Actions.listCategory(categories))
});


Categories = connect(mapStateToProps, mapDispatchToProps)(Categories);

export  {
  Categories
};
