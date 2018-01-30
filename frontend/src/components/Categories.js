import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link, { NavLink} from 'redux-first-router-link';
import Actions from '../actions';
import * as ReadAPI from '../utils/api';

class Categories extends Component{
  // get categories
  componentDidMount(){
    ReadAPI.getCategories()
      .then(cate => this.props.updateCategories(cate));
  }

  // render categories
  render(){
    return(
      <div>
        <h2>Categories</h2>

        <Link to='/'>
          All
        </Link>

        {
          this.props.categories.map(cate => (
            <NavLink
              to={{ type: 'CATEGORIES', payload:{category: cate.path}}}
              key={cate.name}
              >{cate.name}</NavLink>
          ))
        }
      </div>
    );
  }
}


const mapStateToProps = ({categories, location }) => ({
  categories: categories || [],
  path: location.pathname
});

const mapDispatchToProps = dispatch => ({
    updateCategories: categories => dispatch(Actions.listCategory(categories))
});


Categories = connect(mapStateToProps, mapDispatchToProps)(Categories);
export  {
  Categories
};
