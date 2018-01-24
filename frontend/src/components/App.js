import React, { Component } from 'react';
import { Categories } from './Categories';
import { PostsOverview } from './Posts';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Categories />
        <PostsOverview />
      </div>
    );
  }
}

export default App;
