import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link, { NavLink} from 'redux-first-router-link';

/**
 * @description component to list all categories, each link to a category view
 */
function Categories(props){
  return(
    <div>
      <h2>Categories</h2>

      <Link to='/'>
        HOME
      </Link>

      {
        props.categories.map(cate => (
          <NavLink
            to={{ type: 'CATEGORY', payload:{category: cate.path}}}
            key={cate.name}
            >{cate.name}</NavLink>
        ))
      }
      </div>
  );
}

const mapStateToProps = ({categories, location }) => ({
  categories,
  path: location.pathname
});

Categories = connect(mapStateToProps)(Categories);
export  {
  Categories
};
