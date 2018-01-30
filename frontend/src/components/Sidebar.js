import React, { Component } from 'react';
import { Categories } from './Categories';
import { Sorts } from './Sorts';
import '../css/Sidebar.css';

const Sidebar = (props) => (
  <div className="sidebar">
    <Categories />
    <Sorts />
  </div>
);

export {
  Sidebar
}
