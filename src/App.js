import React, { Component } from 'react';
import './App.css';
import SimpleMap from './Components/Map'
import List from './Components/List'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SimpleMap />
        <List />
      </div>
    );
  }
}

export default App;
