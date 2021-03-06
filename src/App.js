import React, { Component } from 'react';
import './App.css';
import SimpleMap from '../src/Components/Map'
import Restaurants from './Components/Restaurants'
import AppProvider from './AppProvider';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
  }

  render() {
    return (
      <AppProvider>
        <div className="App">
          <SimpleMap />
          <Restaurants />
        </div>
      </AppProvider>
    );
  }
}

export default App;
