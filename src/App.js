import React, { Component } from 'react';
import './App.css';
import AppProvider from './AppProvider'

import SimpleMap from '../src/components/Map/Map'
import Restaurants from './components/Restaurants/Restaurants'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
  }

  render() {
    return (
      <div className="App">
        <SimpleMap restaurants={this.state.restaurants} />
        <Restaurants restaurant={this.state.restaurants} />
      </div>
    );

  }
}

export default App;
